document.addEventListener('DOMContentLoaded', () => {
    // BUG FIX: Define elements with null checks
    const elements = {
        mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        navLinks: document.getElementById('nav-links'),
        backToTop: document.getElementById('back-to-top'),
        typewriter: document.getElementById('typewriter'),
        themeToggle: document.querySelector('.theme-toggle'),
        header: document.querySelector('.header'),
        scrollProgress: document.querySelector('.scroll-progress'),
        openContactDialog: document.getElementById('open-contact-dialog'),
        contactDialog: document.getElementById('contact-dialog'),
        closeContactDialog: document.getElementById('close-contact-dialog'),
        sendWhatsApp: document.getElementById('send-whatsapp'),
        contactForm: document.getElementById('contact-form')
    };

    const text = 'IoT Innovator | Embedded Systems Expert | ECE Student';
    let typewriterTimeout = null;

    // BUG FIX: Theme toggle with null check and icon color
    try {
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('dark-theme');
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) {
                    icon.src = isDark 
                        ? 'https://img.icons8.com/ios-filled/24/FFFFFF/sun--v1.png'
                        : 'https://img.icons8.com/ios-filled/24/111827/sun--v1.png';
                    icon.alt = isDark ? 'Light mode' : 'Dark mode';
                }
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });

            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-theme');
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) {
                    icon.src = 'https://img.icons8.com/ios-filled/24/FFFFFF/sun--v1.png';
                    icon.alt = 'Light mode';
                }
            } else {
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) {
                    icon.src = 'https://img.icons8.com/ios-filled/24/111827/sun--v1.png';
                    icon.alt = 'Dark mode';
                }
            }
        }
    } catch (error) {
        console.error('Theme toggle error:', error);
    }

    // BUG FIX: Typewriter effect with cleanup
    try {
        if (elements.typewriter) {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    elements.typewriter.textContent += text.charAt(i);
                    i++;
                    typewriterTimeout = setTimeout(typeWriter, 50);
                }
            };
            typeWriter();

            // Cleanup on page unload
            window.addEventListener('beforeunload', () => {
                if (typewriterTimeout) clearTimeout(typewriterTimeout);
            });
        }
    } catch (error) {
        console.error('Typewriter error:', error);
    }

    // BUG FIX: Mobile menu with null check
    try {
        if (elements.mobileMenuBtn && elements.navLinks) {
            elements.mobileMenuBtn.addEventListener('click', () => {
                const isActive = elements.navLinks.classList.toggle('active');
                const icon = elements.mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars', !isActive);
                    icon.classList.toggle('fa-times', isActive);
                }
                elements.mobileMenuBtn.setAttribute('aria-expanded', isActive.toString());
            });
        }
    } catch (error) {
        console.error('Mobile menu error:', error);
    }

    // BUG FIX: Smooth scroll and active navigation with null check
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                const target = targetId ? document.getElementById(targetId) : null;
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    if (elements.navLinks?.classList.contains('active')) {
                        elements.navLinks.classList.remove('active');
                        const icon = elements.mobileMenuBtn?.querySelector('i');
                        if (icon) icon.classList.replace('fa-times', 'fa-bars');
                        if (elements.mobileMenuBtn) {
                            elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            try {
                if (elements.header) {
                    elements.header.classList.toggle('scrolled', window.scrollY > 50);
                }
                if (elements.backToTop) {
                    elements.backToTop.classList.toggle('visible', window.scrollY > 300);
                }
                if (elements.scrollProgress) {
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    elements.scrollProgress.style.width = `${(scrollTop / scrollHeight) * 100}%`;
                }

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= sectionTop - 60) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href')?.substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            } catch (error) {
                console.error('Scroll effect error:', error);
            }
        });
    } catch (error) {
        console.error('Navigation error:', error);
    }

    // BUG FIX: Animations with IntersectionObserver fallback
    try {
        const animateElements = document.querySelectorAll('.section-animate, .card-animate');
        if (animateElements.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animateElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            animateElements.forEach(el => el.classList.add('visible'));
        }
    } catch (error) {
        console.error('Animation error:', error);
    }

    // BUG FIX: Back to top with null check
    try {
        if (elements.backToTop) {
            elements.backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (error) {
        console.error('Back to top error:', error);
    }

    // BUG FIX: Contact dialog with null check
    try {
        if (elements.openContactDialog && elements.contactDialog) {
            elements.openContactDialog.addEventListener('click', () => {
                elements.contactDialog.showModal();
            });
        }

        if (elements.closeContactDialog && elements.contactDialog) {
            elements.closeContactDialog.addEventListener('click', () => {
                elements.contactDialog.close();
            });
        }
    } catch (error) {
        console.error('Contact dialog error:', error);
    }

    // BUG FIX: WhatsApp with robust validation
    try {
        if (elements.sendWhatsApp && elements.contactForm) {
            elements.sendWhatsApp.addEventListener('click', () => {
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const messageInput = document.getElementById('message');

                const name = nameInput?.value.trim() || '';
                const email = emailInput?.value.trim() || '';
                const message = messageInput?.value.trim() || '';

                if (name && email && message) {
                    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
                    window.open(`https://wa.me/+916385478936?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                    elements.contactForm.reset();
                    elements.contactDialog?.close();
                } else {
                    alert('Please fill all fields.');
                }
            });
        }
    } catch (error) {
        console.error('WhatsApp error:', error);
    }

    // BUG FIX: Custom cursor with limited bubbles
    try {
        const customCursor = document.createElement('div');
        customCursor.className = 'custom-cursor';
        document.body.appendChild(customCursor);

        let lastBubbleTime = 0;
        const bubbleInterval = 100; // Limit bubble creation rate

        document.addEventListener('mousemove', e => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;

            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 600);

            // Create random big bubbles with rate limit
            const now = Date.now();
            if (now - lastBubbleTime > bubbleInterval && Math.random() < 0.3) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                const size = 10 + Math.random() * 10;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${e.clientX + offsetX}px`;
                bubble.style.top = `${e.clientY + offsetY}px`;
                document.body.appendChild(bubble);
                setTimeout(() => bubble.remove(), 1500);
                lastBubbleTime = now;
            }
        });
    } catch (error) {
        console.error('Custom cursor error:', error);
    }
});