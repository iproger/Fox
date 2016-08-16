// ================================= slider ================================= //

// $(document).ready(function() {
//     $('#pagepiling').pagepiling();
// });

// $(document).ready(function() {
//     $('#pagepiling').pagepiling({
//         menu: null,
//         direction: 'vertical',
//         verticalCentered: true,
//         sectionsColor: [],
//         anchors: [],
//         scrollingSpeed: 700,
//         easing: 'swing',
//         loopBottom: false,
//         loopTop: false,
//         css3: true,
//         navigation: {
//             'textColor': '#000',
//             'bulletsColor': '#000',
//             'position': 'right',
//             'tooltips': ['section1', 'section2', 'section3', 'section4']
//         },
//         normalScrollElements: null,
//         normalScrollElementTouchThreshold: 5,
//         touchSensitivity: 5,
//         keyboardScrolling: true,
//         sectionSelector: '.section',
//         animateAnchor: false,

//         //events
//         onLeave: function(index, nextIndex, direction){},
//         afterLoad: function(anchorLink, index){},
//         afterRender: function(){},
//     });
// });

		$(document).ready(function() {
			/*
			* Plugin intialization
			*/
	    	$('#pagepiling').pagepiling({
	          	direction: 'horizontal',
	    		menu: '#menu',
	    		anchors: ['page1', 'page2', 'page3', 'page4'],
			    sectionsColor: ['white', '#ee005a', '#2C3E50', '#39C'],
			    navigation: {
			    	'position': 'right',
			   		'tooltips': ['Page 1', 'Page 2', 'Page 3', 'Pgae 4']
			   	},
			    afterRender: function(){
			    	$('#pp-nav').addClass('custom');
			    },
			    afterLoad: function(anchorLink, index){
			    	if(index>1){
			    		$('#pp-nav').removeClass('custom');
			    	}else{
			    		$('#pp-nav').addClass('custom');
			    	}
			    }
			});
	    });

// ================================= slider end ================================= //

// ================================= wolf ================================= //
	    /**********************
Looks best in Chrome, b/c
Chrome allows 3d transforms
inside SVGs, despite not being
part of the spec.

FF/Safari Will only show the 2d
rotations.
***********************/

$(window).load(function() {
  var time = 1,
    tl = new TimelineMax({
      repeat: -1,
      yoyo: false
    }),
    gons = $('.gon');
  tl.timeScale(30);
  function randy(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  }
for (var i = 0; i < gons.length; i++) {
    tl.set(gons[i], {
      x: randy((-400*(400/i))-300, (400*(400/i))+300),
      rotationY: randy(-400*(i/100), 400*(i/100)),
      rotationZ: randy(-400*(i/100), 400*(i/100)),
      y: randy((-400*(300/i))-300, (400*(300/i))+300),
      rotation: randy(-400*(i/100), 400*(i/100)),
      rotationX: randy(-400*(i/100), 400*(i/100)),
      opacity: 0
    });
  }
  for (var i = 0; i < gons.length; i++) {
    tl.to(gons[i], time*2 + 100, {
      rotationY: 0,
      rotationZ: 0,
      x: 0,
      opacity: 1,
      ease: Sine.easeInOut
    }, (i/5));
  }
  for (var i = 0; i < gons.length; i++) {
    tl.to(gons[i], time + 100, {
      rotation: 0,
      rotationX: 0,
      y: 0,
      ease: Sine.easeInOut
    }, (i/5));
  }
  for (var i = 0; i < gons.length; i++) {
    tl.to(gons[i], time + 100, {
      y: randy((-400*(i/200))-50, (400*(i/200))+50),
      rotation: randy(-400*(i/100), 400*(i/100)),
      rotationX: randy(-400*(i/100), 400*(i/100)),
      ease: Sine.easeInOut
    }, time + (gons.length/5) + (i/5)*2 + 100);
  }
  for (var i = 0; i < gons.length; i++) {
    tl.to(gons[i], time*2 + 100, {
      x: randy((-400*(i/50))-50, (400*(i/50))+50),
      rotationY: randy(-400*(i/100), 400*(i/100)),
      rotationZ: randy(-400*(i/100), 400*(i/100)),
      opacity: 0,
      ease: Sine.easeInOut
    }, (time * 2) + (gons.length/5) + (i/5)*2 + 100);
  }
});
// ================================= wolf  end ================================= //


// ================================= bg ================================= //
(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();
// ================================= bg end ================================= //