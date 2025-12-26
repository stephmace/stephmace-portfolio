// ★·.·´¯`·.·★ STEPH'S GEOCITIES SCRIPTS ★·.·´¯`·.·★

// ═══════════════════════════════════════════════════════════
// VISITOR COUNTER (uses localStorage to persist)
// ═══════════════════════════════════════════════════════════
function initVisitorCounter() {
    const counterDisplay = document.getElementById('visitor-count');
    const marqueeCount = document.getElementById('marquee-count');
    
    // Get stored count or start at a fun number
    let count = localStorage.getItem('stephVisitorCount');
    
    if (!count) {
        // Start at a random "impressive" number for that authentic feel
        count = Math.floor(Math.random() * 1000) + 9000;
    }
    
    // Increment for this visit
    count = parseInt(count) + 1;
    localStorage.setItem('stephVisitorCount', count);
    
    // Pad to 6 digits like classic counters
    const paddedCount = count.toString().padStart(6, '0');
    
    // Animate the counter reveal
    if (counterDisplay) {
        animateCounter(counterDisplay, paddedCount);
    }
    
    // Update marquee count
    if (marqueeCount) {
        marqueeCount.textContent = count.toLocaleString();
    }
}

function animateCounter(element, finalValue) {
    let current = 0;
    const target = parseInt(finalValue);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString().padStart(6, '0');
        }
    }, stepTime);
}

// ═══════════════════════════════════════════════════════════
// STARFIELD ANIMATION
// ═══════════════════════════════════════════════════════════
function createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle duration
        star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starfield.appendChild(star);
    }
}

// ═══════════════════════════════════════════════════════════
// SPARKLE CURSOR TRAIL
// ═══════════════════════════════════════════════════════════
function initSparkleTrail() {
    const sparkles = ['✨', '⭐', '💖', '🌟', '✦'];
    
    document.addEventListener('mousemove', (e) => {
        // Only create sparkle 10% of the time for performance
        if (Math.random() > 0.1) return;
        
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: ${Math.random() * 15 + 10}px;
            z-index: 9999;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    });
    
    // Add sparkle animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-fade {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -100%) scale(0) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// ═══════════════════════════════════════════════════════════
// KONAMI CODE EASTER EGG
// ═══════════════════════════════════════════════════════════
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activatePartyMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activatePartyMode() {
    alert('🎉 PARTY MODE ACTIVATED! 🎉');
    
    document.body.style.animation = 'party-shake 0.5s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes party-shake {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
        }
        @keyframes party-colors {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.style.animation = 'party-shake 0.1s infinite, party-colors 2s linear infinite';
    
    // Stop after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ═══════════════════════════════════════════════════════════
// INITIALIZE EVERYTHING
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    console.log('★·.·´¯`·.·★ Welcome to Steph\'s Homepage! ★·.·´¯`·.·★');
    console.log('Try the Konami Code for a surprise! ↑↑↓↓←→←→BA');
    
    initVisitorCounter();
    createStarfield();
    initSparkleTrail();
    initKonamiCode();
});

