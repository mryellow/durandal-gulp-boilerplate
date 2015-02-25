/**
 * Page controller
 */
var HomePage = (function () {
    var config  = require('./test.conf');
    var Utils   = require('./utils');
    var u       = new Utils();
    var CommonPage = require('./common.page');
    var common = new CommonPage();

    function HomePage() {
        
    }

    HomePage.prototype.init = function(route, title) {
        var d = protractor.promise.defer();
        // CUSTOM: You may wish to ensure the client has passed a login screen etc.
        common.goRoute(route, title).then(function () {
            d.fulfill();
        });
        return d.promise;
    };

    return HomePage;
})();

module.exports = HomePage;
