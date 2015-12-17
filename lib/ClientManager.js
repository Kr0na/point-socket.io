'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientManager = undefined;
exports.getClient = getClient;

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientManager = exports.ClientManager = (function () {
  function ClientManager() {
    _classCallCheck(this, ClientManager);

    this.connections = new Map();
  }

  _createClass(ClientManager, [{
    key: 'getClient',
    value: function getClient(url) {
      if (!this.connections.has(url)) {
        this.connections.set(url, (0, _socket2.default)(url));
      }
      return this.connections.get(url);
    }
  }]);

  return ClientManager;
})();

var clientManager = new ClientManager();

function getClient(url) {
  return clientManager.getClient(url);
}