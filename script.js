// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor effects on hover
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Interactive elements cursor scaling
const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero3d = document.querySelector('.hero-3d');
    
    if (hero3d) {
        hero3d.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.portfolio-item, .contact-item, .about-text');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio item hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form interactions (if needed later)
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('click', () => {
        const link = item.querySelector('a');
        if (link) {
            link.click();
        }
    });
});

// Loading animation for Spline viewers
document.addEventListener('DOMContentLoaded', () => {
    const splineViewers = document.querySelectorAll('spline-viewer');
    
    splineViewers.forEach(viewer => {
        viewer.addEventListener('load', () => {
            viewer.style.opacity = '1';
            viewer.style.transform = 'scale(1)';
        });
        
        // Initial state
        viewer.style.opacity = '0';
        viewer.style.transform = 'scale(0.9)';
        viewer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add transition to navbar
navbar.style.transition = 'transform 0.3s ease';

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// APK Test functionality
function testApp(appName) {
    // Create modal for app testing info
    const modal = document.createElement('div');
    modal.className = 'test-modal';
    modal.innerHTML = `
        <div class="test-modal-content">
            <div class="test-modal-header">
                <h3>Testing ${appName}</h3>
                <button class="test-modal-close" onclick="closeTestModal()">&times;</button>
            </div>
            <div class="test-modal-body">
                <div class="test-steps">
                    <h4>How to test this app:</h4>
                    <ol>
                        <li>Download the APK file by clicking "Download APK"</li>
                        <li>Enable "Install from unknown sources" in your Android settings</li>
                        <li>Install the APK on your Android device</li>
                        <li>Open the app and explore its features</li>
                        <li>Share your feedback via WhatsApp or email</li>
                    </ol>
                </div>
                <div class="test-features">
                    <h4>Key features to test:</h4>
                    <ul id="feature-list">
                        <!-- Features will be populated based on app -->
                    </ul>
                </div>
                <div class="test-actions">
                    <a href="https://wa.me/917979708232?text=Hi%20Abhishek,%20I%20tested%20${encodeURIComponent(appName)}%20app.%20Here's%20my%20feedback:" class="feedback-btn" target="_blank">Send Feedback</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Populate features based on app
    const featureList = document.getElementById('feature-list');
    const features = getAppFeatures(appName);
    
    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featureList.appendChild(li);
    });
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function getAppFeatures(appName) {
    const features = {
        'BrainBuzz': [
            'Interactive quiz interface',
            'Score tracking system',
            'Multiple choice questions',
            'Timer functionality',
            'Results and analytics'
        ],
        'Calendar': [
            'Event creation and editing',
            'Monthly/weekly view',
            'Reminder notifications',
            'Event categories',
            'Search functionality'
        ],
        'RTV Prototype': [
            'Video streaming quality',
            'User interface navigation',
            'Connection stability',
            'Audio synchronization',
            'Control responsiveness'
        ],
        'Test App': [
            'Core functionality testing',
            'UI/UX responsiveness',
            'Performance optimization',
            'Error handling',
            'Feature integration'
        ],
        'Admin Panel': [
            'User management system',
            'Dashboard analytics',
            'Data entry and editing',
            'Report generation',
            'Security and permissions'
        ],
        'Limra Student Portal': [
            'Student login system',
            'Academic records access',
            'Assignment submissions',
            'Grade viewing',
            'Communication features'
        ]
    };
    
    return features[appName] || ['General app functionality', 'User interface', 'Performance', 'Stability'];
}

function closeTestModal() {
    const modal = document.querySelector('.test-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('test-modal')) {
        closeTestModal();
    }
});

// Performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    updateActiveNav();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});