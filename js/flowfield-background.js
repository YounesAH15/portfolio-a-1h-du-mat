// js/flowfield-background.js

const flowfieldSketch = (sketch) => {
    let points = [];
    let mult; // Will be set based on theme

    // Theme colors (will be overridden by portfolio's Tailwind config, but good for standalone)
    const electricBlue = [0, 123, 255];
    const goldCustom = [255, 215, 0];
    const lightContrast = 0; // Not used directly in particle colors

    const nearBlack = [0+lightContrast, 0+lightContrast, 0+lightContrast];
    const nearWhite = [255-lightContrast, 255-lightContrast, 255-lightContrast];

    let particleColors;
    let chosenColor; 
    let chosenStrokeColor;
    sketch.setup = () => {
        let canvasContainer = document.getElementById('flowfield-background-container');
        sketch.createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent(canvasContainer);
        sketch.angleMode(sketch.DEGREES);
        sketch.noiseDetail(3.1415);

        const density = sketch.width > 768 ? 75 : 30; // Adjust density for screen size
        const spacing = sketch.width / density;

        for (let x = 0; x <= sketch.width; x += spacing) {
            for (let y = 0; y <= sketch.height; y += spacing) {
                let p = sketch.createVector(x + sketch.random(-10, 10), y + sketch.random(-10, 10));
                points.push(p);
            }
        }
        
        // Set colors based on the current theme of the main page
        updateColorsBasedOnTheme();
        sketch.background(nearBlack[0], nearBlack[1], nearBlack[2], 200); // Initial semi-transparent dark background
        chosenColor = sketch.random(particleColors);
        chosenStrokeColor = sketch.random(particleColors);
    };

    function updateColorsBasedOnTheme() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        // Define particle colors based on the theme
        // In dark mode, electric blue and gold are primary
        // In light mode, they can be slightly desaturated or different, or remain vibrant
        if (isDarkMode) {
            particleColors = [
                // sketch.color(electricBlue[0], electricBlue[1], electricBlue[2], 150), // More opaque for dark mode
                sketch.color(goldCustom[0], goldCustom[1], goldCustom[2], 150)
            ];
            chosenStrokeColor = sketch.color(nearBlack[0], nearBlack[1], nearBlack[2], 50); // Subtle stroke for dark mode
            mult = 0.02; // Slower/more subtle movement for dark mode
        } else {
            // Light mode particle colors - can be adjusted
            particleColors = [
                // sketch.color(goldCustom[0], goldCustom[1], goldCustom[2], 150), // More opaque for light mode
                sketch.color(electricBlue[0], electricBlue[1], electricBlue[2], 150) // Lighter variant
            ];
            chosenStrokeColor = sketch.color(nearWhite[0], nearWhite[1], nearWhite[2], 50); // Subtle stroke for light mode
            mult = 0.03; // Slightly faster for light mode
        }
        
    }


    sketch.draw = () => {
        // Gently fade the background for a trailing effect instead of a solid clear
        // The alpha value controls the length of the trails
        const isDarkMode = document.documentElement.classList.contains('dark');
        let bgColor = isDarkMode ? sketch.color(nearBlack[0], nearBlack[1], nearBlack[2], 25) : sketch.color(240, 240, 240, 25); // Use light-contrast for light mode bg
        sketch.background(bgColor);
        
        sketch.fill(chosenColor);
        sketch.stroke(chosenStrokeColor)
        for (let i = 0; i < points.length; i++) {
            let p = points[i];

            // Select a color from the theme palette



            let angle = sketch.map(sketch.noise(p.x * mult, p.y * mult), 0, 1, 0, 720);
            
            p.add(sketch.cos(angle), sketch.sin(angle));

            // Particle size can also be dynamic or themed
            let particleSize = sketch.map(sketch.dist(sketch.width / 2, sketch.height / 2, p.x, p.y), 0, sketch.width/2, 6, 1);
            sketch.circle(p.x, p.y, particleSize*1.618); // Using the golden ratio for size

            // Wrap particles around the edges
            if (p.x < 0) p.x = sketch.width;
            if (p.x > sketch.width) p.x = 0;
            if (p.y < 0) p.y = sketch.height;
            if (p.y > sketch.height) p.y = 0;
        }
    };

    sketch.windowResized = () => {
        let canvasContainer = document.getElementById('flowfield-background-container');
        sketch.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        
        // Reinitialize points based on new canvas size
        points = [];
        const density = sketch.width > 768 ? 50 : 30;
        const spacing = sketch.width / density;
        for (let x = 0; x <= sketch.width; x += spacing) {
            for (let y = 0; y <= sketch.height; y += spacing) {
                let p = sketch.createVector(x + sketch.random(-10, 10), y + random(-10, 10));
                points.push(p);
            }
        }
        // Update colors and redraw background on resize
        updateColorsBasedOnTheme();
        sketch.background(nearBlack[0], nearBlack[1], nearBlack[2], 200);
    };
    
    // Listen for theme changes on the main document to update colors
    // This requires your main theme toggle to somehow signal this.
    // A simple way is to listen to clicks on the theme toggle button.
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            // Add a small delay to allow the class on <html> to update
            setTimeout(() => {
                updateColorsBasedOnTheme();
            }, 10);
        });
    }
     // Initial color setup based on theme
     setTimeout(updateColorsBasedOnTheme, 250); // Ensure DOM is ready for classList check

};

// Create the p5.js instance for the background
new p5(flowfieldSketch);
