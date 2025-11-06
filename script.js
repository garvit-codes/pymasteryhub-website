        //  Download functionality
        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const fileName = this.getAttribute('data-file');
                const filePath = `pdfs/${fileName}`; // folder where your PDFs are stored

                // Create a temporary hidden link
                const link = document.createElement('a');
                link.href = filePath;
                link.download = fileName;
                document.body.appendChild(link);

                link.click(); // trigger download
                document.body.removeChild(link); // cleanup
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showError('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (in real app, you'd send this to a server)
            simulateFormSubmission();
        });

        function simulateFormSubmission() {
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Hide any existing messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Simulate loading delay
            setTimeout(() => {
                // 80% chance of success for demo purposes
                const isSuccess = Math.random() > 0.2;
                
                if (isSuccess) {
                    successMessage.style.display = 'block';
                    document.getElementById('contactForm').reset();
                } else {
                    errorMessage.style.display = 'block';
                }
            }, 1000);
        }

        function showError(message) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }

        // Close success message when clicking anywhere
        document.addEventListener('click', function(e) {
            const successMessage = document.getElementById('successMessage');
            if (successMessage.style.display === 'block' && !e.target.closest('#contactForm')) {
                successMessage.style.display = 'none';
            }
        });