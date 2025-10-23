// script.js - Jonaki Ideal School - Complete Working Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');

    // ==================== MOBILE MENU ====================
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

  // ==================== NOTICES ====================
const noticeContainer = document.getElementById('notice-container');
if (noticeContainer) {
    fetch('notices.json')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
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
                // Show beautiful empty state when no notices
                noticeContainer.innerHTML = `
                    <div class="no-notice">
                        <div class="no-notice-icon">📢</div>
                        <h3>কোনো নোটিশ নেই</h3>
                        <p>বর্তমানে কোনো নতুন নোটিশ প্রকাশ করা হয়নি। নতুন নোটিশ প্রকাশিত হলে এখানে দেখানো হবে।</p>
                        <div class="no-notice-tips">
                            <p><strong>দ্রষ্টব্য:</strong> নিয়মিত এই পেজটি চেক করুন নতুন আপডেটের জন্য।</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Notice error:', error);
            noticeContainer.innerHTML = `
                <div class="no-notice error">
                    <div class="no-notice-icon">⚠️</div>
                    <h3>নোটিশ লোড করতে সমস্যা</h3>
                    <p>নোটিশ লোড করতে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
                </div>
            `;
        });
}

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== BACK TO TOP BUTTON ====================
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('দয়া করে সঠিক ইমেইল ঠিকানা লিখুন।');
                return;
            }
            
            // Show success message
            alert('ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            this.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==================== HOME BANNER SLIDESHOW ====================
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.slide-dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(n) {
            // Hide all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide and dot
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Pause on hover
        const banner = document.querySelector('.home-banner');
        if (banner) {
            banner.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            banner.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            });
        }
        
        // Initialize
        showSlide(0);
    }

    // ==================== RESULTS TABS ====================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // ==================== GALLERY SYSTEM ====================
    function initGallerySliders() {
        const gallerySliders = document.querySelectorAll('.gallery-slider');
        console.log('Found gallery sliders:', gallerySliders.length);
        
        gallerySliders.forEach((slider, index) => {
            const images = slider.querySelectorAll('.slider-images img');
            console.log(`Slider ${index + 1} has ${images.length} images`);
            
            if (images.length === 0) {
                console.warn('No images found in slider', slider);
                return;
            }
            
            let currentIndex = 0;
            
            // Set image count badge
            slider.setAttribute('data-image-count', `${images.length} ছবি`);
            
            function updateSlider() {
                // Hide all images
                images.forEach(img => {
                    img.classList.remove('active');
                });
                
                // Show current image
                if (images[currentIndex]) {
                    images[currentIndex].classList.add('active');
                }
            }
            
            // Auto slide every 4 seconds
            let slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
            }, 4000);
            
            // Pause on hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateSlider();
                }, 4000);
            });
            
            // Click to open lightbox
            slider.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Gallery clicked, opening lightbox with image:', currentIndex);
                openLightbox(images[currentIndex]);
            });
            
            // Initialize slider
            updateSlider();
        });
    }

    // ==================== LIGHTBOX SYSTEM ====================
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function openLightbox(clickedImage) {
        console.log('openLightbox called with:', clickedImage);
        
        if (!clickedImage) {
            console.error('No image provided to openLightbox');
            return;
        }
        
        // Find the slider and all images
        const slider = clickedImage.closest('.gallery-slider');
        if (!slider) {
            console.error('No slider found for the clicked image');
            return;
        }
        
        const images = Array.from(slider.querySelectorAll('.slider-images img'));
        if (images.length === 0) {
            console.error('No images found in the slider');
            return;
        }
        
        currentLightboxImages = images;
        currentLightboxIndex = images.indexOf(clickedImage);
        
        if (currentLightboxIndex === -1) {
            currentLightboxIndex = 0;
            console.warn('Clicked image not found in images array, using first image');
        }
        
        console.log('Lightbox data:', {
            totalImages: currentLightboxImages.length,
            currentIndex: currentLightboxIndex,
            currentImage: currentLightboxImages[currentLightboxIndex].src
        });
        
        // Get lightbox elements
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        if (!lightbox) {
            console.error('Lightbox element not found');
            return;
        }
        
        if (!lightboxImg) {
            console.error('Lightbox image element not found');
            return;
        }
        
        // Set content
        const currentImage = currentLightboxImages[currentLightboxIndex];
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        
        if (lightboxCaption) {
            lightboxCaption.textContent = currentImage.alt;
        }
        
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1}/${currentLightboxImages.length}`;
        }
        
        // Show lightbox
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        console.log('Lightbox opened successfully');
    }

    function closeLightbox() {
        console.log('Closing lightbox');
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            currentLightboxImages = [];
            currentLightboxIndex = 0;
        }
    }

    function changeLightboxImage(direction) {
        console.log('Changing image direction:', direction);
        
        if (currentLightboxImages.length === 0) {
            console.error('No images in lightbox');
            return;
        }
        
        currentLightboxIndex += direction;
        
        // Loop around
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = currentLightboxImages.length - 1;
        } else if (currentLightboxIndex >= currentLightboxImages.length) {
            currentLightboxIndex = 0;
        }
        
        console.log('New image index:', currentLightboxIndex);
        
        // Update lightbox
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        const currentImage = currentLightboxImages[currentLightboxIndex];
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        
        if (lightboxCaption) {
            lightboxCaption.textContent = currentImage.alt;
        }
        
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1}/${currentLightboxImages.length}`;
        }
    }

    function initLightboxEvents() {
        console.log('Initializing lightbox events...');
        
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            console.error('Lightbox element not found for event initialization');
            return;
        }
        
        // Close button
        const closeBtn = document.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
            console.log('Close button event added');
        } else {
            console.error('Close button not found');
        }
        
        // Previous button
        const prevBtn = document.querySelector('.lightbox-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                changeLightboxImage(-1);
            });
            console.log('Previous button event added');
        } else {
            console.error('Previous button not found');
        }
        
        // Next button
        const nextBtn = document.querySelector('.lightbox-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                changeLightboxImage(1);
            });
            console.log('Next button event added');
        } else {
            console.error('Next button not found');
        }
        
        // Close when clicking outside image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        changeLightboxImage(-1);
                        break;
                    case 'ArrowRight':
                        changeLightboxImage(1);
                        break;
                }
            }
        });
        
        console.log('All lightbox events initialized successfully');
    }

    // ==================== ACTIVE NAVIGATION ====================
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
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

    // ==================== INITIALIZE EVERYTHING ====================
    console.log('Initializing all features...');
    
    // Initialize gallery and lightbox first
    initGallerySliders();
    initLightboxEvents();
    setActiveNav();
    
    console.log('All features initialized successfully');

    // ==================== IMAGE ERROR HANDLING ====================
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            e.target.style.display = 'none';
        }
    }, true);

});

// ==================== UTILITY FUNCTIONS ====================
function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('২০২৫', currentYear);
    }
}

// Update footer year when page loads
window.addEventListener('load', function() {
    updateFooterYear();
});

console.log('Jonaki Ideal School JavaScript loaded');

// Mobile Dropdown Functionality
function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    initMobileDropdowns();
    console.log('Dropdown functionality loaded');
});
// স্মুথ স্ক্রল ফাংশন
function smoothScroll(target) {
    if (target.startsWith('#')) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // ন্যাভবার的高度 বিবেচনা করে
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// একটিভ লিংক আপডেট ফাংশন
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            link.getAttribute('href') === `index.html#${current}`) {
            link.classList.add('active');
        }
    });
}

// ইভেন্ট লিসেনার যোগ করুন
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // শুধুমাত্র হ্যাশ লিংকের জন্য স্মুথ স্ক্রল
            if (href.includes('#')) {
                e.preventDefault();
                const target = href.split('#')[1];
                smoothScroll(`#${target}`);
            }
            
            // একটিভ ক্লাস আপডেট
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // স্ক্রল ইভেন্টে একটিভ লিংক আপডেট
    window.addEventListener('scroll', updateActiveLink);
});

// হ্যামবার্গার মেনু টগল (যদি থাকে)
document.querySelector('.hamburger')?.addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
});
