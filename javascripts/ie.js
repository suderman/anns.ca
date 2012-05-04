// DOM onload
document.observe("dom:loaded", function() {
  $$('img.headshot').invoke('writeAttribute','src', '/images/blank.png')
})

// Window onload
Event.observe(window, 'load', function(){})