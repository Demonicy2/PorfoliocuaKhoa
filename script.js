document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // -----------------------------------------------------
    // 1. Accordion Logic
    // -----------------------------------------------------
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                // Calculate height dynamically
                content.style.maxHeight = content.scrollHeight + "px";
                
                // Adjust height later if PDF embed causes resize
                setTimeout(() => {
                    if(header.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }, 500);
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // -----------------------------------------------------
    // 2. Scroll Spy Logic for Top Nav
    // -----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNavOnScroll() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for the fixed nav

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case: if scrolled to the very bottom, select the last section
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavOnScroll);
    updateNavOnScroll(); // Initial call

    // -----------------------------------------------------
    // 3. Smooth Scroll for Nav Links
    // -----------------------------------------------------
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const rect = targetSection.getBoundingClientRect();
                const absoluteTop = rect.top + window.scrollY;
                window.scrollTo({
                    top: absoluteTop - 100, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // -----------------------------------------------------
    // 5. Theme Toggle Logic (Dark/Light Mode)
    // -----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const rootElement = document.documentElement; // <html> tag
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        rootElement.setAttribute('data-theme', 'dark');
        if (themeLabel) themeLabel.textContent = 'Chế độ Tối';
    } else {
        if (themeLabel) themeLabel.textContent = 'Chế độ Sáng';
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (rootElement.getAttribute('data-theme') === 'dark') {
                rootElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
                if (themeLabel) themeLabel.textContent = 'Chế độ Sáng';
            } else {
                rootElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                if (themeLabel) themeLabel.textContent = 'Chế độ Tối';
            }
        });
    }

    // -----------------------------------------------------
    // 6. Smooth Exit to Welcome Page
    // -----------------------------------------------------
    const btnBackHome = document.getElementById('btn-back-home');
    if (btnBackHome) {
        btnBackHome.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(20px)';
            document.body.style.filter = 'blur(10px)';
            setTimeout(() => { window.location.href = this.href; }, 700);
        });
    }

    // -----------------------------------------------------
    // 7. Sci-Fi Custom Cursor Logic
    // -----------------------------------------------------
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (cursorDot && cursorOutline) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let outlineX = mouseX;
        let outlineY = mouseY;
        
        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            dotX += (mouseX - dotX) * 0.6;
            dotY += (mouseY - dotY) * 0.6;
            
            outlineX += (mouseX - outlineX) * 0.25;
            outlineY += (mouseY - outlineY) * 0.25;
            
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effects for clickable elements
        const hoverElements = document.querySelectorAll('a, button, section h2, .code-badge, .hero h1, .hero .subtitle, .skill-tag, .info-item, .profile-sidebar, .tech-badge, .accordion-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
});
