// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Toggle navigation menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Hamburger Animation
    hamburger.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        hamburger.querySelector('.bar:nth-child(1)').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        hamburger.querySelector('.bar:nth-child(2)').style.opacity = '0';
        hamburger.querySelector('.bar:nth-child(3)').style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        hamburger.querySelector('.bar:nth-child(1)').style.transform = 'none';
        hamburger.querySelector('.bar:nth-child(2)').style.opacity = '1';
        hamburger.querySelector('.bar:nth-child(3)').style.transform = 'none';
    }
});

// Close menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            hamburger.classList.remove('active');
            hamburger.querySelector('.bar:nth-child(1)').style.transform = 'none';
            hamburger.querySelector('.bar:nth-child(2)').style.opacity = '1';
            hamburger.querySelector('.bar:nth-child(3)').style.transform = 'none';
        }
    });
});

// Highlight active nav item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(item => {
        item.querySelector('a').classList.remove('active');
        if (item.querySelector('a').getAttribute('href') === `#${current}`) {
            item.querySelector('a').classList.add('active');
        }
    });
    
    // Add box shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formDataObject = {
            name: document.getElementById('contact_name_input').value,
            email: document.getElementById('contact_email_input').value,
            subject: document.getElementById('contact_subject_input').value,
            message: document.getElementById('contact_message_input').value
        };

        // Simple validation
        if (formDataObject.name.trim() === '' || formDataObject.email.trim() === '' || formDataObject.message.trim() === '') {
            alert('Please fill in all required fields');
            return;
        }
        
        const form = this; // Preserve context
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        form.querySelector('button').style.display = 'none';
        
        sendEmail(formDataObject).then(response => {
            let messageDiv;
            if (response === "Success") {
                console.log('Email sent successfully!', response);
                messageDiv = document.createElement('div');
                messageDiv.classList.add('success-message');
                messageDiv.innerHTML = `
                    <i class="fas fa-check-circle" style="color: green; font-size: 48px; margin-bottom: 20px;"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                `;
            } else {
                messageDiv = document.createElement('div');
                messageDiv.classList.add('failure-message');
                messageDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle" style="color: red; font-size: 48px; margin-bottom: 20px;"></i>
                    <h3>Something went wrong!</h3>
                    <p>Kindly reach out via mail at<br> darshansthakur2@gmail.com</p>
                `;
            }
            
            messageDiv.style.textAlign = 'center';
            messageDiv.style.padding = '30px';
            form.appendChild(messageDiv);
        
            // Reset the form after 5 seconds
            setTimeout(() => {
                form.reset();
                formGroups.forEach(group => group.style.display = 'flex');
                form.querySelector('button').style.display = 'block';
                if (messageDiv) messageDiv.remove();
            }, 10000);
        });
    });
}


// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .publication-card, .achievement-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .publication-card, .achievement-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on initial load
    animateOnScroll();
});

    
(function(){
try {
    emailjs.init({publicKey: "j7IAQbvMKn0AFDkBY"});
    console.log("EmailJS initialized successfully!");
} catch (error) {
    console.error("EmailJS initialization failed:", error);
    document.querySelector('.contact-form').style.display = 'none';
}
})();

// Send email function
function sendEmail(formDataObject) {
    console.log("Sending email...");

    return emailjs.send("service_t76h7di", "template_3kbio28", formDataObject)
        .then(response => {
            console.log("Email sent successfully:", response);
            return "Success";
        })
        .catch(error => {
            console.error("Error sending email:", error);
            return "Failure";
        });
}

  

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);

function openModal(image) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImage").src = image.src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}