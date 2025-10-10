// script.js - Jonaki Ideal School - Complete Fixed Version

// এই ফাংশনটি নিশ্চিত করে যে সম্পূর্ণ HTML ডকুমেন্ট লোড হওয়ার পরে জাভাস্ক্রিপ্ট কোড চলবে
document.addEventListener('DOMContentLoaded', function() {

    // --- মোবাইল মেনুর জন্য কোড ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    }


    // --- ডাইনামিক নোটিশ বোর্ডের জন্য কোড ---
    const noticeContainer = document.getElementById('notice-container');

    if (noticeContainer) {
        fetch('notices.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('নোটিস ফাইল লোড করা যায়নি!');
                }
                return response.json();
            })
            .then(notices => {
                if (notices.length > 0) {
                    notices.forEach(notice => {
                        const noticeCard = document.createElement('div');
                        noticeCard.classList.add('notice-card');
                        noticeCard.innerHTML = `
                            <h3>${notice.title}</h3>
                            <p>${notice.content}</p>
                            <small><strong>প্রকাশের তারিখ:</strong> ${notice.date}</small>
                        `;
                        noticeContainer.appendChild(noticeCard);
                    });
                } else {
                    noticeContainer.innerHTML = '<p>বর্তমানে কোনো নোটিশ নেই।</p>';
                }
            })
            .catch(error => {
                console.error('Error loading notices:', error);
                noticeContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    }


    // --- UNIVERSAL SMOOTH SCROLLING - FIXED FOR ALL PAGES ---
    function initSmoothScrolling() {
        document.querySelectorAll('a[href]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Check if it's a section link on the same page
                if (href && href.includes('#')) {
                    const hashIndex = href.indexOf('#');
                    const pagePart = href.substring(0, hashIndex);
                    const sectionId = href.substring(hashIndex + 1);
                    
                    // Get current page
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    
                    // Determine target page
                    let targetPage = pagePart;
                    if (!targetPage) targetPage = 'index.html';
                    if (targetPage === './') targetPage = 'index.html';
                    if (targetPage === '') targetPage = 'index.html';
                    
                    // If it's the same page, handle smooth scroll
                    if (targetPage === currentPage) {
                        const targetElement = document.getElementById(sectionId);
                        if (targetElement) {
                            e.preventDefault();
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            // Update URL without page reload
                            history.pushState(null, null, `#${sectionId}`);
                        }
                    }
                }
            });
        });
    }

    // Initialize smooth scrolling
    initSmoothScrolling();

    // --- "উপরে যান" বাটনের জন্য কোড ---
    const topBtn = document.getElementById('topBtn');

    if (topBtn) {
        // স্ক্রোল ইভেন্ট লিসেনার যোগ করা হচ্ছে
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        });

        // বাটনে ক্লিক ইভেন্ট লিসেনার যোগ করা হচ্ছে
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Contact Form Handling ---
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Form data collect
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Validate form
                if (validateForm(formData)) {
                    submitForm(formData);
                }
            });
        }
    }

    function validateForm(data) {
        if (!data.name.trim()) {
            alert('দয়া করে আপনার নাম লিখুন');
            return false;
        }
        
        if (!data.email.trim()) {
            alert('দয়া করে আপনার ইমেইল ঠিকানা লিখুন');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('দয়া করে একটি সঠিক ইমেইল ঠিকানা লিখুন');
            return false;
        }
        
        if (!data.subject) {
            alert('দয়া করে একটি বিষয় নির্বাচন করুন');
            return false;
        }
        
        if (!data.message.trim()) {
            alert('দয়া করে আপনার বার্তা লিখুন');
            return false;
        }
        
        if (data.message.trim().length < 10) {
            alert('বার্তাটি খুব ছোট। দয়া করে কমপক্ষে ১০টি অক্ষর লিখুন');
            return false;
        }
        
        return true;
    }

    function submitForm(data) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'পাঠানো হচ্ছে...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend integration)
        setTimeout(() => {
            // Here you can integrate with:
            // 1. EmailJS
            // 2. Google Forms
            // 3. Backend API
            // 4. Or just show success message
            
            console.log('Form submitted:', data);
            
            // Show success message
            alert('ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Optional: Show success message on page
            showSuccessMessage();
            
        }, 1500);
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #c3e6cb;">
                <strong>সফল!</strong> আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </div>
        `;
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 5000);
        }
    }

    // Initialize contact form
    initContactForm();

    // --- Teacher Card Hover Effects ---
    function initTeacherCards() {
        const teacherCards = document.querySelectorAll('.teacher-card');
        
        teacherCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize teacher card effects
    initTeacherCards();

    // --- Gallery Image Loading ---
    function handleImageError() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imqA8L3RleHQ+PC9zdmc+';
                this.alt = 'ছবি লোড করতে সমস্যা হয়েছে';
            });
        });
    }

    // Handle image loading errors
    handleImageError();

    // --- Lightbox Functionality ---
    let currentImageIndex = 0;
    let galleryImages = [];

    function initGallery() {
        // Collect all gallery images
        galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
        
        // Add click event to all gallery images
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                openLightbox(img);
            });
        });
    }

    function openLightbox(imgElement) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        
        currentImageIndex = galleryImages.indexOf(imgElement);
        
        lightboxImg.src = imgElement.src;
        lightboxCaption.textContent = imgElement.alt;
        lightbox.style.display = 'block';
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        
        lightbox.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        
        // Loop through images
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (lightboxImg && lightboxCaption) {
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
        }
    }

    // Keyboard navigation
    function handleKeyboardNavigation(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        }
    }

    // Close lightbox when clicking outside the image
    function handleLightboxClick(e) {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    }

    // Initialize gallery and lightbox
    initGallery();
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    const lightboxElement = document.getElementById('lightbox');
    if (lightboxElement) {
        lightboxElement.addEventListener('click', handleLightboxClick);
    }

    // --- Results Tabs Functionality ---
    function initResultsTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button and pane
                button.classList.add('active');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // Initialize results tabs
    initResultsTabs();

    // --- Events Calendar Navigation ---
    function initEventsCalendar() {
        const prevBtn = document.querySelector('.prev-month');
        const nextBtn = document.querySelector('.next-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                // Add previous month logic here
                console.log('Previous month clicked');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                // Add next month logic here
                console.log('Next month clicked');
            });
        }
    }

    // Initialize events calendar
    initEventsCalendar();

    // --- Active Navigation Highlight ---
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Set active navigation
    setActiveNav();

    // --- Home Banner Slideshow Functionality ---
    function initHomeBannerSlideshow() {
        const slides = document.querySelectorAll('.banner-slide');
        const dots = document.querySelectorAll('.slide-dot');
        
        if (!slides.length) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;
        
        function showSlide(n) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate new slide index
            currentSlide = (n + totalSlides) % totalSlides;
            
            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Next slide function
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Auto slide every 6 seconds
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 6000);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
        
        // Reset interval function
        function resetInterval() {
            clearInterval(slideInterval);
            startSlideShow();
        }
        
        // Pause on hover
        const banner = document.querySelector('.home-banner');
        if (banner) {
            banner.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            banner.addEventListener('mouseleave', () => {
                startSlideShow();
            });
        }
        
        // Initialize slideshow
        showSlide(0);
        startSlideShow();
    }

    // Initialize home banner slideshow
    initHomeBannerSlideshow();

});

// --- Additional Utility Functions ---

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number
function formatPhoneNumber(phone) {
    if (!phone) return '';
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Simple email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Get current year for footer
function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('২০২৫', currentYear);
    }
}

// Initialize footer year
updateFooterYear();

// Page load animations
function initPageAnimations() {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.teacher-card, .facility-card, .event-card, .committee-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    updateFooterYear();
    initPageAnimations();
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Add any resize handling logic here
}, 250));

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imqA8L3RleHQ+PC9zdmc+';
        e.target.alt = 'ছবি লোড করতে সমস্যা হয়েছে';
    }
}, true);