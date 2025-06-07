document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    const emergencyAlert = document.getElementById('emergencyAlert');
    const closeAlertBtn = document.getElementById('closeAlertBtn');
    
    if (closeAlertBtn && emergencyAlert) {
        closeAlertBtn.addEventListener('click', function() {
            emergencyAlert.style.display = 'none';
            document.cookie = "emergencyAlertClosed=true; max-age=86400";
        });

        if (document.cookie.includes('emergencyAlertClosed=true')) {
            emergencyAlert.style.display = 'none';
        }
    }

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

    const tabButtons = document.querySelectorAll('.tab-btn');
    const solutionContents = document.querySelectorAll('.solution-content');
    
    if (tabButtons.length && solutionContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                solutionContents.forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    
    if (contactForm && formResponse) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                formResponse.textContent = 'Por favor, preencha todos os campos.';
                formResponse.style.color = 'var(--red-alert)';
                formResponse.style.display = 'block';
                return;
            }
            
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
                
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Você pesquisou por: ${searchTerm}\n\nEsta funcionalidade será implementada em breve.`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

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