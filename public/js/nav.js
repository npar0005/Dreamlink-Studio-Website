const SHRINK_POINT = 80;
const shrinkSelectors = ["#logo", "#navbarSupportedContent", ".navbar"];

$(function() {
  if(noshrink) { // if the nav should not shirnk on scroll
    changeClassState('add', 'shrink', 'no-transition'); // default the nav to shrunken nav on page load
    // Make navbar sticky top:
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header-nav');
    header.classList.add('sticky-top');
    navbar.classList.remove('fixed-top');
  }
})

if(!noshrink) { // only if we want the nav to shirnk when scrolling use this
  window.addEventListener('scroll', function() {
    if (document.body.scrollTop > SHRINK_POINT || document.documentElement.scrollTop > SHRINK_POINT) {
      changeClassState('add', 'shrink');
    } else {
      changeClassState('remove', 'shrink');
    }
  });
}

function changeClassState(action, ...classes) {
  shrinkSelectors.forEach(selector => {
    document.querySelector(`${selector}`).classList[action](...classes);
  });
}