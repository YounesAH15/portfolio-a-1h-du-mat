const { updateCurrentYear, applyTheme, updateActiveSection, toggleMobileMenu } = require('./script.js');

// Mock localStorage
class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

describe('Portfolio Script Tests', () => {

    afterEach(() => {
        // Clean up the DOM after each test
        document.body.innerHTML = '';
        localStorage.clear();
    });

    describe('updateCurrentYear', () => {
        test('should set the current year as textContent', () => {
            const element = { textContent: '' };
            updateCurrentYear(element);
            expect(element.textContent).toBe(new Date().getFullYear().toString());
        });

        test('should not throw an error if element is null', () => {
            expect(() => updateCurrentYear(null)).not.toThrow();
        });
    });

    describe('applyTheme', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <button id="theme-toggle">
                    <svg id="theme-toggle-dark-icon"></svg>
                    <svg id="theme-toggle-light-icon"></svg>
                </button>
            `;
        });

        test('should apply dark mode correctly', () => {
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            const lightIcon = document.getElementById('theme-toggle-light-icon');

            applyTheme(true, darkIcon, lightIcon);

            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(darkIcon.classList.contains('hidden')).toBe(false);
            expect(lightIcon.classList.contains('hidden')).toBe(true);
            expect(localStorage.getItem('theme')).toBe('dark');
        });

        test('should apply light mode correctly', () => {
            document.documentElement.classList.add('dark');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            const lightIcon = document.getElementById('theme-toggle-light-icon');

            applyTheme(false, darkIcon, lightIcon);

            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(darkIcon.classList.contains('hidden')).toBe(true);
            expect(lightIcon.classList.contains('hidden')).toBe(false);
            expect(localStorage.getItem('theme')).toBe('light');
        });
    });

    describe('updateActiveSection', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="nav">
                    <a href="#about" class="nav-link" data-section="about">About</a>
                    <a href="#projects" class="nav-link" data-section="projects">Projects</a>
                </div>
                <div id="content">
                    <section id="about" class="content-section"></section>
                    <section id="projects" class="content-section hidden"></section>
                </div>
            `;
        });

        test('should show the target section and hide others', () => {
            const contentSections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.nav-link');

            updateActiveSection('projects', contentSections, navLinks);

            const aboutSection = document.getElementById('about');
            const projectsSection = document.getElementById('projects');

            expect(aboutSection.classList.contains('hidden')).toBe(true);
            expect(aboutSection.classList.contains('active-section')).toBe(false);
            expect(projectsSection.classList.contains('hidden')).toBe(false);
            expect(projectsSection.classList.contains('active-section')).toBe(true);
        });

        test('should set the correct nav link as active', () => {
            const contentSections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.nav-link');

            updateActiveSection('projects', contentSections, navLinks);

            const aboutLink = document.querySelector('a[data-section="about"]');
            const projectsLink = document.querySelector('a[data-section="projects"]');

            expect(aboutLink.classList.contains('active')).toBe(false);
            expect(projectsLink.classList.contains('active')).toBe(true);
        });
    });

    describe('toggleMobileMenu', () => {
        beforeEach(() => {
            document.body.innerHTML = `<div id="mobile-menu" class="hidden"></div>`;
        });

        test('should show the mobile menu if it is hidden', () => {
            const mobileMenu = document.getElementById('mobile-menu');

            toggleMobileMenu(mobileMenu);

            expect(mobileMenu.classList.contains('hidden')).toBe(false);
            expect(mobileMenu.classList.contains('active-mobile-menu')).toBe(true);
        });

        test('should hide the mobile menu if it is visible', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('active-mobile-menu');

            toggleMobileMenu(mobileMenu);

            expect(mobileMenu.classList.contains('hidden')).toBe(true);
            expect(mobileMenu.classList.contains('active-mobile-menu')).toBe(false);
        });

        test('should not throw an error if menu element is null', () => {
            expect(() => toggleMobileMenu(null)).not.toThrow();
        });
    });
});
