class Expandable {
  constructor(elem, i) {
    this._$expandableElem = $(elem);
    this._$expandableElem.data('expandableIndex', i);
    this._isOpen = false;

    this._expandableSpeed = 500;
    this._showSpeed = 400;
  }

  showExpandable() {
    if(!this._isOpen) {
      this._$expandableElem.stop().slideDown(this._expandableSpeed);
      this._isOpen = true;
    }
  }

  showContent(contentSelector) {
    // If the content which is currently shown is different to the content we want to show, then change it, else don't change it
    if(this._displayedContentSelector !== contentSelector) {
      const $toShowContent = $(contentSelector);
      $('.show', this._$expandableElem).hide().removeClass('show');
      $toShowContent.stop().fadeIn(this._isOpen ? this._showSpeed : 0);
      $toShowContent.addClass('show'); // show class marks the expanded info
      this._displayedContentSelector = contentSelector;
    } 
  }

  closeExpandable() {
    if(this._isOpen) {
      this._$expandableElem.stop().slideUp(this._expandableSpeed);
      this._isOpen = false;
      this._displayedContentSelector = "";
    }
  }
}

// A collection of expandables
class Expandables {
  constructor(expandablesArr) {
    this._expandables = expandablesArr;
  }

  _getExpandable(contentSelector) {
    // search _expandables
    const $expandableElem = $(contentSelector).closest(".expandable");
    const idx = $expandableElem.data("expandableIndex");
    return this._expandables[idx];
  }

  openExpandable(contentSelector) {
    const expandable = this._getExpandable(contentSelector);
    expandable.showContent(contentSelector);
    expandable.showExpandable();
  }

  closeExpandable(closeBtnElem) {
    const expandable = this._getExpandable(closeBtnElem);
    expandable.closeExpandable();
  }

  closeAll() {
    this._expandables.forEach(expandable => {
      expandable.closeExpandable();
    });
  }
}

$(function() {
  // stores all the expandables on the page in a ds
  const expandables = new Expandables($.map($(".expandable"), (elem, i) => 
    new Expandable(elem, i)
  ));
  
  // Each expandable has a set of controllers. These are denoted using `data-expand`.
  $("[data-expand]").click(function() {
    // Get expandable to open and open it.
    const contentToShow = $(this).data('expand');
    expandables.openExpandable(contentToShow);
  });

  // Each expandable also has a close button. These are denoted using `data-expand-close`
  $("[data-expand-close]").click(function() {
    expandables.closeExpandable(this);
  });


  const mobileHandler = handleMobile.bind(window, expandables);
  mobileHandler();
  $(window).resize(mobileHandler);
});

// Handle Mobile Mode
let smallMode = window.matchMedia("(min-width: 768px)").matches;

function handleMobile(expandables) {
  const {matches: small} = this.matchMedia("(max-width: 768px)");
  const {matches: big} = this.matchMedia("(min-width: 768px)");
  if(small && !smallMode) { // When window size <= 768, code here is executed (once)
    // Show all expandables
    $(".expandable").show();
    $("[data-expand]").each(function() {
      const toExpandSelctor = $(this).data('expand');
      $(toExpandSelctor).show();
    });
    // Hide the close button as well as the expandable buttons.
    $("[data-expand-close]").hide();
    $("[data-expand]").hide();
    smallMode = true;
  } else if(big && smallMode) { // When window size > 768,code here is ran (once)
    expandables.closeAll(); // Set all expandable states to closed
    // Hide all expandables
    $(".expandable").hide();
    $("[data-expand]").each(function() {
      const toExpandSelctor = $(this).data('expand');
      $(toExpandSelctor).hide();
    });
    // Hide the close button as well as the expandable buttons.
    $("[data-expand-close]").show();
    $("[data-expand]").show();
    
    smallMode = false;
  }
}

