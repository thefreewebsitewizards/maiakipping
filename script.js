// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links li a');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Mobile dropdown toggle
const dropdownItems = document.querySelectorAll('.dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdownLinks = item.querySelectorAll('.dropdown-menu a');
    
    // Main dropdown link - allow navigation on click
    link.addEventListener('click', (e) => {
        // Allow navigation to work normally
        // Don't prevent default so the link works normally
    });
    
    // Ensure dropdown menu links navigate properly
    dropdownLinks.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', () => {
            // Close mobile menu when clicking a dropdown link
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});

// Close dropdowns when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        dropdownItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Scroll Animation
function scrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
}

// Run scroll animation on scroll
window.addEventListener('scroll', scrollAnimation);
// Run once on page load to check for elements already in view
window.addEventListener('load', scrollAnimation);

// Lightbox for Portfolio Images and Videos
// Lightbox for Portfolio Images and Videos
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxVideo = document.querySelector('.lightbox-video');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (!galleryItems.length || !lightbox) return;
    
    let currentIndex = 0;
    const mediaItems = [];
    
    // Collect all media items (images and videos)
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        
        if (img) {
            mediaItems.push({type: 'image', src: img.src});
        } else if (video) {
            mediaItems.push({type: 'video', src: video.src});
        }
        
        // Add click event to open lightbox
        item.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateLightboxMedia();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Update lightbox media based on current index
    function updateLightboxMedia() {
        const currentItem = mediaItems[currentIndex];
        
        if (!currentItem) return;
        
        // Reset both media elements
        lightboxImg.classList.remove('active');
        lightboxVideo.classList.remove('active');
        lightboxVideo.pause();
        
        if (currentItem.type === 'image') {
            lightboxImg.src = currentItem.src;
            lightboxImg.classList.add('active');
        } else if (currentItem.type === 'video') {
            lightboxVideo.src = currentItem.src;
            lightboxVideo.classList.add('active');
            lightboxVideo.play().catch(e => console.log("Video play error:", e));
        }
    }
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (lightboxVideo) {
                lightboxVideo.pause();
            }
        });
    }
    
    // Navigate to previous media
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            updateLightboxMedia();
        });
    }
    
    // Navigate to next media
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % mediaItems.length;
            updateLightboxMedia();
        });
    }
    
    // Close lightbox when clicking outside the media
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (lightboxVideo) {
                lightboxVideo.pause();
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (lightboxVideo) {
                lightboxVideo.pause();
            }
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            updateLightboxMedia();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % mediaItems.length;
            updateLightboxMedia();
        }
    });
}

// Initialize lightbox when page loads
window.addEventListener('load', initLightbox);

// Charts for Analytics Section
function initCharts() {
    const tiktokChart = document.getElementById('tiktok-chart');
    const youtubeChart = document.getElementById('youtube-chart');
    
    if (tiktokChart) {
        const ctx = tiktokChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [15, 80, 5],
                    backgroundColor: ['#634832', '#38220f', '#ece0d1'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    if (youtubeChart) {
        const ctx = youtubeChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Followers', 'Non-followers'],
                datasets: [{
                    data: [45.2, 54.8],
                    backgroundColor: ['#634832', '#ece0d1'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Initialize charts when page loads (if Chart.js is included)
window.addEventListener('load', function() {
    if (typeof Chart !== 'undefined') {
        initCharts();
    }
});

// Auto-play videos when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.gallery-item video');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle video playback
    function handleVideoPlayback() {
        videos.forEach(video => {
            if (isInViewport(video)) {
                if (video.paused) {
                    video.play().catch(e => console.log("Video play error:", e));
                }
            } else {
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }
    
    // Check videos on scroll
    window.addEventListener('scroll', handleVideoPlayback);
    
    // Check videos on page load
    handleVideoPlayback();
    
    // Handle click on video items
    videos.forEach(video => {
        const galleryItem = video.closest('.gallery-item');
        galleryItem.addEventListener('click', function(e) {
            e.preventDefault();
            if (video.paused) {
                video.play().catch(e => console.log("Video play error:", e));
            } else {
                video.pause();
            }
        });
    });
});

// Replace Typewriter Effect with Static Text
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    // Simply set the text content directly without animation
    typewriterElement.textContent = "Hey, I'm Maia";
});

// Ensure animations run on work.html page
document.addEventListener('DOMContentLoaded', function() {
    // Run scroll animation on page load
    scrollAnimation();
});
