const SHRINK_POINT = 80;
const shrinkIds = ["#logo", "#navbarSupportedContent"];
window.addEventListener('scroll', function() {
  if (document.body.scrollTop > SHRINK_POINT || document.documentElement.scrollTop > SHRINK_POINT) {
    changeClassState('add', 'shrink');
  } else {
    changeClassState('remove', 'shrink');
  }
});

function changeClassState(action, className) {
  shrinkIds.forEach(selector => {
    document.querySelector(selector).classList[action](className);
  });
}