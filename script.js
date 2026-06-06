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
    // 2. Sidebar Toggle Logic (Mobile)
    // -----------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const menuClose = document.getElementById('menu-close');

    if (hamburger && sidebar && menuClose) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('active');
            document.body.classList.add('sidebar-open');
        });

        menuClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        });
    }

    // -----------------------------------------------------
    // 3. Submenu Toggle Logic
    // -----------------------------------------------------
    const duAnLink = document.getElementById('du-an-link');
    if (duAnLink) {
        duAnLink.addEventListener('click', (e) => {
            e.preventDefault();
            const parentLi = duAnLink.parentElement;
            parentLi.classList.toggle('open');
        });
    }

    // -----------------------------------------------------
    // 4. Submenu Link Scroll & Open Accordion Logic
    // -----------------------------------------------------
    const submenuLinks = document.querySelectorAll('.submenu-link');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIndex = link.getAttribute('data-target');
            // Find the target accordion header
            const targetHeader = accordionHeaders[targetIndex];
            
            if (targetHeader) {
                // Open accordion if not already open (do this first to trigger layout changes)
                if (!targetHeader.classList.contains('active')) {
                    targetHeader.click();
                }
                
                // Wait slightly for the accordion to close others and open this one, 
                // preventing blurry iframe rendering during concurrent scroll + CSS animation.
                setTimeout(() => {
                    const headerOffset = 80; 
                    const elementPosition = targetHeader.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 150);
            }
            // Sidebar will not auto-close when a link is clicked, allowing it to stay open as an overlay.
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
});
