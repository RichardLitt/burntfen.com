function getOffset( el ) { // return element top, left, width, height
    var _x = 0;
    var _y = 0;
    var _w = el.offsetWidth|0;
    var _h = el.offsetHeight|0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x, width: _w, height: _h };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left + off1.width;
    var y1 = off1.top + off1.height;
    // top right
    var x2 = off2.left;
    var y2 = off2.top;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)))-100;
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; opacity:0.8;filter:alpha(opacity=8);-moz-opacity:0.8;-khtml-opacity:0.8;line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    // alert(htmlLine);
    document.body.innerHTML += htmlLine;
}



    
function atload() {
    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2')
    connect(div1, div2, "#FFF", 3);
    var div1 = document.getElementById('div1');
    var div3 = document.getElementById('div3')
    connect(div1, div3, "#FFF", 3);
    var div1 = document.getElementById('div1');
    var div4 = document.getElementById('div4')
    connect(div1, div4, "#FFF", 3);
    var div1 = document.getElementById('div1');
    var div5 = document.getElementById('div5')
    connect(div1, div5, "#FFF", 3);
    var div1 = document.getElementById('div1');
    var div6 = document.getElementById('div6')
    connect(div1, div6, "#FFF", 3);
    var div1 = document.getElementById('div1');
    var div7 = document.getElementById('div7')
    connect(div1, div7, "#FFF", 3);

}

window.onload = atload;