// Initialize EmailJS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. EMAILJS INITIALIZATION
    // =============================================
    emailjs.init('J2cbVW-bfL2ChCD6G'); // Your EmailJS User ID
    
    // =============================================
    // 2. CONTACT FORM HANDLING
    // =============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate unique contact number
            this.contact_number.value = Math.random() * 100000 | 0;
            
            // =============================================
            // 3. VALIDATION WITH VISUAL FEEDBACK
            // =============================================
            const nameInput = this.querySelector('input[name="from_name"]');
            const emailInput = this.querySelector('input[name="from_email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            let isValid = true;
            
            // Clear previous error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
            
            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // =============================================
            // 4. FORM SUBMISSION WITH LOADING STATE
            // =============================================
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.innerHTML = `
                <span class="spinner"></span>
                Sending...
            `;
            submitBtn.disabled = true;
            
            // =============================================
            // 5. EMAILJS SEND REQUEST
            // =============================================
            emailjs.sendForm('service_2727eb8', 'template_7j17mi4', this)
                .then(function(response) {
                    // Success handling
                    showAlert('success', 'Message sent successfully!');
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Error handling
                    console.error('EmailJS Error:', error);
                    showAlert('error', 
                        error.text || 'Failed to send message. Please try again later or email me directly at punithmmp2025@gmail.com'
                    );
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
        
        // Real-time validation as user types
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    }
    
    // =============================================
    // HELPER FUNCTIONS
    // =============================================
    
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert ${type}`;
        alertDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        const formContainer = document.querySelector('.contact-content');
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
});