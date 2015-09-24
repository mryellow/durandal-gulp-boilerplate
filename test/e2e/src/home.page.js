/**
 * Page controller
 */
var HomePage = (function () {
    var config  = require('./test.conf');
    var Utils   = require('./utils');
    var u       = new Utils();
    var CommonPage = require('./common.page');

    function HomePage() {

    }

    HomePage.prototype = Object.create(CommonPage.prototype);
    HomePage.prototype.constructor = HomePage;

    HomePage.prototype.init = function(route, title) {
        // CUSTOM: You may wish to ensure the client has passed a login screen etc.
        return this.goRoute(route, title);
    };

    return HomePage;
})();

module.exports = HomePage;
