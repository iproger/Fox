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