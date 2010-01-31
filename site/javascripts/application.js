var Anns = Class.create({
  initialize: function(){}
})

// DOM onload
document.observe("dom:loaded", function() {
  
  var a = new Anns()
  var c = new Common()
  // new Carousel('#footer .carousel', { transition: 'fade' })
  
  
  new Carousel({ 
    container           : '#footer .carousel', 
    delay               : 4,
    duration            : 2,
    transition          : 'crossfade',           // crossfade, fade, cut, push
    slides_easing       : 'easeInOutCubic',     // bounce, bouncePast, easeFrom, easeFromTo, easeInBack, easeInCirc, easeInCubic, easeInExpo, easeInOutBack, easeInOutCirc, easeInOutCubic, easeInOutExpo, easeInOutQuad, easeInOutQuart, easeInOutQuint, easeInOutSine, easeInQuad, easeInQuart, easeInQuint, easeInSine, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutExpo, easeOutQuad, easeOutQuart, easeOutQuint, easeOutSine, easeTo, elastic, linear, sinusoidal, spring, swingFrom, swingFromTo, swingTo
  })  
  
})

// Window onload
Event.observe(window, 'load', function(){})