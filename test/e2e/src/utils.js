var Utils = (function () {
    var config  = require('./test.conf');

    function Utils() {

    }

    Utils.prototype.isVisible = function (locator) {
        var d = protractor.promise.defer();
        if (!locator) d.cancel();

        element(locator).isDisplayed().then(function (displayed) {
            element(locator).getAttribute('style').then(function (style) {
                d.fulfill((displayed && (style !== 'display: none;') && (style !== 'visibility: hidden;')));
            });
        });
        return d.promise;
    };

    Utils.prototype.isHidden = function (locator) {
        return this.isVisible(locator).then(function (visible) {
            return (visible !== true);
        });
    };

    // KnockoutJS does not bind to same events as `sendKeys`
    Utils.prototype.koChange = function (id) {
        // TODO: Better cross-browser support.
        // TODO: Support lookup methods other than `id`.
        var script = "var elem = document.getElementById('"+id+"');" +
            "var event = document.createEvent('HTMLEvents');" +
            "event.initEvent('change', true, true );" +
            "elem.dispatchEvent( event );";
        return browser.executeScript(script);
    };

    Utils.prototype.koSendKeys = function(locator) {
        var _self = this;
        if (!locator || !arguments || !(arguments.length > 1)) throw new Error('Invalid arguments passed to koSendKeys');

        // Allow for unlimited arguments, to be passed to `sendKeys`.
        var args = [];
        for (var i = 1; i < arguments.length; ++i) {
            args[i-1] = arguments[i];
        }

        // TODO: Support scrolling to element. Current selenium issue with FF35
        // https://github.com/angular/protractor/issues/1734#issuecomment-75791481
        //var elem = browser.driver.findElement(locator);
        //browser.executeScript("arguments[0].scrollIntoView(true);", elem);
        var id;
        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(locator).then(function (present) {
                return (present === true);
            });

        }).then(function () {
            return browser.driver.wait(function () {
                return _self.isVisible(locator);
            });
        }).then(function () {
            return element(locator).getAttribute('id');
        }).then(function (val) {
            // `koChange` needs `id` for `getDocumentById`
            if (!val) {
                throw new Error('An ID attribute must be specified for knockout change event.');
            } else {
                id = val;
                return element(locator).clear()
            }
        }).then(function () {
            return element(locator).sendKeys.apply(this, args);
        }).then(function () {
            return _self.koChange(id);
        });
    };

    Utils.prototype.koSendClick = function(locator) {
        var _self = this;
        if (!locator) throw new Error('Invalid locator passed to koSendClick');

        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(locator).then(function (present) {
                return (present === true);
            });

        }).then(function () {

            // TODO: Support scrolling to element. Current selenium issue with FF35
            // https://github.com/angular/protractor/issues/1734#issuecomment-75791481
            //var elem = browser.driver.findElement(locator);
            //browser.executeScript("arguments[0].scrollIntoView(true);", elem);

            return browser.driver.wait(function () {
                return _self.isVisible(locator);

            });
        }).then(function () {
            element(locator).click();
        });
    };

    return Utils;
})();

module.exports = Utils;
