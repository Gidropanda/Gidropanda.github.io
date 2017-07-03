'use strict';

var body = document.body;
var content = document.querySelector('.js-content');
var blocks = document.querySelectorAll('.block');

var updateOffset = function updateOffset() {
  requestAnimationFrame(updateOffset);
  body.style.setProperty('--y', content.scrollTop);
  updateProps();
};

var updateProps = function updateProps() {
  var i = -1;
  for (var _iterator = blocks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var block = _ref;

    i += 1;
    var top = blocks[i].getBoundingClientRect().top;
    if (top < window.innerHeight * 1.3 && top > window.innerHeight * -1.3) {
      body.style.setProperty('--yBlock-' + (i + 1), top);
    } else {
      body.style.setProperty('--yBlock-' + (i + 1), 0);
    }
  }
};

updateProps();
updateOffset();