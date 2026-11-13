#!/usr/bin/env bash
#
# check-posts.sh
#
# Checks the articles of the "articles" collection before they are pushed to
# GitHub. It reports
#
#   - every article that is not published
#   - the metadata that is missing from an article
#   - the language versions that do not resolve to another article
#   - the articles whose flags do not match each other
#
# and ends with a summary of the published and the unfinished articles.
#
# Usage: ./check-posts.sh
#
# The front matter of an article:
#
#   date        the publish date, ISO 8601 with an offset,
#               e.g. 2026-11-12T09:00:00+02:00
#   published   true/false  Jekyll builds only the articles with published: true
#   visible     true/false  the article is shown in the listing and the carousel
#   sitemap     true/false  the article is listed in sitemap.xml
#   highlighted true/false  the article is shown in the homepage carousel
#
# An article with "published: false" is a draft. Jekyll does not build it, so
# it does not exist on the site. A draft is marked with a DRAFT! badge where it
# is shown, and it can be seen locally with "jekyll serve --unpublished".
#
# Jekyll also holds an article back when its date is in the future, so an
# article with "published: true" and a future date goes live on that day.

set -u

cd "$(dirname "$0")" || exit 1

ARTICLES_DIR="_articles"

if [ ! -d "$ARTICLES_DIR" ]; then
  echo "Cannot find the $ARTICLES_DIR directory. Run the script from the site root." >&2
  exit 1
fi

# ---------------------------------------------------------------- helpers ---

# Prints the front matter of a file.
frontmatter() {
  awk 'BEGIN { fm = 0 }
       /^---[[:space:]]*$/ { if (fm == 0) { fm = 1; next } else { exit } }
       fm == 1 { print }' "$1"
}

# Prints the value of a front matter key of a file.
value() {
  local raw
  raw=$(frontmatter "$1" | grep -E "^$2:" | head -n 1)
  raw=${raw#"$2:"}
  raw=$(printf '%s' "$raw" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//')
  raw=${raw#\"}
  raw=${raw%\"}
  raw=${raw#\'}
  raw=${raw%\'}
  printf '%s' "$raw"
}

# Prints true or false for a flag value.
is_true() {
  [ "$1" = "true" ]
}

# Prints true when the given ISO 8601 timestamp is in the future.
# The articles use the same UTC offset, so their local times can be compared
# as they are.
is_future() {
  local stamp="$1"
  local day=${stamp%%T*}
  local clock=${stamp#*T}
  local today now
  today=$(date +%Y-%m-%d)
  now=$(date +%H:%M:%S)

  [[ "$day" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || return 1

  if [ "${day//-/}" -gt "${today//-/}" ]; then
    return 0
  fi
  if [ "${day//-/}" -lt "${today//-/}" ]; then
    return 1
  fi

  clock=${clock%%+*}
  clock=${clock//:/}
  now=${now//:/}
  [ "$((10#$clock))" -gt "$((10#$now))" ]
}

# --------------------------------------------------------------- collecting --

files=()
while IFS= read -r file; do
  files+=("$file")
done < <(find "$ARTICLES_DIR" -type f -name "*.md" | sort)

if [ ${#files[@]} -eq 0 ]; then
  echo "No articles found in $ARTICLES_DIR." >&2
  exit 1
fi

# The URL of every article, one per line. Used to resolve the language versions.
urls_file=$(mktemp)
trap 'rm -f "$urls_file" "$published_file" "$drafts_file"' EXIT
published_file=$(mktemp)
drafts_file=$(mktemp)

for file in "${files[@]}"; do
  rel=${file#"$ARTICLES_DIR/"}
  lang=${rel%%/*}
  category=${rel#*/}
  category=${category%%/*}
  slug=${rel##*/}
  slug=${slug%.md}
  if [ "$lang" = "en" ]; then
    echo "/en/articles/$category/$slug/" >> "$urls_file"
  else
    echo "/articles/$category/$slug/" >> "$urls_file"
  fi
done

# True when the given URL is the URL of one of the articles.
url_exists() {
  grep -Fxq "$1" "$urls_file"
}

# Prints how many of the language blocks of the sitetext describe the given
# category, and how many of them have categories at all. A category that is
# described in one language only is missing a description in the others.
category_descriptions() {
  awk -v slug="$1" '
    /^    categories:/ { inblock = 1; blocks++; inentry = 0; next }
    inblock && /^      - slug:/ { inentry = ($3 == slug); next }
    inblock && /^        desc:/ { if (inentry) described++; next }
    inblock && /^    [^ ]/ { inblock = 0; inentry = 0 }
    END { print described + 0, blocks + 0 }
  ' _data/sitetext.yml
}

# ----------------------------------------------------------------- reports ---

echo "Article check"
echo "============="
echo

echo "NOT PUBLISHED"
echo "-------------"
found_unpublished=0

for file in "${files[@]}"; do
  published=$(value "$file" "published")
  visible=$(value "$file" "visible")
  sitemap=$(value "$file" "sitemap")
  highlighted=$(value "$file" "highlighted")
  article_date=$(value "$file" "date")
  lang_vers=$(value "$file" "lang_vers")

  is_draft=false
  [ "$published" = "false" ] && is_draft=true

  [ "$is_draft" = "true" ] || continue
  found_unpublished=1

  rel=${file#"$ARTICLES_DIR/"}
  category=${rel#*/}
  category=${category%%/*}

  echo "$file"
  printf '  publishing date  : %s\n' "${article_date:-MISSING}"
  printf '  flags            : published: %s, visible: %s, sitemap: %s, highlighted: %s\n' \
    "${published:-MISSING}" "${visible:-MISSING}" "${sitemap:-MISSING}" "${highlighted:-MISSING}"

  for key in title meta_title meta_description; do
    if [ -n "$(value "$file" "$key")" ]; then
      printf '  %-16s : ok\n' "$key"
    else
      printf '  %-16s : MISSING\n' "$key"
    fi
  done

  if [ -z "$lang_vers" ]; then
    printf '  lang_vers        : MISSING\n'
  elif url_exists "$lang_vers"; then
    printf '  lang_vers        : %s -> ok\n' "$lang_vers"
  else
    printf '  lang_vers        : %s -> NOT FOUND\n' "$lang_vers"
  fi

  echo "  note             : a draft is not built by Jekyll, it is not on the site."
  if is_future "$article_date"; then
    echo "                     The date is in the future, so Jekyll holds the article"
    echo "                     back as well. See it locally with:"
    echo "                     jekyll serve --unpublished --future"
  else
    echo "                     See it locally with: jekyll serve --unpublished"
  fi
  echo "$category" >> "$drafts_file"
  echo
done

[ "$found_unpublished" -eq 0 ] && echo "None. Every article is published."
echo

echo "DISCREPANCIES"
echo "-------------"
found_discrepancy=0

for file in "${files[@]}"; do
  published=$(value "$file" "published")
  visible=$(value "$file" "visible")
  sitemap=$(value "$file" "sitemap")
  article_date=$(value "$file" "date")
  lang_vers=$(value "$file" "lang_vers")

  # A draft is an article with published: false. Jekyll does not build it, so
  # it is not on the site and a draft that is marked visible is not a blunder.
  is_draft=false
  [ "$published" = "false" ] && is_draft=true

  problems=""

  if [ "$is_draft" = "true" ]; then
    is_true "$sitemap" && problems="$problems\n  - in the sitemap, but not published"
  else
    if [ -z "$published" ]; then
      problems="$problems\n  - published is not set, the article goes live as it is"
    fi
    is_true "$visible" || problems="$problems\n  - published, but not visible"
    is_true "$sitemap" || problems="$problems\n  - published, but not in the sitemap"
    if is_future "$article_date"; then
      problems="$problems\n  - published, but the date is in the future: $article_date"
      problems="$problems\n    Jekyll holds the article back until that date"
    fi
  fi

  if [ -n "$lang_vers" ] && ! url_exists "$lang_vers"; then
    problems="$problems\n  - lang_vers does not resolve to an article: $lang_vers"
  fi

  # Every category has a page of its own, so that the articles of the
  # category can be skimmed through in one place.
  rel=${file#"$ARTICLES_DIR/"}
  lang=${rel%%/*}
  category=${rel#*/}
  category=${category%%/*}

  if [ "$lang" = "en" ]; then
    category_page="en/articles/$category/index.md"
  else
    category_page="articles/$category/index.md"
  fi
  if [ ! -f "$category_page" ]; then
    problems="$problems\n  - the category has no page of its own: $category_page is missing"
  fi

  # The page shows the description of the category under its headline, so
  # every language needs one in the sitetext.
  read -r described description_blocks < <(category_descriptions "$category")
  if [ "$description_blocks" -gt 0 ] && [ "$described" -lt "$description_blocks" ]; then
    problems="$problems\n  - the category has no description in every language of the sitetext"
  fi

  if [ -n "$problems" ]; then
    found_discrepancy=1
    echo "$file"
    printf "%b\n" "$problems"
    echo
  fi
done

[ "$found_discrepancy" -eq 0 ] && echo "None."
echo

# ----------------------------------------------------------------- summary ---

for file in "${files[@]}"; do
  published=$(value "$file" "published")
  [ "$published" = "false" ] && continue

  rel=${file#"$ARTICLES_DIR/"}
  category=${rel#*/}
  category=${category%%/*}
  echo "$category" >> "$published_file"
done

highlighted_count=0
for file in "${files[@]}"; do
  is_true "$(value "$file" "highlighted")" && highlighted_count=$((highlighted_count + 1))
done

echo "SUMMARY"
echo "-------"
echo "Published articles per category:"
sort "$published_file" | uniq -c | awk '{ printf "  %-14s : %s\n", $2, $1 }'
echo "  total          : $(wc -l < "$published_file" | tr -d ' ')"
echo
echo "Highlighted articles : $highlighted_count"
echo
echo "Drafts per category:"
sort "$drafts_file" | uniq -c | awk '{ printf "  %-14s : %s\n", $2, $1 }'
echo "  total          : $(wc -l < "$drafts_file" | tr -d ' ')"
