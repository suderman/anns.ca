var Anns = Class.create({
  initialize: function(){}
})

// DOM onload
document.observe("dom:loaded", function() {
  
  var a = new Anns()
  var c = new Common()
})

// Window onload
Event.observe(window, 'load', function(){})