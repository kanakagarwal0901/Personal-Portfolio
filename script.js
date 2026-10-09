document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    const closeMobileNav = () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }
    };

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isOpen);
        });

        // Close menu when tapping any navigation link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        // Close menu when tapping outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileNav();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileNav();
                navToggle.focus();
            }
        });

        // Close menu if viewport is resized to desktop dimensions
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileNav();
            }
        });
    }

    // --- Active Link Highlight on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('main, section[id], footer[id]');
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Scroll Animations (IntersectionObserver) ---
    const faders = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        faders.forEach(fader => {
            fader.classList.add('appear');
        });
    }
});