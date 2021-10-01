export default class DraggableItems {
    
    constructor() {
        this.selectedItems = [];
        this.dragItem;

        this.updateSelectedItems = () => { };
        this.cards = document.querySelectorAll('.card');
        this.dropzone = document.querySelector('.dropzone');

        this.cards.forEach(card => {
            if(!card.className.includes('selected')) {
                card.addEventListener('dragstart', this.dragStart);
                card.addEventListener('drag', this.drag)
                card.addEventListener('dragend', this.dragEnd);
            }
        });

        this.dropzone.addEventListener('dragenter', this.dragEnter);
        this.dropzone.addEventListener('dragover', this.dragOver);
        this.dropzone.addEventListener('dragleave', this.dragLeave);
        this.dropzone.addEventListener('drop', this.dragDrop);

        this.dropzone.addEventListener('mousedown', this.dropzoneDragStart, false);
        this.dropzone.addEventListener('mouseup', this.dropzoneDragEnd, false);
        this.dropzone.addEventListener('mousemove', this.dropzoneDrag, false);
    }

    initialize(updateSelectedItems) {
        this.updateSelectedItems = updateSelectedItems;
    }

    dragStart(e) {
        if (e.target != this)
            return;
        this.classList.add('is-dragging');
    }

    drag(e) {
        e.preventDefault();
    }

    dragEnd() {
        this.classList.remove('is-dragging');
    }

    // DROPZONE =================

    dragEnter(e) {
        e.preventDefault();
    }

    dragOver(e) {
        e.preventDefault();
        this.classList.add('hovered');
    }

    dragLeave() {
        this.classList.remove('hovered');
    }

    dragDrop() {
        this.classList.remove('hovered');
        let cardBeingDragged = document.querySelector('.is-dragging');

        cardBeingDragged.classList.toggle('selected');
        this.append(cardBeingDragged);

        this.selectedItems = [];
        this.selectedItems.push({
            id: cardBeingDragged.id,
            item: cardBeingDragged,
            active: false,
            xOffset: 0,
            yOffset: 0,
            currentX: null, 
            currentY: null,
            initialX: null, 
            initialY: null,
        })

        this.updateSelectedItems(this.selectedItems);

        cardBeingDragged.removeEventListener('dragstart', this.dragStart);
        cardBeingDragged.removeEventListener('drag', this.drag)
        cardBeingDragged.removeEventListener('dragend', this.dragEnd);
    }

    // MOUSE EVENTS

    dropzoneDragStart(e) {
        console.log('selected selected: ', this.selectedItems);

        this.dragItem = this.selectedItems.find(o => o.id === e.target.id) // find dragItem

        this.dragItem.initialX = e.clientX - this.dragItem.xOffset;
        this.dragItem.initialY = e.clientY - this.dragItem.yOffset;

        if (e.target === this.dragItem.item) {
            this.dragItem.active = true;
        }
    }

    dropzoneDragEnd(e) {
        this.dragItem.initialX = this.dragItem.currentX;
        this.dragItem.initialY = this.dragItem.currentY;

        this.dragItem.active = false;
    }

    dropzoneDrag(e) {
        if (this.dragItem && this.dragItem.active) {
            e.preventDefault();

            this.dragItem.currentX = e.clientX - this.dragItem.initialX;
            this.dragItem.currentY = e.clientY - this.dragItem.initialY;

            this.dragItem.xOffset = this.dragItem.currentX;
            this.dragItem.yOffset = this.dragItem.currentY;

            // this.setTranslate(this.dragItem.currentX, this.dragItem.currentY, this.dragItem.item);
            this.dragItem.item.style.transform = `translate3d(${this.dragItem.currentX}px, ${this.dragItem.currentY}px, 0)`;
        }
    }

    // setTranslate(xPos, yPos, el) {
    //     el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    // }
}
