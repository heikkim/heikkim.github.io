// Color Palettes Setup
const colorPalettes = {
    neon: ['#ff007f', '#7f00ff', '#00f3ff', '#00ff66', '#ffea00'],
    sunset: ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d'],
    ocean: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'],
    candy: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0']
};

// Configuration State
let config = {
    proximityRadius: 30,
    maxScaleMultiplier: 4,
    particleCount: 1,
    currentPalette: 'ocean',
    speedMultiplier: 0.7
};

const canvasId = "particleCanvas";

// Canvas Context Variables
const canvas = document.getElementById(canvasId);
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let dpr = window.devicePixelRatio || 1;
let particles = [];

// Track Pointer State (Mouse or Touch)
const mouse = {
    x: null,
    y: null,
    active: false
};

const particleXSpan = document.getElementById("particleX");
const particleYSpan = document.getElementById("particleY");

// Particle Class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.logCounter = 0;
        // Initial random base size (small circles)
        this.baseRadius = Math.random() * 2.5 + 1.5;
        this.radius = this.baseRadius;
        this.targetRadius = this.baseRadius;

        // Random position within canvas boundaries
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Subtle drifting velocity
        this.vx = (Math.random() - 0.5) * config.speedMultiplier;
        this.vy = (Math.random() - 0.5) * config.speedMultiplier;

        // Assign random color from selected palette
        const colors = colorPalettes[config.currentPalette];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Opacity variance for visual depth
        this.alpha = Math.random() * 0.4 + 0.6;
    }

    update() {
        // Bounce off canvas edges
        if (this.x + this.vx < 0 || this.x + this.vx > width) this.vx *= -1;
        if (this.y + this.vy < 0 || this.y + this.vy > height) this.vy *= -1;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        //this.x = this.x*window.devicePixelRatio;
        //this.y = this.y*window.devicePixelRatio;

        if(particles.length == 1) {
            if (this.logCounter++<10){
                console.log("x: " + this.x + ", y: " + this.y);
                console.log(window.devicePixelRatio);
            }
            particleXSpan.innerHTML = ""+this.x;
            particleYSpan.innerHTML = ""+this.y;
        }

        // Calculate Proximity Scaling Logic
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            // Euclidean distance
            const distance = Math.hypot(dx, dy);

            if (distance < config.proximityRadius) {
                // Linear Proximity Ratio: 1 at cursor center, 0 at maximum interaction distance limit
                const proximityRatio = 1 - (distance / config.proximityRadius);
                
                // Maximum target size calculation based on proximity ratio
                const maxRadius = this.baseRadius * config.maxScaleMultiplier;
                this.targetRadius = this.baseRadius + (maxRadius - this.baseRadius) * proximityRatio;
            } else {
                // Outside interaction zone -> shrink back
                this.targetRadius = this.baseRadius;
            }
        } else {
            // Mouse inactive or left canvas -> default to base radius
            this.targetRadius = this.baseRadius;
        }

        // Smooth linear interpolation (lerp) toward target radius for continuous ease transitions
        this.radius += (this.targetRadius - this.radius) * 0.15;
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.radius), 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();

        // Optional subtle glow effect when enlarged
        if (this.radius > this.baseRadius * 2) {
            ctx.shadowBlur = this.radius * 0.8;
            ctx.shadowColor = this.color;
        }

        ctx.restore();
    }
}

// Initialize Canvas Dimensions and Resizing Logic
function resizeCanvas() {
    width = 500;
    height = 250;
    //alert("canvas W: " + width + ", canvas H: " + height);
    // Handle high DPI screens for sharp rendering
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Re-constrain out-of-bounds particles on resize
    particles.forEach(p => {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
    });
}

// Populate or Refresh Particles Array
function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}

// Main Animation Loop
function animate() {
    // Clear screen with high clarity
    ctx.clearRect(0, 0, width, height);

    // Render and update each particle
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animate);
}

const mouseXSpan = document.getElementById("mouseX");
const mouseYSpan = document.getElementById("mouseY");

// Event Listeners for Interaction
function setupEventListeners() {
    // Mouse Tracking
    console.log("canvas widht: " + canvas.width);
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.offsetX/window.devicePixelRatio;//e.clientX;
        mouse.y = e.offsetY/window.devicePixelRatio;//e.clientY;

        mouseXSpan.innerHTML = ""+mouse.x;
        mouseYSpan.innerHTML = ""+mouse.y;

        mouse.active = true;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    // Window Resizing
    window.addEventListener('resize', resizeCanvas);

    // UI Control Inputs Binding
    /*const proxInput = document.getElementById('proximityRadius');
    const proxVal = document.getElementById('radiusVal');
    proxInput.addEventListener('input', (e) => {
        config.proximityRadius = parseFloat(e.target.value);
        proxVal.textContent = `${config.proximityRadius}px`;
    });

    const scaleInput = document.getElementById('maxScale');
    const scaleVal = document.getElementById('scaleVal');
    scaleInput.addEventListener('input', (e) => {
        config.maxScaleMultiplier = parseFloat(e.target.value);
        scaleVal.textContent = `${config.maxScaleMultiplier}x`;
    });

    const countInput = document.getElementById('particleCount');
    const countVal = document.getElementById('countVal');
    countInput.addEventListener('input', (e) => {
        config.particleCount = parseInt(e.target.value);
        countVal.textContent = config.particleCount;
        initParticles();
    });*/

    // Palette Buttons
    /*const paletteBtns = document.querySelectorAll('.palette-btn');
    paletteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paletteBtns.forEach(b => b.classList.replace('border-indigo-500', 'border-transparent'));
            btn.classList.replace('border-transparent', 'border-indigo-500');
            config.currentPalette = btn.getAttribute('data-palette');
            initParticles();
        });
    });*/

    // Reset Button
    /*document.getElementById('resetBtn').addEventListener('click', () => {
        initParticles();
    });*/

    // Controls Toggle Button
    const toggleBtn = document.getElementById('toggleControls');
    const controlsBody = document.getElementById('controlsBody');
    let controlsVisible = true;
/*
    toggleBtn.addEventListener('click', () => {
        controlsVisible = !controlsVisible;
        if (controlsVisible) {
            controlsBody.classList.remove('hidden');
            toggleBtn.textContent = 'Hide';
        } else {
            controlsBody.classList.add('hidden');
            toggleBtn.textContent = 'Show Controls';
        }
    });*/
}

// Initialize and Run on Window Load
window.onload = function() {
    resizeCanvas();
    initParticles();
    setupEventListeners();
    animate();
};