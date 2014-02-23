var GODFACE = (function(){
    var g = {};

    var twopi = Math.PI*2;

    var ga = 137.508; // golden angle 137.508 degrees
    var gr = 2.39996; // golden angle in radians

    var cw, ch, cx, cy, cs, radius, theta, i, sMult, tx, ty, spacing, delta, pos;

    var prevTime = 0, frame = 0, tick = 0, offset = 0;
    var speedMult = 0.01;

    var c = document.getElementById('c');
    var ctx = c.getContext('2d');

    g.maxGen = 2000;
    g.anim = false;

    var maxD = 50;
    var off = document.createElement('canvas');
    off.width = maxD*maxD;
    off.height = maxD;
    var offCtx = off.getContext('2d');

    g.pause = function(){
        g.anim = false;
    };

    g.play = function(){
        g.anim = true;
        g.resize();
        requestAnimationFrame(g.draw);
    };

    g.resize = function(){
        cw = c.width = window.innerWidth;
        ch = c.height = window.innerHeight;
        cs = cw < ch ? cw : ch;
        cx = cw / 2;
        cy = ch / 2;
        spacing = cs / 110.0;
        sMult = spacing * 0.137508;
    };

    g.polar2cart = function(r, t) {
        tx = r * Math.cos(t);
        ty = r * Math.sin(t);
        return { x: tx, y: ty };
    };

    var drawsize = 0;
    var rdsize = 0;
    var halfds = 0;
    g.draw = function(curTime){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cw, ch);
        ctx.translate(cx, cy);
        for (i = 1; i < g.maxGen; ++i) {
            theta = i * (gr + offset);
            radius =  spacing * Math.sqrt(i);
            pos = g.polar2cart(radius, theta);
            drawsize = Math.sqrt(Math.sqrt(radius))*sMult*2;
            rdsize = Math.round(drawsize);
            if(drawsize < 1) {
                drawsize = 1;
            }
            if(rdsize < 1) {
                rdsize = 1;
            }
            halfds = drawsize / 2.0;
            ctx.drawImage(off,(rdsize-1)*maxD,0,rdsize,rdsize,pos.x-halfds,pos.y-halfds, drawsize, drawsize);
        }
        if(g.anim) {
            delta = curTime - prevTime;
            if(delta > 1000 || delta < -1000) {
                delta = 0;
            }
            prevTime = curTime;
            tick += (delta / 6600.0) * speedMult;
            offset = Math.sin(tick) / ga;
            frame++;
            if(speedMult < 1.0) {
                speedMult = speedMult * 1.01;
            }
            requestAnimationFrame(g.draw);
        }
    };

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    window.onresize = g.resize;

    offCtx.fillStyle = ctx.fillStyle = "#000";
    for (i = 1; i <= maxD; i++) {
        offCtx.beginPath();
        offCtx.arc(((i-1)*maxD)+(i/2), i/2, (i/2), 0, twopi);
        offCtx.fill();
    }
    g.resize();
    requestAnimationFrame(g.draw);

    return g;
})();

window.onload = function(){
    var intro = document.getElementById('intro');
    var go = document.getElementById('go');
    go.addEventListener("click", function(e){
        e.preventDefault();
        intro.style.animationPlayState = 'running';
        intro.style.MozAnimationPlayState = 'running';
        intro.style.webkitAnimationPlayState = 'running';
        window.setTimeout(function(){ intro.parentNode.removeChild(intro); GODFACE.play(); }, 4100);
    }, false);

    var title = document.getElementById("title");
    title.classList.add('fadein');
};

// Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37217138-2']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
