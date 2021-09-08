const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')

const exportBtn = document.getElementById('export')
const importBtn = document.getElementById('import')
// 创建一个CanvasRenderingContext2D对象作为2D渲染的上下文
const ctx = canvas.getContext('2d')
console.log(ctx)

let size = 10
let isPressed = false
let color = 'black'
let x
let y

let data = []
let record = []
var times = -1

// event.offsetX, event.offsetY 鼠标点击的位置距离div盒子的大小
canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    record = []
    times = times + 1
    x = e.offsetX
    y = e.offsetY

    record.push({ xc: x, yc: y })
    data[times] = record
})
console.log(record)

canvas.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
        record.push({ xc: x, yc: y })
    }
})
console.log(record)
data[times] = record
console.log(data)

//x,y始终为起点,x2,y2为终点

//beginPath()开始一条路径，或重置当前的路径
//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

function updateSizeOnScreen() {
    sizeEl.innerText = size
}

increaseBtn.addEventListener('click', () => {
    size += 5

    if (size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if (size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})

colorEl.addEventListener('change', (e) => color = e.target.value)

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    data = []
})

exportBtn.addEventListener('click', () => {
    saveShareContent(JSON.stringify(data), 'draw.json')
})


//保存文件
function saveShareContent(content, fileName) {
    let downLink = document.createElement('a')
    downLink.download = fileName
    //字符内容转换为blod地址
    let blob = new Blob([content])
    downLink.href = URL.createObjectURL(blob)
    // 链接插入到页面
    document.body.appendChild(downLink)
    downLink.click()
    // 移除下载链接
    document.body.removeChild(downLink)
}

//导入文件

document.getElementById('fileImport').addEventListener('click', () => {
    document.getElementById('files').click()
})
function fileImport() {
    var selectedFile = document.getElementById('files').files[0]

    console.log(selectedFile)
    if (data || data.length !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        document.getElementById('files').value = ''
    }

    var reader = new FileReader();//这是核心,读取操作就是由它完成.
    reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
    reader.onload = function () {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        console.log(this.result);

        var result = JSON.parse(this.result)
        console.log(typeof result)

        for (let j = 0; j < result.length; j++) {
            if (result[j]) {
                for (let i = 0; i < result[j].length; i++) {
                    if (i < result[j].length - 1) {
                        drawCircle(result[j][i + 1].xc, result[j][i + 1].yc)
                        drawLine(result[j][i].xc, result[j][i].yc, result[j][i + 1].xc, result[j][i + 1].yc)
                    }
                }
            }

        }
    }

}