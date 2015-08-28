// BOX METHODS

var size = 0
var boxsize = 10

var xAngle = 0, yAngle = 0;
var boxes = []
document.addEventListener('keydown', function(e) {
    switch(e.which) {

        case 65: // left
            yAngle -= 90;
            break;

        case 87: // up
            xAngle += 90;
            break;

        case 68: // right
            yAngle += 90;
            break;

        case 83: // down
            xAngle -= 90;
            break;
    };

    var tmp = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)"
    document.getElementById('cube').style.webkitTransform = tmp
    document.getElementById('cube').style.MozTransform = tmp
}, false);

// create a box centered at (x,y,z) with dimensions (w vmin)*(l vmin)*(h vmin)
function createBox(x,y,z,w,l,h) {
    var dims = ["Z","Y","X"]
    var params = [w,l,h]
    var box = []
    for (var i = 0 ; i < 6 ; i++) {
        box[i] = document.createElement('div')
        box[i].className = "face"
        box[i].addEventListener("click", onBoxClick, false)
        // box[i].style.WebkitTransition = "background-color 1s;"
        box[i].style.MozTransition = "background-color .2s"
    }
    for ( var i = 0 ; i < 3; i++ ) {
        box[i*2].style.height = params[i] + "vmin"
        box[i*2].style.width = params[(i+1)%3] + "vmin"
        var tmp = "translateX(" + (size/2-params[(i+1)%3]/2+x) + "vmin) translateY(" + (size/2-params[i]/2+y) + "vmin) translateZ(" + z + "vmin) rotate" + dims[i] + "(90deg) translateZ("+ (params[(i+2)%3]/2) +"vmin)"
        box[i*2].style.webkitTransform = tmp
        box[i*2].style.MozTransform = tmp

        box[i*2+1].style.height = params[i] + "vmin"
        box[i*2+1].style.width = params[(i+1)%3] + "vmin"
        tmp = "translateX(" + (size/2-params[(i+1)%3]/2+x) + "vmin) translateY(" + (size/2-params[i]/2+y) + "vmin) translateZ(" + z + "vmin) rotate" + dims[i] + "(90deg) translateZ("+ (params[(i+2)%3]/-2) +"vmin)"
        box[i*2+1].style.webkitTransform = tmp
        box[i*2+1].style.MozTransform = tmp
    }
    for ( var i = 0 ; i < 6 ; i++) {document.getElementById('cube').appendChild(box[i])}
    return box
}

function randomBox() {
    var x = Math.floor(Math.random()*(size - boxsize)) - size / 2 + boxsize / 2
    var y = Math.floor(Math.random()*(size - boxsize)) - size / 2 + boxsize / 2
    var z = Math.floor(Math.random()*(size - boxsize)) - size / 2 + boxsize / 2
    var w = Math.floor(Math.random()*boxsize / 2) + boxsize / 2
    var l = Math.floor(Math.random()*boxsize / 2) + boxsize / 2
    var h = Math.floor(Math.random()*boxsize / 2) + boxsize / 2
    return createBox(x,y,z,w,l,h)
}

function onBoxClick(e) {
    e.target.style.backgroundColor = "orange"
    // console.log(e.target.parentNode.children);
    var ci = Array.prototype.indexOf.call(e.target.parentNode.children, e.target)
    var ofi = ci + 1 + ci % 2 * -2
    e.target.parentNode.children[ofi].style.backgroundColor = "orange"

    // var x = Math.floor(Math.random()*4)*90
    // var y = Math.floor(Math.random()*4)*90
    // document.getElementById('cube').style.webkitTransform = "rotateX("+x+"deg) rotateY("+y+"deg)";
}

// QUEUE METHODS

var timeToNext = 6000
var count = 0
var queue = []

function randColor() {
    return [
        Math.floor(Math.random()*2)*255,
        Math.floor(Math.random()*2)*255,
        Math.floor(Math.random()*2)*255
    ]
}

function timer() {

}


// RUN

window.onload = function() {

    var abssize = parseInt(window.getComputedStyle(document.querySelector("#cube")).getPropertyValue("width").slice(0,-2))
    var fulsize = Math.min(window.innerWidth,window.innerHeight)
    size = abssize / fulsize * 100
    for (var i = 0 ; i < 15 ; i++ ) {
        boxes.push(randomBox())
    }
}

// document.onmousemove = function (event) {
//     // Use event.pageX / event.pageY here
//     var x = Math.atan(event.pageX/window.innerWidth-.5)/Math.PI*180
//     var y = Math.atan(event.pageY/window.innerHeight-.5)/Math.PI*180
//     document.getElementById('cube').style.webkitTransform = "rotateX("+-y+"deg) rotateY("+x+"deg)";
//     // console.log(event.pageX/window.innerWidth, event.pageY/window.innerHeight)
// }
