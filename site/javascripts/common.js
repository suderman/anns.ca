/* common.js
 * November 23, 2009 Jon Suderman
 *
 * Example use:
 *   var c = new Common()
 *   c.input_default_value('#search')
 *   c.first_and_last('.navigation li', '.page_callout')
 *   c.hover_behavior('#main_navigation li')
 *   c.randomize()
 *--------------------------------------------------------------------------*/
var Common = Class.create({		

  // Hover Behaviour for Nav etc.
  // Pass selector string(s) pointing to collection(s) of elements
  hover_behavior: function() {
    $A(document.styleSheets).each( function(stylesheet) {
      $A(stylesheet.rules).each( function(rule) {
        if( rule.selectorText.match(/:hover/i) ) {
          stylesheet.addRule( rule.selectorText.replace(/:hover/ig, '.hover'), rule.style.cssText );
        }
      });
    });
    $A(arguments).each( function(arg) {
      $$(arg).each( function(tag) {
        tag.observe('mouseenter', function() { tag.addClassName('hover'); }, true);
        tag.observe('mouseleave', function() { tag.removeClassName('hover'); }, true);
      });
    });
  },
  
  
  // Adds first and last classes to elements, to be used with first-child and last-child
  // Pass selector string(s) pointing collection(s) of elements
  first_and_last: function(){
    
    // Loop all generic selectors
    $A(arguments).each( function(generic_selector) {   
      
      // Get every element from this generic selector
      $$(generic_selector).each(function(element){

        // Find this parent of this one element
        var parent = element.up()
        // Elements with tagged parents have already been dealt with -- move on

        if (parent.first_and_last==true) { return }

        // Determine this element's specific selector under its parent
        var specific_selector = generic_selector.split(' ').last()
        
        // Get all the children directly beneath this parent that match the specific selector
        var children = parent.select(specific_selector)
        
        // Classify the first element
        var child = children.first()
        var class_name = child.className.split(' ').first()
        if (class_name != 'first') {
          var new_class_name = (class_name) ? class_name + '_first' : 'first'
          child.addClassName(new_class_name)
        }
        
        // Classify the last element
        var child = children.last()
        var class_name = child.className.split(' ').first()
        if (class_name != 'last') {
          var new_class_name = (class_name) ? class_name + '_last' : 'last'
          child.addClassName(new_class_name)
        }
        
        // Tag the parent element (so as not to repeat history)
        parent.first_and_last = true
      })
   })
  },
  
  
  // Often used in a search box to remove text on focus and replace on blur
  // Pass selector string(s) pointing to field input(s_
  input_default_value: function(){
        
    // Loop all selectors
    $A(arguments).each(function(selector){
      
      // Get every element from this generic selector
      $$(selector).each(function(field){
        var default_value = $F(field)

        // Clear field on click
        field.observe('click', function(){
          if ($F(field)==default_value) { 
            field.clear(); 
          }
          field.activate();
        }) 
        
        // Restore field's default text when empty
        field.observe('blur', function(){
          if (!field.present()) { 
            field.setValue(default_value); 
          }
        })
      })
    })
  },
  
  
  // Force all links starting with 'http' (external links) to open in a new window
  external_links: function(){
    var filter = new RegExp($A(arguments).join('|'))    
    $$('a[href^=http]').each(function(a){

      if (a.href.match(filter)) {
        // Force link to be internal
      } else {
        // Force link to be external
        a.observe('click', function(e){
          var new_window = window.open(a.href,'_blank')
          new_window.focus()
          e.stop()
        })
      }
    })
  },  
  
  
  // All elements with classname 'randomize' will have their child elements randomized
  randomize: function(){
    
    // Extend Array to support shuffle - eg: [1,2,3].shuffle()
    if (!Array.prototype.shuffle) {
      Array.prototype.shuffle = function(){ 
        for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp); 
      };
    }
    
    // Default class_name to '.randomize'    
    var class_name = ($A(arguments).length < 1) ? 'randomize' : $A(arguments).first()

    // Look for each selector
    $$('.' + class_name).each(function(container){
      var elements = []

      // Remove elements
      container.childElements().each(function(element){ 
        elements.push(element.remove())
      })

      // Randomize elements
      elements.shuffle()

      // Put elements back
      elements.each(function(element){
        container.insert(element)
      })

      // Remove the randomize classname
      container.removeClassName(class_name)
    })    
  },


  initialize: function(){    

    // Let the CSS know JS is enabled
    $$('body').invoke('addClassName','js')
    
    // Mark if we're in surf-to-edit
    if (location.href.match(/nterchange/g)) { 
      $$('body').first().addClassName('nterchange') 
      $$('body').first().insert('<div id="nterchange"></div>')
    }    
    
    if (Prototype.Browser.IE) {
      try { console.log('init console... done'); } catch(e) { console = { log: function() {} } }
      try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
    }
  }
})