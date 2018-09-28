Module = (function () {
  var queue = [];

  onmessage = function (e) {
    if (e.data == 'quit') close();
    else if (queue !== null) queue.push(e.data);
    else Module.ccall('scan_command', 'number', ['string'], [e.data]);
  };

  return {
    print: function(stdout) {
      postMessage(stdout);
    },
    postRun: function() {
      for (var i = 0; i < queue.length; i++) {
        Module.ccall('scan_command', 'number', ['string'], [queue[i]]);
      }
      queue = null;
    }
  };
})();