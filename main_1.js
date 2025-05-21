// Script principal pour le site RamiCall

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Création du contenu du menu mobile
    mobileMenu.innerHTML = `
        <div class="close-menu">&times;</div>
        <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="about.html">À Propos</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="careers.html">Carrières</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="mobile-assistant-btn">
            <a href="assistant.html">Assistant Virtuel</a>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Ouverture du menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    // Fermeture du menu mobile
    const closeMenu = document.querySelector('.close-menu');
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Fermeture du menu mobile lors du clic sur un lien
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
});

// Animation des statistiques
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (statItems.length === 0) return;
    
    const statsSection = document.querySelector('.stats-container');
    const statsSectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (statsSectionPosition < screenPosition) {
        statItems.forEach(stat => {
            const targetValue = stat.textContent;
            const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
            let startValue = 0;
            const duration = 2000;
            const increment = numericValue / (duration / 20);
            
            const updateCounter = () => {
                startValue += increment;
                if (startValue < numericValue) {
                    if (targetValue.includes('+')) {
                        stat.textContent = '+' + Math.floor(startValue);
                    } else if (targetValue.includes('%')) {
                        stat.textContent = Math.floor(startValue) + '%';
                    } else {
                        stat.textContent = Math.floor(startValue);
                    }
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = targetValue;
                }
            };
            
            updateCounter();
        });
        
        // Supprimer l'écouteur d'événement une fois l'animation terminée
        window.removeEventListener('scroll', checkScroll);
    }
}

// Vérifier la position de défilement pour déclencher l'animation
function checkScroll() {
    animateStats();
}

// Ajouter l'écouteur d'événement pour le défilement
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Simulation d'envoi de formulaire
            const submitBtn = document.querySelector('.form-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                alert('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }, 1500);
        });
    }
});

// Gestion de l'assistant virtuel
document.addEventListener('DOMContentLoaded', function() {
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (!chatbotInput || !chatbotSendBtn || !chatbotMessages) return;
    
    // Message de bienvenue
    addBotMessage("Bonjour ! Je suis l'assistant virtuel de RamiCall. Comment puis-je vous aider aujourd'hui ?");
    
    // Envoi de message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message === '') return;
        
        // Ajouter le message de l'utilisateur
        addUserMessage(message);
        
        // Effacer l'input
        chatbotInput.value = '';
        
        // Simuler une réponse du bot après un court délai
        setTimeout(function() {
            respondToMessage(message);
        }, 1000);
    }
    
    // Ajouter un message du bot
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.innerHTML = `<div class="message-content">${message}</div>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Ajouter un message de l'utilisateur
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.innerHTML = `<div class="message-content">${message}</div>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Répondre au message de l'utilisateur
    function respondToMessage(message) {
        message = message.toLowerCase();
        
        if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
            addBotMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?");
        } else if (message.includes('service') || message.includes('offre')) {
            addBotMessage("RamiCall propose plusieurs services spécialisés pour le secteur des énergies renouvelables : gestion des appels entrants, prospection et qualification, support technique et gestion des rendez-vous. Souhaitez-vous en savoir plus sur l'un de ces services en particulier ?");
        } else if (message.includes('contact') || message.includes('joindre')) {
            addBotMessage("Vous pouvez nous contacter par téléphone au +212 5XX XX XX XX ou par email à contact@ramicall.com. Vous pouvez également utiliser le formulaire de contact sur notre site.");
        } else if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
            addBotMessage("Nos tarifs sont personnalisés en fonction de vos besoins spécifiques. Je vous invite à nous contacter directement pour obtenir un devis adapté à votre situation.");
        } else if (message.includes('merci')) {
            addBotMessage("Je vous en prie ! N'hésitez pas si vous avez d'autres questions.");
        } else {
            addBotMessage("Je ne suis pas sûr de comprendre votre demande. Pourriez-vous reformuler ou préciser votre question ? Vous pouvez me demander des informations sur nos services, nos coordonnées ou comment nous contacter.");
        }
    }
    
    // Événement de clic sur le bouton d'envoi
    chatbotSendBtn.addEventListener('click', sendMessage);
    
    // Événement d'appui sur Entrée dans l'input
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Animation au défilement pour les éléments
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .team-member, .job-card');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Ajouter la classe CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .about-content, .team-member, .job-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .about-content.animate, .team-member.animate, .job-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Vérifier la visibilité au chargement et au défilement
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
});
