let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse and Touch Move
    const onMove = (e) => {
      let clientX, clientY;

      if (e.type.includes('touch')) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (!this.rotating) {
        this.mouseX = clientX;
        this.mouseY = clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = clientX - this.mouseTouchX;
      const dirY = clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;

      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }

      e.preventDefault(); // Prevent scrolling while dragging
    };

    // Mouse and Touch Start
    const onStart = (e) => {
      if (this.holdingPaper) return;

      let clientX, clientY;

      if (e.type.includes('touch')) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.type === 'mousedown' || e.type === 'touchstart') {
        this.mouseTouchX = clientX;
        this.mouseTouchY = clientY;
        this.prevMouseX = clientX;
        this.prevMouseY = clientY;
      }
    };

    // Mouse and Touch End
    const onEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Event Listeners
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });

    paper.addEventListener('mousedown', onStart);
    paper.addEventListener('touchstart', onStart, { passive: false });

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// let highestZ = 1;

// class Paper {
//   holdingPaper = false;
//   mouseTouchX = 0;
//   mouseTouchY = 0;
//   mouseX = 0;
//   mouseY = 0;
//   prevMouseX = 0;
//   prevMouseY = 0;
//   velX = 0;
//   velY = 0;
//   rotation = Math.random() * 30 - 15;
//   currentPaperX = 0;
//   currentPaperY = 0;
//   rotating = false;

//   init(paper) {
//     document.addEventListener('mousemove', (e) => {
//       if(!this.rotating) {
//         this.mouseX = e.clientX;
//         this.mouseY = e.clientY;
        
//         this.velX = this.mouseX - this.prevMouseX;
//         this.velY = this.mouseY - this.prevMouseY;
//       }
        
//       const dirX = e.clientX - this.mouseTouchX;
//       const dirY = e.clientY - this.mouseTouchY;
//       const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
//       const dirNormalizedX = dirX / dirLength;
//       const dirNormalizedY = dirY / dirLength;

//       const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
//       let degrees = 180 * angle / Math.PI;
//       degrees = (360 + Math.round(degrees)) % 360;
//       if(this.rotating) {
//         this.rotation = degrees;
//       }

//       if(this.holdingPaper) {
//         if(!this.rotating) {
//           this.currentPaperX += this.velX;
//           this.currentPaperY += this.velY;
//         }
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;

//         paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
//       }
//     })

//     paper.addEventListener('mousedown', (e) => {
//       if(this.holdingPaper) return; 
//       this.holdingPaper = true;
      
//       paper.style.zIndex = highestZ;
//       highestZ += 1;
      
//       if(e.button === 0) {
//         this.mouseTouchX = this.mouseX;
//         this.mouseTouchY = this.mouseY;
//         this.prevMouseX = this.mouseX;
//         this.prevMouseY = this.mouseY;
//       }
//       if(e.button === 2) {
//         this.rotating = true;
//       }
//     });
//     window.addEventListener('mouseup', () => {
//       this.holdingPaper = false;
//       this.rotating = false;
//     });
//   }
// }

// const papers = Array.from(document.querySelectorAll('.paper'));

// papers.forEach(paper => {
//   const p = new Paper();
//   p.init(paper);
// });
