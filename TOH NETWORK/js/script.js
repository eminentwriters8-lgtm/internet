// Toh Networks - Main JavaScript (Safe Version)
console.log("🚀 Toh Networks - Initializing...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Content Loaded");
    
    // 1. Remove preloader after 1.5 seconds
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            console.log("✅ Preloader removed");
        }
    }, 1500);
    
    // 2. Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log("✅ Mobile menu toggled");
        });
    }
    
    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                console.log("✅ Scrolled to: " + targetId);
            }
        });
    });
    
    // 4. Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Validate
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert('Thank you, ' + formData.name + '! Your message has been sent. We will contact you soon.');
            
            // Reset form
            contactForm.reset();
            console.log("✅ Contact form submitted");
        });
    }
    
    // 5. Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log("✅ Year updated: " + yearElement.textContent);
    }
    
    // 6. Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
        
        // Sticky header effect
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // 7. Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                console.log("✅ Newsletter subscribed: " + email);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // 8. WhatsApp button functionality
    const whatsappButtons = document.querySelectorAll('.whatsapp-float, .contact-link.whatsapp');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.href.includes('whatsapp')) {
                e.preventDefault();
                window.open('https://wa.me/254706315742', '_blank');
                console.log("✅ WhatsApp opened");
            }
        });
    });
    
    // 9. Package cards hover effect
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    console.log("✅ Toh Networks - Fully initialized!");
});

// Window load event
window.addEventListener('load', function() {
    console.log("✅ All page resources loaded");
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('❌ Error occurred:', e.message);
});
// Add this function
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseInt(originalText);
        
        let count = 0;
        const interval = setInterval(() => {
            count += Math.ceil(target / 50);
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            stat.textContent = count + (originalText.includes('%') ? '%' : '+');
        }, 30);
    });
}

// Call when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    });
    observer.observe(heroSection);
}