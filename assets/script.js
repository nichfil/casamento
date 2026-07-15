document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for sections on scroll
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id !== 'home') { // Hero already has animation
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.observe(section);
        }
    });

    // Lightbox Logic
    const galleryImages = document.querySelectorAll('.carousel-track .photo-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;

    const showImage = (index) => {
        if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Smooth transition effect
        lightboxImg.style.transform = 'scale(0.95)';
        lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxImg.alt = galleryImages[currentIndex].alt;
            lightboxImg.style.transform = 'scale(1)';
            lightboxImg.style.opacity = '1';
        }, 150);
    };

    const openLightbox = (index) => {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxImg.alt = galleryImages[currentIndex].alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevents background scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restores background scroll
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        }
    });

    // Gallery Carousel Logic
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselPrevBtn = document.querySelector('.carousel-wrapper .prev-btn');
    const carouselNextBtn = document.querySelector('.carousel-wrapper .next-btn');

    if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
        const getScrollAmount = () => {
            const firstItem = carouselTrack.querySelector('.photo-item');
            if (!firstItem) return 300;
            return firstItem.offsetWidth + 20; // width + gap
        };

        carouselPrevBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        carouselNextBtn.addEventListener('click', () => {
            carouselTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
        
        // Disable/enable arrows based on scroll bounds
        const toggleArrows = () => {
            const scrollLeft = carouselTrack.scrollLeft;
            const maxScrollLeft = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            
            carouselPrevBtn.style.opacity = scrollLeft <= 1 ? '0.3' : '1';
            carouselPrevBtn.style.pointerEvents = scrollLeft <= 1 ? 'none' : 'auto';
            
            carouselNextBtn.style.opacity = scrollLeft >= maxScrollLeft - 1 ? '0.3' : '1';
            carouselNextBtn.style.pointerEvents = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'auto';
        };
        
        carouselTrack.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        // Initial check after rendering
        setTimeout(toggleArrows, 300);
    }
});

function copyPix() {
    const pixKey = "nicholli.menezes@gmail.com";
    navigator.clipboard.writeText(pixKey).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerText;
        btn.innerText = "Chave Copiada!";
        btn.style.backgroundColor = "#5cb85c";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 2000);
    });
}
