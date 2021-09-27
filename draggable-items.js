let cards = document.querySelectorAll('.card');
let dropzone = document.querySelector('.dropzone');

let selectedItems = [];

cards.forEach(card => {
    if(!card.className.includes('selected')) {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('drag', drag)
        card.addEventListener('dragend', dragEnd);
    }
});

function dragStart(e) {
    if (e.target != this)
        return;
    this.classList.add('is-dragging');
}

function drag(e) {
    e.preventDefault();
}

function dragEnd() {
    this.classList.remove('is-dragging');
}

dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', dragDrop);

function dragEnter(e) {
    e.preventDefault();
}

function dragOver(e) {
    e.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    this.classList.remove('hovered');
    let cardBeingDragged = document.querySelector('.is-dragging');

    cardBeingDragged.classList.toggle('selected');
    this.append(cardBeingDragged);

    selectedItems.push({
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

    console.log('selectedItems: ', selectedItems);

    cardBeingDragged.removeEventListener('dragstart', dragStart);
    cardBeingDragged.removeEventListener('drag', drag)
    cardBeingDragged.removeEventListener('dragend', dragEnd);
}
