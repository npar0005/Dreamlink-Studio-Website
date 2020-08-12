class Expandable {
  constructor(elem, i) {
    this._$expandableElem = $(elem);
    this._$expandableElem.data('expandableIndex', i);
    this._isOpen = false;
  }

  showExpandable() {
    if(!this._isOpen) {
      this._$expandableElem.stop().stop().slideDown();
      this._isOpen = true;
    }
  }

  showContent(contentSelector) {
    // If the content which is currently shown is different to the content we want to show, then change it, else don't change it
    if(this._displayedContentSelector !== contentSelector) {
      const $toShowContent = $(contentSelector);
      $('.show', this._$expandableElem).hide().removeClass('show');
      $toShowContent.stop().fadeIn();
      $toShowContent.addClass('show'); // show class marks the expanded info
      this._displayedContentSelector = contentSelector;
    }
  }

  closeExpandable() {
    if(this._isOpen) {
      this._$expandableElem.stop().slideUp();
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
    expandable.showExpandable();
    expandable.showContent(contentSelector);
  }

  closeExpandable(closeBtnElem) {
    const expandable = this._getExpandable(closeBtnElem);
    expandable.closeExpandable();
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
});
