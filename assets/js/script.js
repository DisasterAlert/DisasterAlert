document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Emergency Alert Close Button
    const emergencyAlert = document.getElementById('emergencyAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');
    
    if (closeAlertBtn && emergencyAlert) {
        closeAlertBtn.addEventListener('click', function() {
            emergencyAlert.style.display = 'none';
            // Set cookie to remember the user closed the alert
            document.cookie = "emergencyAlertClosed=true; max-age=86400"; // 1 day
        });

        // Check if alert was previously closed
        if (document.cookie.includes('emergencyAlertClosed=true')) {
            emergencyAlert.style.display = 'none';
        }
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentNode;
            faqItem.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = faqItem.classList.contains('active') ? 
                    'fas fa-minus' : 'fas fa-plus';
            }
        });
    });

    // Solutions Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const solutionContents = document.querySelectorAll('.solution-content');
    
    if (tabButtons.length && solutionContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                solutionContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    
    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                formResponse.textContent = 'Por favor, preencha todos os campos.';
                formResponse.style.color = 'var(--red-alert)';
                formResponse.style.display = 'block';
                return;
            }
            
            // Simulate form submission (in a real app, you would use AJAX)
            setTimeout(() => {
                formResponse.innerHTML = `
                    <div class="alert">
                        <i class="fas fa-check-circle alert-icon" style="color: green;"></i>
                        <div>
                            <h4>Mensagem enviada com sucesso!</h4>
                            <p>Obrigado, ${name}. Entraremos em contato em breve.</p>
                        </div>
                    </div>
                `;
                formResponse.style.display = 'block';
                contactForm.reset();
                
                // Hide response after 5 seconds
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }

    // Search Functionality (for future implementation)
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Você pesquisou por: ${searchTerm}\n\nEsta funcionalidade será implementada em breve.`);
                // In a real implementation, you would filter content or make an API call
            }
        });
        
        // Allow search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});