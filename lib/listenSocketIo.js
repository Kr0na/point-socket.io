'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenSocketIo = listenSocketIo;

var _ClientManager = require('./ClientManager');

function listenSocketIo(url, events) {
  return function (next) {
    return function (reducer) {
      var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var store = next(reducer, initialState),
          client = (0, _ClientManager.getClient)(url);
      Object.keys(events).forEach(function (key) {
        client.on(key, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (typeof events[key] == 'string') {
            var event = _extends({}, args.shift(), {
              type: events[key]
            });
            store.dispatch(event);
          } else if (events[key] instanceof Function) {
            store.dispatch(events[key].apply(events, args));
          } else {
            throw new Error('Wrong event type');
          }
        });
      });

      return store;
    };
  };
}