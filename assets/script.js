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
