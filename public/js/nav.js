const SHRINK_POINT = 80;
const shrinkSelectors = ["#logo", "#navbarSupportedContent", ".navbar"];
window.addEventListener('scroll', function() {
  if (document.body.scrollTop > SHRINK_POINT || document.documentElement.scrollTop > SHRINK_POINT) {
    changeClassState('add', 'shrink');
  } else {
    changeClassState('remove', 'shrink');
  }
});

function changeClassState(action, className) {
  shrinkSelectors.forEach(selector => {
    document.querySelector(`${selector}`).classList[action](className);
  });
}