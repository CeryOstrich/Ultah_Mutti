document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for the button
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', () => {
        document.getElementById('music-intro').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // Gallery Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');

    // Add click event to all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');

            modal.style.display = "flex";
            // Small timeout to allow display:flex to apply before adding opacity class for transition
            setTimeout(() => modal.classList.add('show'), 10);

            modalImg.src = img.src;
            captionText.innerHTML = img.getAttribute('data-caption') || '';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close logic
    function closeGalleryModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Wait for transition
    }

    closeModal.addEventListener('click', closeGalleryModal);

    // Close on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeGalleryModal();
        }
    });

    // Hidden Message Logic
    const comfortBtn = document.getElementById('comfortBtn');
    const comfortMessage = document.getElementById('comfortMessage');

    if (comfortBtn) {
        comfortBtn.addEventListener('click', () => {
            if (comfortMessage.classList.contains('show')) {
                comfortMessage.classList.remove('show');
                comfortBtn.innerHTML = "Rehat Sejenak 🍵";
            } else {
                comfortMessage.classList.add('show');
                comfortBtn.innerHTML = "Semangat ya! ✨";
            }
        });
    }

    // Confetti Logic
    function createConfetti() {
        const colors = ['#FFD1DC', '#E6E6FA', '#FFB7B2', '#A2D2FF', '#FFC8DD'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 1.5 + 1) + 's'; // 1-2.5s duration
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            document.body.appendChild(confetti);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, 2500);
        }
    }

    // Enhance start button with confetti
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            createConfetti();
        });
    }

    // Cake Interaction
    const cakeContainer = document.getElementById('cakeContainer');
    const flame = document.getElementById('flame');
    const wishText = document.getElementById('wishText');
    let candleBlown = false;

    if (cakeContainer && flame) {
        cakeContainer.addEventListener('click', () => {
            if (!candleBlown) {
                flame.classList.add('out');
                candleBlown = true;

                // Add smoke
                const smoke = document.createElement('div');
                smoke.classList.add('smoke');
                document.querySelector('.candle').appendChild(smoke);

                wishText.style.opacity = 0;
                setTimeout(() => {
                    wishText.innerHTML = "Happy Birthday. 🎂";
                    wishText.style.opacity = 1;
                }, 500);
            }
        });
    }

});
