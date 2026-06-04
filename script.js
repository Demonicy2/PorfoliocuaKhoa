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
                // Calculate position with offset for top-nav
                const headerOffset = 80; // height of top-nav + some padding
                const elementPosition = targetHeader.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll to the specific item
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Open accordion if not already open
                if (!targetHeader.classList.contains('active')) {
                    targetHeader.click();
                }
            }
            
            // Close sidebar only on mobile (desktop keeps it open)
            if (window.innerWidth <= 992 && sidebar) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
});
