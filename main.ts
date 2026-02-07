
console.log("Portfolio V3.5 Loaded - Cache Cleared");

// Check if script is running by adding a temporary visible indicator
document.body.style.borderTop = "5px solid #9d4edd";

document.addEventListener('DOMContentLoaded', () => {
    try {
        // --- 1. Cursor ---
        const cursorGlow = document.querySelector('.cursor-glow');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        if (cursorGlow) {
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursorGlow.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
        }

        // --- 2. Magnetism (Glow Buttons & Nav)---
        const magneticElements = document.querySelectorAll('.magnetic-wrap, .tech-badge');
        magneticElements.forEach((wrap) => {
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // If it's a wrapper, move the child. If it's a badge, move itself.
                const elem = wrap.querySelector('.glow-btn') || wrap;

                if (elem) {
                    elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                    if (elem !== wrap) wrap.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                }
            });

            wrap.addEventListener('mouseleave', () => {
                const elem = wrap.querySelector('.glow-btn') || wrap;
                if (elem) elem.style.transform = 'translate(0,0)';
                if (elem !== wrap) wrap.style.transform = 'translate(0,0)';
            });
        });

        // --- 3. Scroll Reveal ---
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));

        // --- 4. Particles (High Visibility) ---
        const canvas = document.getElementById('bg-particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1, // 1-4px
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#9d4edd'; // Solid Purple
                ctx.globalAlpha = 0.6; // 60% Opacity

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });
                requestAnimationFrame(animate);
            }
            animate();
            console.log("Particles Initialized");
        }

    } catch (err) {
        console.error("V3 Error:", err);
    }
});
