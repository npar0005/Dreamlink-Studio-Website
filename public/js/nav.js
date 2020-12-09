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

  setTimeout(() => {
    changeClassState('remove', 'no-transition');
  }, 900);
  handleResize(); // update nav shrink upon page load.

  if($(":target").length) {
    const headerSize = 150;
    $("html, body").animate({scrollTop: $(window.location.hash).offset().top - headerSize}, 0);
  }
});



function changeClassState(action, ...classes) {
  shrinkSelectors.forEach(selector => {
    document.querySelector(`${selector}`).classList[action](...classes);
  });
}

function handleScroll() {
  if (document.body.scrollTop > SHRINK_POINT || document.documentElement.scrollTop > SHRINK_POINT) {
    changeClassState('add', 'shrink');
  } else {
    changeClassState('remove', 'shrink');
  }
}

function handleResize() {
  if(window.matchMedia('(max-width: 768px)').matches) {
    window.removeEventListener('scroll', handleScroll);
    changeClassState('add', 'shrink');
  } else {
    if(!noshrink) {
      handleScroll(); // keeps or removes the shrink from nav (only if  shrink is allowed)
      window.addEventListener('scroll', handleScroll);
    }
  }
}
if(!noshrink) { // only if we want the nav to shirnk when scrolling use this
  window.addEventListener('scroll', handleScroll);
}

window.addEventListener('resize', handleResize);
