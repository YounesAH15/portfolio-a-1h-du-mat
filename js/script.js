// js/script.js

// --- Core Functions ---

function updateCurrentYear(element) {
    if (element) {
        element.textContent = new Date().getFullYear();
    }
}

function applyTheme(isDark, themeToggleDarkIcon, themeToggleLightIcon) {
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
}

function updateActiveSection(targetId, contentSections, navLinks) {
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
        const linkTarget = link.dataset.section || (link.getAttribute('href') || '').substring(1);
        if (linkTarget === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function toggleMobileMenu(mobileMenu) {
    if (mobileMenu) {
        if (mobileMenu.classList.contains('active-mobile-menu')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active-mobile-menu');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('active-mobile-menu');
        }
    }
}

// --- DOMContentLoaded Event Listener ---

document.addEventListener('DOMContentLoaded', function() {
    // --- Year ---
    const currentYearElement = document.getElementById('currentYear');
    updateCurrentYear(currentYearElement);

    // --- Theme ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Set initial theme based on class
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
            applyTheme(!document.documentElement.classList.contains('dark'), themeToggleDarkIcon, themeToggleLightIcon);
        });
    }

    // --- SPA Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const homeLink = document.getElementById('nav-home');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.section || (this.getAttribute('href') || '').substring(1);
            if (targetId) {
                updateActiveSection(targetId, contentSections, navLinks);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            updateActiveSection('about', contentSections, navLinks);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    updateActiveSection('about', contentSections, navLinks);

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu(mobileMenu);
        });
    }
});

// --- Exports for testing ---
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCurrentYear,
        applyTheme,
        updateActiveSection,
        toggleMobileMenu
    };
}
