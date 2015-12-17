'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSocketAction = createSocketAction;

var _ClientManager = require('./ClientManager');

function emitActionResult(client, result) {
  if (result.type) {
    client.emit(result.type, result);
  } else if (result.callEvent) {
    emitActionResult(client, result.callEvent);
  } else if (result.then) {
    result.then(function (result) {
      emitActionResult(client, result);
    });
  }
}

function createSocketAction(url, callback) {
  var client = (0, _ClientManager.getClient)(url);
  return function () {
    var result = callback.apply(undefined, arguments);
    emitActionResult(client, result);
    return result;
  };
}