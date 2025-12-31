// Toh Networks - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Toh Networks - Starting initialization...");
    
    // 1. Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log("✅ Year set to: " + yearElement.textContent);
    }

    // 2. Preloader - FIXED VERSION
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                console.log("✅ Preloader hidden");
            }, 1000);
        });
    }

    // 3. Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log("✅ Mobile menu toggled");
        });
    }

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                console.log("✅ Mobile menu closed");
            });
        });
    }

    // 4. Sticky Navigation with background change
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
            }
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // 5. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 100;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                console.log("✅ Scrolled to: " + targetId);
            }
        });
    });

    // 6. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone')?.value || '',
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message || !formData.service) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you! Your message has been sent. We will contact you shortly.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    console.log("✅ Contact form submitted");
                }, 1500);
            }
        });
    }

    // 7. Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value;
                
                if (email && validateEmail(email)) {
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                    this.reset();
                    console.log("✅ Newsletter subscribed");
                } else {
                    showNotification('Please enter a valid email address', 'error');
                }
            }
        });
    }

    // 8. Package Card Animations
    const packageCards = document.querySelectorAll('.package-card');
    if (packageCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-up');
                    observer.unobserve(entry.target);
                    console.log("✅ Package card animated: " + entry.target.querySelector('h3')?.textContent);
                }
            });
        }, observerOptions);

        packageCards.forEach(card => {
            observer.observe(card);
        });
    }

    // 9. Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 10. Create Particles Background - SAFE VERSION
    function createParticles() {
        try {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) {
                console.log("⚠️ Particles container not found");
                return;
            }
            
            // Clear any existing particles
            particlesContainer.innerHTML = '';
            
            const particleCount = 20; // Reduced for performance
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 4 + 1; // Smaller particles
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const opacity = Math.random() * 0.2 + 0.1; // Less opacity
                const duration = Math.random() * 15 + 5; // Shorter duration
                
                // Apply styles
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${posX}%;
                    top: ${posY}%;
                    opacity: ${opacity};
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                `;
                
                particlesContainer.appendChild(particle);
            }
            console.log("✅ Particles created: " + particleCount);
        } catch (error) {
            console.error("❌ Particles error: ", error.message);
        }
    }
    
    // Call particles after a delay
    setTimeout(createParticles, 500);

    // 11. Animate Stats Counters - SAFE VERSION
    function animateStats() {
        try {
            const stats = document.querySelectorAll('.stat h3');
            const statsSection = document.querySelector('.hero');
            
            if (!statsSection || stats.length === 0) {
                console.log("⚠️ Stats section not found");
                return;
            }
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    stats.forEach(stat => {
                        const originalText = stat.textContent;
                        const target = parseInt(originalText) || 0;
                        if (target > 0) {
                            let current = 0;
                            const increment = target / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                stat.textContent = Math.floor(current) + (originalText.includes('%') ? '%' : '+');
                            }, 30);
                        }
                    });
                    observer.disconnect();
                    console.log("✅ Stats animated");
                }
            }, { threshold: 0.3 }); // Lower threshold
            
            observer.observe(statsSection);
        } catch (error) {
            console.error("❌ Stats animation error: ", error.message);
        }
    }
    
    // Start stats animation
    setTimeout(animateStats, 1000);

    // 12. Add active class to current nav link
    function updateActiveNavLink() {
        try {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Update nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            // Silently fail - this is non-critical
        }
    }

    // 13. Notification System
    function showNotification(message, type = 'success') {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            // Add styles if not already added
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    .notification {
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        background: white;
                        color: #1A1A2E;
                        padding: 15px 25px;
                        border-radius: 8px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        z-index: 9999;
                        transform: translateX(400px);
                        transition: transform 0.3s ease;
                        border-left: 4px solid #2A5CAA;
                    }
                    
                    .notification.show {
                        transform: translateX(0);
                    }
                    
                    .notification.success {
                        border-left-color: #4CAF50;
                    }
                    
                    .notification.error {
                        border-left-color: #F44336;
                    }
                    
                    .notification i {
                        font-size: 1.2rem;
                    }
                    
                    .notification.success i {
                        color: #4CAF50;
                    }
                    
                    .notification.error i {
                        color: #F44336;
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => notification.classList.add('show'), 100);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
            
            console.log("✅ Notification shown: " + message);
        } catch (error) {
            console.error("❌ Notification error: ", error);
            // Fallback to alert
            alert(message);
        }
    }

    // 14. Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 15. Back to top button
    function initBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.title = 'Back to top';
        
        // Add styles
        if (!document.querySelector('#back-to-top-styles')) {
            const style = document.createElement('style');
            style.id = 'back-to-top-styles';
            style.textContent = `
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    left: 30px;
                    width: 50px;
                    height: 50px;
                    background: #2A5CAA;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    z-index: 99;
                }
                
                .back-to-top:hover {
                    background: #4A90E2;
                    transform: translateY(-3px);
                }
                
                .back-to-top.show {
                    display: flex;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(backToTop);
        
        // Show/hide based on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log("✅ Back to top button initialized");
    }
    
    // Initialize back to top button
    initBackToTop();

    // 16. GSAP Animations - SAFE VERSION
    function initGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            try {
                // Animate hero elements
                gsap.from('.hero-content', {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    delay: 0.5,
                    ease: "power2.out"
                });
                
                gsap.from('.hero-image', {
                    duration: 1,
                    x: 50,
                    opacity: 0,
                    delay: 0.7,
                    ease: "power2.out"
                });
                
                console.log("✅ GSAP animations initialized");
            } catch (error) {
                console.error("❌ GSAP animation error: ", error.message);
            }
        } else {
            console.log("⚠️ GSAP not loaded, skipping animations");
        }
    }
    
    // Initialize GSAP animations
    setTimeout(initGSAPAnimations, 300);

    // 17. Lazy load images - SAFE VERSION
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                        console.log("✅ Image lazy loaded: " + src.substring(0, 30) + "...");
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        images.forEach(img => imageObserver.observe(img));
        console.log("✅ Lazy loading initialized for " + images.length + " images");
    }
    
    // Initialize lazy loading
    initLazyLoading();

    console.log("🎉 Toh Networks - Initialization complete!");
});

// Add loading class to body for initial fade in
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log("✅ Page fully loaded");
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('🔥 Global error: ', e.message, ' in ', e.filename, ':', e.lineno);
});

console.log('📦 Toh Networks JavaScript loaded successfully!');