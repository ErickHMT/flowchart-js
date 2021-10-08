export default class CanvasManager {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("mouseout", this.handleMouseOut.bind(this));

        this.cardWidth = 200;
        this.cardHeight = 100;
        this.startX; 
        this.startY;
        this.selectedCardIndex = -1;

        this.cardItems = [{
            title: "First Card",
            content: "This is the first card",
            anchorPoint: {
                type: 'bottom',
                x: 0,
              y: 0
            },
            x: 600,
            y: 100
          }, {
            title: "Second Card",
            content: "This is the Second card",
            anchorPoint: {
                type: 'top',
                x: 0,
              y: 0
            },
            x: 800,
            y: 400
        }];
    }
    
    initialize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      
        this.drawCards();
    }

    drawCards() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.cardItems.length; i++) {
            /* console.log('loop: ', i) */
            let anchorPointX = 0;
            let anchorPointY = 0;
            
            if(this.cardItems[i].anchorPoint.type == 'top') {
                 anchorPointX = this.cardItems[i].x + (this.cardWidth / 2);
                anchorPointY = this.cardItems[i].y;
            }
            if(this.cardItems[i].anchorPoint.type == 'bottom') {
                anchorPointY += this.cardItems[i].y + this.cardHeight;
                anchorPointX = this.cardItems[i].x + (this.cardWidth / 2);
            }
        
            this.drawAnchorPoint(anchorPointX, anchorPointY, 5, "#2b2b2b");
        
            this.cardItems[i].anchorPoint.x = anchorPointX;
            this.cardItems[i].anchorPoint.y = anchorPointY;
        
            this.ctx.fillStyle = "#edeff2";
            this.ctx.fillRect(this.cardItems[i].x, this.cardItems[i].y, this.cardWidth, this.cardHeight);
        
            this.ctx.fillStyle = "black";
            this.ctx.font = "15px Arial";
            this.ctx.fillText(this.cardItems[i].title, this.cardItems[i].x + 10, this.cardItems[i].y + 20);
        
            this.ctx.font = "10px Arial";
            this.ctx.fillText(
              this.cardItems[i].content,
              this.cardItems[i].x + 10,
              this.cardItems[i].y + 40
            );
          }
        
          this.ctx.strokeStyle = "#2b2b2b";
          this.ctx.beginPath();
          this.ctx.moveTo(this.cardItems[0].anchorPoint.x, this.cardItems[0].anchorPoint.y);
          this.ctx.lineTo(this.cardItems[1].anchorPoint.x, this.cardItems[1].anchorPoint.y);
          this.ctx.stroke();
    }

    drawAnchorPoint(x, y, radius, fill) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        if (fill) {
          this.ctx.fillStyle = fill;
          this.ctx.fill();
        }
    }

    handleMouseDown(e) {
        e.preventDefault();
        let mousePos = this.getMousePos(e);
        this.startX = mousePos.x;
        this.startY = mousePos.y;
      
        for(let i = 0; i < this.cardItems.length; i++) {
          if (this.validateCardHitbox(this.startX, this.startY, i)) {
              // Save de index of current card selected
            this.selectedCardIndex = i;
          }
        }
    }

    handleMouseMove(e) {
        e.preventDefault();
        if (this.selectedCardIndex == -1) {
            return;
        }
      
        let mousePos = this.getMousePos(e);
        let mouseX = mousePos.x;
        let mouseY = mousePos.y;
        let dx = mouseX - this.startX;
        let dy = mouseY - this.startY;
        this.startX = mouseX;
        this.startY = mouseY;
      
        let cardItem = this.cardItems[this.selectedCardIndex];
        if(!isNaN(dx))
          cardItem.x = cardItem.x + dx;
        if(!isNaN(dy))
          cardItem.y = cardItem.y + dy;
      
        this.drawCards();
    }

    // Done Dragging
    handleMouseOut(e) {
        e.preventDefault();
        this.selectedCardIndex = -1;
    }

    // Done Dragging
    handleMouseUp(e) {
        e.preventDefault();
        this.selectedCardIndex = -1;
    }

    // Get current mouse position on canvas 
    getMousePos(e) {
        let rect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / rect.width; 
        let scaleY = this.canvas.height / rect.height;
      
        return {
          x: parseInt((e?.clientX - rect.left) * scaleX),
          y: parseInt((e?.clientY - rect.top) * scaleY)
        };
    }

    // Validate if x,y is inside card item
    validateCardHitbox(x, y, index) {
        let cardItem = this.cardItems[index]
        let isInsideOnX = x >= cardItem.x && x <= cardItem.x + this.cardWidth;
        let isInsideOnY = y <= cardItem.y + this.cardHeight && y >= cardItem.y;

        return isInsideOnX && isInsideOnY;
    }
}