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
        });

        menuClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
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
            const duAnSection = document.getElementById('du-an');
            
            // Smooth scroll to section
            duAnSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Wait for scroll and open accordion
            setTimeout(() => {
                const header = accordionHeaders[targetIndex];
                if (header && !header.classList.contains('active')) {
                    header.click();
                }
            }, 600);
            
            // Close sidebar on mobile
            if (window.innerWidth <= 992 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
});
