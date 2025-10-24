// script.js - Jonaki Ideal School - Complete Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');

// ==================== MOBILE MENU WITH OUTSIDE CLICK ====================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking on nav links
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }));

    // Close menu when clicking outside (including on the dark area)
    document.addEventListener('click', (e) => {
        const isClickInsideNav = e.target.closest('.navbar');
        const isClickOnNavLinks = e.target.closest('.nav-links');
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
        
        // If clicking on the dark area (right side when menu is open)
        if (!isClickOnNavLinks && navLinks.classList.contains('active') && window.innerWidth <= 768) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });
}

// ==================== DROPDOWN MENU (DESKTOP ONLY) ====================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Only initialize dropdowns on desktop
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (toggle) {
                // Remove any existing event listeners
                toggle.replaceWith(toggle.cloneNode(true));
                const newToggle = dropdown.querySelector('.dropdown-toggle');
                
                newToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all dropdowns first
                    dropdowns.forEach(other => {
                        other.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                    }
                });
            }
        });

        // Close dropdowns when clicking outside (desktop only)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown') && window.innerWidth > 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Close dropdowns when clicking on dropdown items
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.addEventListener('click', function() {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });
    }

    // Close dropdowns on window resize
    window.addEventListener('resize', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}
    // ==================== FIXED NAVIGATION LINKS ====================
    function fixNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href.includes('#')) {
                link.addEventListener('click', function(e) {
                    const currentPage = window.location.pathname.split('/').pop();
                    const isHomePage = currentPage === 'index.html' || currentPage === '' || currentPage === '/';
                    
                    if (href.startsWith('index.html#')) {
                        e.preventDefault();
                        const targetSection = href.split('#')[1];
                        
                        if (isHomePage) {
                            // Already on homepage - scroll to section
                            const targetElement = document.getElementById(targetSection);
                            if (targetElement) {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                                
                                // Update URL hash
                                history.pushState(null, null, `#${targetSection}`);
                            }
                        } else {
                            // On another page - redirect to homepage with section
                            window.location.href = `index.html#${targetSection}`;
                        }
                    } else if (href.startsWith('#') && isHomePage) {
                        // Hash link on homepage
                        e.preventDefault();
                        const targetElement = document.getElementById(href.substring(1));
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            history.pushState(null, null, href);
                        }
                    }
                    
                    // Close mobile menu and dropdowns after click
                    if (window.innerWidth <= 768) {
                        if (hamburger) hamburger.classList.remove("active");
                        if (navLinks) navLinks.classList.remove("active");
                    }
                    
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                });
            }
        });
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

    // ==================== HOME BANNER SLIDESHOW ====================
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.slide-dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        let slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
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
        
        showSlide(0);
    }

    // ==================== RESULTS TABS ====================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // ==================== GALLERY SYSTEM ====================
    function initGallerySliders() {
        const gallerySliders = document.querySelectorAll('.gallery-slider');
        
        gallerySliders.forEach((slider, index) => {
            const images = slider.querySelectorAll('.slider-images img');
            
            if (images.length === 0) return;
            
            let currentIndex = 0;
            
            slider.setAttribute('data-image-count', `${images.length} ছবি`);
            
            function updateSlider() {
                images.forEach(img => {
                    img.classList.remove('active');
                });
                
                if (images[currentIndex]) {
                    images[currentIndex].classList.add('active');
                }
            }
            
            let slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
            }, 4000);
            
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateSlider();
                }, 4000);
            });
            
            slider.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(images[currentIndex]);
            });
            
            updateSlider();
        });
    }

    // ==================== LIGHTBOX SYSTEM ====================
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function openLightbox(clickedImage) {
        if (!clickedImage) return;
        
        const slider = clickedImage.closest('.gallery-slider');
        if (!slider) return;
        
        const images = Array.from(slider.querySelectorAll('.slider-images img'));
        if (images.length === 0) return;
        
        currentLightboxImages = images;
        currentLightboxIndex = images.indexOf(clickedImage);
        
        if (currentLightboxIndex === -1) {
            currentLightboxIndex = 0;
        }
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        if (!lightbox || !lightboxImg) return;
        
        const currentImage = currentLightboxImages[currentLightboxIndex];
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        
        if (lightboxCaption) {
            lightboxCaption.textContent = currentImage.alt;
        }
        
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1}/${currentLightboxImages.length}`;
        }
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            currentLightboxImages = [];
            currentLightboxIndex = 0;
        }
    }

    function changeLightboxImage(direction) {
        if (currentLightboxImages.length === 0) return;
        
        currentLightboxIndex += direction;
        
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = currentLightboxImages.length - 1;
        } else if (currentLightboxIndex >= currentLightboxImages.length) {
            currentLightboxIndex = 0;
        }
        
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
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        
        const closeBtn = document.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        const prevBtn = document.querySelector('.lightbox-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                changeLightboxImage(-1);
            });
        }
        
        const nextBtn = document.querySelector('.lightbox-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                changeLightboxImage(1);
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
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

    // ==================== HASH SCROLL ON PAGE LOAD ====================
    function handleHashOnLoad() {
        const currentPage = window.location.pathname.split('/').pop();
        const isHomePage = currentPage === 'index.html' || currentPage === '' || currentPage === '/';
        
        if (isHomePage && window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 500);
            }
        }
    }

    // ==================== INITIALIZE EVERYTHING ====================
    console.log('Initializing all features...');
    
    initDropdowns();
    fixNavigationLinks();
    initGallerySliders();
    initLightboxEvents();
    setActiveNav();
    handleHashOnLoad();
    
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