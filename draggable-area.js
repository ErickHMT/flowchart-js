let dragItem; // = document.querySelector('.selected');
let currentDropzone = document.querySelector('.dropzone');

currentDropzone.addEventListener('mousedown', dragStart, false);
currentDropzone.addEventListener('mouseup', dragEnd, false);
currentDropzone.addEventListener('mousemove', drag, false);

function dragStart(e) {
    console.log('selected selected: ', selectedItems);

    dragItem = selectedItems.find(o => o.id === e.target.id) // find dragItem

    dragItem.initialX = e.clientX - dragItem.xOffset;
    dragItem.initialY = e.clientY - dragItem.yOffset;

    if (e.target === dragItem.item) {
        dragItem.active = true;
    }
}

function dragEnd(e) {
    dragItem.initialX = dragItem.currentX;
    dragItem.initialY = dragItem.currentY;

    dragItem.active = false;
}

function drag(e) {
    if (dragItem && dragItem.active) {
        e.preventDefault();

        dragItem.currentX = e.clientX - dragItem.initialX;
        dragItem.currentY = e.clientY - dragItem.initialY;

        dragItem.xOffset = dragItem.currentX;
        dragItem.yOffset = dragItem.currentY;

        setTranslate(dragItem.currentX, dragItem.currentY, dragItem.item);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
