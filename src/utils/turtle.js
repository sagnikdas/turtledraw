/**
 * Turtle Graphics Engine
 * Handles drawing and turtle visualization on canvas
 */

export class Turtle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Configure canvas context for better rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        // Turtle state - default position at center
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.heading = 0; // degrees, 0 = up (north)
        this._penDown = true; // Internal property (use getPenDown() to access)
        this.penErase = false;
        this.visible = true;
        this.penColor = '#667eea';
        this.penSize = 2;
        
        // Animation state
        this.isAnimating = false;
        this.animationQueue = [];
        this.blinkInterval = null;
        this.blinking = true;
        this.isMoving = false;
        
        // Initialize canvas
        this.initializeCanvas();
        this.startBlinking();
    }

    initializeCanvas() {
        // Clear and set background
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.width, this.height);
        // Set initial position without animation (center)
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.heading = 0;
        // Ensure pen is down by default
        this._penDown = true;
        this.drawTurtle();
    }

    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }

    drawTurtle() {
        if (!this.visible) return;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.toRadians(this.heading));

        // Draw a white background circle FIRST to cover old turtle position
        // This goes behind the triangle but covers old triangles
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.beginPath();
        // Circle just big enough to cover the triangle
        this.ctx.arc(0, 0, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Draw a triangle representing the turtle
        // Pointed end (top) is the head, base (bottom) is the tail
        const size = 12; // Size of the triangle
        const headLength = size * 0.6; // Length from center to head point
        const tailWidth = size * 0.8; // Width of the tail/base
        
        this.ctx.beginPath();
        // Start at the head (pointed end, pointing up)
        this.ctx.moveTo(0, -headLength);
        // Draw to bottom-left corner of tail
        this.ctx.lineTo(-tailWidth / 2, headLength);
        // Draw to bottom-right corner of tail
        this.ctx.lineTo(tailWidth / 2, headLength);
        // Close the triangle back to head
        this.ctx.closePath();
        
        // Fill the triangle
        if (this.blinking) {
            this.ctx.fillStyle = '#4CAF50';
        } else {
            this.ctx.fillStyle = '#45a049';
        }
        this.ctx.fill();
        
        // Add a stroke for better visibility
        this.ctx.strokeStyle = '#2e7d32';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        this.ctx.restore();
    }

    startBlinking() {
        this.blinkInterval = setInterval(() => {
            this.blinking = !this.blinking;
            this.redraw();
        }, 500);
    }

    stopBlinking() {
        if (this.blinkInterval) {
            clearInterval(this.blinkInterval);
            this.blinkInterval = null;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async animateMove(targetX, targetY, steps = 20) {
        this.isMoving = true;
        const startX = this.x;
        const startY = this.y;
        const dx = (targetX - startX) / steps;
        const dy = (targetY - startY) / steps;

        // Draw the complete line first if pen is down - single clean stroke
        if (this._penDown) {
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = this.penErase ? '#f8f9fa' : this.penColor;
            this.ctx.lineWidth = this.penSize;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(targetX, targetY);
            this.ctx.stroke();
            this.ctx.restore();
        }

        // Animate turtle movement - NO clearing, just draw turtle at each position
        // The white background in drawTurtle will handle overlap
        for (let i = 0; i <= steps; i++) {
            // Update position
            this.x = startX + dx * i;
            this.y = startY + dy * i;
            
            // Draw turtle at new position (white background covers old position)
            this.drawTurtle();
            
            await this.sleep(20);
        }
        
        this.isMoving = false;
    }

    redraw() {
        // Simply draw the dot at current position/orientation
        // No clearing - the dot is small enough that overlap is minimal
        this.drawTurtle();
    }

    async forward(distance) {
        const radians = this.toRadians(this.heading);
        const newX = this.x + Math.sin(radians) * distance;
        const newY = this.y - Math.cos(radians) * distance;
        await this.animateMove(newX, newY);
    }

    async backward(distance) {
        const radians = this.toRadians(this.heading);
        const newX = this.x - Math.sin(radians) * distance;
        const newY = this.y + Math.cos(radians) * distance;
        await this.animateMove(newX, newY);
    }

    async animateRotate(targetHeading, steps = 10) {
        const startHeading = this.heading;
        const diff = ((targetHeading - startHeading + 540) % 360) - 180;
        const stepSize = diff / steps;

        for (let i = 0; i <= steps; i++) {
            this.heading = (startHeading + stepSize * i + 360) % 360;
            this.redraw();
            await this.sleep(20);
        }
    }

    async right(degrees) {
        const newHeading = (this.heading + degrees) % 360;
        await this.animateRotate(newHeading);
    }

    async left(degrees) {
        const newHeading = (this.heading - degrees + 360) % 360;
        await this.animateRotate(newHeading);
    }

    penUp() {
        this._penDown = false;
    }

    penDown() {
        this._penDown = true;
    }

    penErase() {
        this.penErase = true;
    }

    penPaint() {
        this.penErase = false;
        this._penDown = true;
    }

    async clearScreen() {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Reset turtle to center without drawing
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Set position directly (no animation, no line drawing)
        this.x = centerX;
        this.y = centerY;
        this.heading = 0;
        
        // Draw turtle at center
        this.drawTurtle();
    }

    async home() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        await this.animateMove(centerX, centerY);
        await this.animateRotate(0);
    }

    async setXY(x, y) {
        await this.animateMove(x, y);
    }

    async setHeading(heading) {
        await this.animateRotate(heading);
    }

    setPenColor(color) {
        const colorMap = {
            'black': '#000000',
            'white': '#ffffff',
            'red': '#ff0000',
            'green': '#00ff00',
            'blue': '#0000ff',
            'yellow': '#ffff00',
            'cyan': '#00ffff',
            'magenta': '#ff00ff'
        };
        this.penColor = colorMap[color] || color || '#667eea';
    }

    setPenSize(size) {
        this.penSize = Math.max(1, size);
    }

    hideTurtle() {
        this.visible = false;
        this.redraw();
    }

    showTurtle() {
        this.visible = true;
        this.redraw();
    }

    getPosition() {
        return { x: Math.round(this.x), y: Math.round(this.y) };
    }

    getHeading() {
        return Math.round(this.heading);
    }

    getPenStatus() {
        return this._penDown ? 'Down' : 'Up';
    }

    getPenDown() {
        return this._penDown;
    }
}

