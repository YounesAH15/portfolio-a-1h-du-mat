// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Gestion de l'année en cours ---
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Gestion du mode sombre (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
        }
        // NOTE: The flowfield background sketch (flowfield-background.js) 
        // will listen for clicks on the theme-toggle button to update its colors.
    }

    const initialThemeIsDark = document.documentElement.classList.contains('dark');
    if (initialThemeIsDark) {
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
    } else {
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            applyTheme(!document.documentElement.classList.contains('dark'));
        });
    }

    // --- Gestion de la navigation SPA ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const homeLink = document.getElementById('nav-home');

    function updateActiveSection(targetId) {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                section.classList.add('active-section');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active-section');
            }
        });

        navLinks.forEach(link => {
            // Check if the link's data-section matches the targetId OR
            // if the link's href (after #) matches the targetId (for the "Contactez-moi" button)
            const linkTarget = link.dataset.section || (link.getAttribute('href') || '').substring(1);
            if (linkTarget === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        if (mobileMenu.classList.contains('active-mobile-menu')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active-mobile-menu');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.section || (this.getAttribute('href') || '').substring(1);
            if (targetId) { // Ensure targetId is not empty
                updateActiveSection(targetId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            updateActiveSection('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    updateActiveSection('about');

    // --- Gestion du Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active-mobile-menu');
        });
    }

    // --- Fibonacci Animation P5.js (REMOVED) ---
    // All logic related to the previous p5.js animation (initP5Sketch, etc.) has been removed.
    // The new flowfield animation is handled in js/flowfield-background.js
});
