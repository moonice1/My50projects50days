const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('empty')

fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart() {
    this.className += ' hold'
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd() {
    this.className = 'fill'
}

//如果事件是可取消的，则 preventDefault() 方法会取消该事件，这意味着属于该事件的默认操作将不会发生
function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.className += 'hovered'
}

function dragLeave() {
    this.className = 'empty'

}

function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}
