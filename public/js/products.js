class Expandable {
  constructor(elem) {
    this._selector = (elem instanceof jQuery ? elem : $(elem)).data('expand');
    this._$info = this.selectorElem;
    this._$info_wrapper = this._$info.closest(".product-info-wrapper");
  }
  
  // Toggles info wrapper div
  toggle(fn = () => true) { // toggle the explandable between an open and close state
    if(fn(this)) {
      this._$info_wrapper.stop().slideToggle();
      this._$info_wrapper.attr('data-open', !this.isOpen); // flip wrapper open boolean status in element attr
    }
  }

  // Toggles the item to display
  showItem() {
    $('.show').hide().removeClass('show');
    this._$info.stop().fadeIn();
    this._$info.addClass('show'); // show class marks the expanded info
  }

  get isOpen() {
    return this._$info_wrapper.attr('data-open') === "true";
  }

  get selector() {
    return this._selector;
  }

  get selectorElem() {
    return $(this._selector);
  }
}

$(function() {
  $("[data-open='true']").css({display: 'block'}); // 

  const defExpandable = new Expandable($("[data-expand-default='true']")); // get default expandable to open on load
  defExpandable.toggle(); // open the expandable
  defExpandable.showItem(); // display contents of expandable (ie: display expandable's selector attr)

  let prevSelector = defExpandable.selector;
  let expandable = defExpandable; // expandable references the currently in-use expandable
  $("[data-expand]").click(function() {
    expandable = new Expandable(this);

    // Only toggle expandable when the wrapper is not open or if user clicks on the same expandable
    expandable.toggle(
      ({isOpen, selector}) => !isOpen || prevSelector === selector 
    );

    // If user clicks on a different expandable than the one they're currently viewing, then switch
    if(prevSelector !== expandable.selector) { 
      prevSelector = expandable.selector;
      // Here we just show the item, no need to toggle the expandable 
      // as it will already be open (due to `.toggle()` above)
      expandable.showItem();
    }
  });


  $("[data-expand-close]").click(function() {
    // Close the current expandable
    expandable.toggle();
  });
});