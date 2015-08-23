'use strict';

import 'processing-js';
import sketch from './lib/sketch';

(function(callback) {
  if (document.readyState != 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
})(function() {
  const canvas = document.getElementById('stage');
  window.processing = new Processing(canvas, sketch);
});
