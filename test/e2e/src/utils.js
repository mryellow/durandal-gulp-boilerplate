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
        var d = protractor.promise.defer();
        // TODO: Better cross-browser support.
        // TODO: Support lookup methods other than `id`.
        var script = "var elem = document.getElementById('"+id+"');" +
            "var event = document.createEvent('HTMLEvents');" +
            "event.initEvent('change', true, true );" +
            "elem.dispatchEvent( event );";
        browser.executeScript(script).then(function () {
            d.fulfill();
        }, function (err) {
            throw err;
        });
        return d.promise;
    };

    Utils.prototype.koSendKeys = function(locator) {
        var d = protractor.promise.defer();
        var _self = this;
        if (!locator || !arguments || !(arguments.length > 1)) d.cancel(); // Warning on length condition, it is clearer this way.

        // Allow for unlimited arguments, to be passed to `sendKeys`.
        var args = [];
        for (var i = 1; i < arguments.length; ++i) {
            args[i-1] = arguments[i];
        }

        // TODO: Support scrolling to element. Current selenium issue with FF35
        // https://github.com/angular/protractor/issues/1734#issuecomment-75791481
        //var elem = browser.driver.findElement(locator);
        //browser.executeScript("arguments[0].scrollIntoView(true);", elem);

        browser.driver.wait(function () {
            return browser.driver.isElementPresent(locator).then(function (present) {
                return (present === true);
            });

        }).then(function () {
            browser.driver.wait(function () {
                return _self.isVisible(locator);

            }).then(function () {
                element(locator).getAttribute('id').then(function (id) {
                    if (id) {
                        element(locator).clear().then(function () {
                            element(locator).sendKeys.apply(this, args).then(function () {
                                _self.koChange(id).then(function () {
                                    d.fulfill();
                                });
                            }, function (err) {
                                throw err;
                            });
                        });
                    } else {
                        // `koChange` needs `id` for `getDocumentById`
                        console.log('An ID attribute must be specified for knockout change event.');
                        d.cancel();
                    }

                });
            });
        });
        return d.promise;
    };

    Utils.prototype.koSendClick = function(locator) {
        var d = protractor.promise.defer();
        var _self = this;
        if (!locator) d.cancel();

        browser.driver.wait(function () {
            return browser.driver.isElementPresent(locator).then(function (present) {
                return (present === true);
            });

        }).then(function () {

            // TODO: Support scrolling to element. Current selenium issue with FF35
            // https://github.com/angular/protractor/issues/1734#issuecomment-75791481
            //var elem = browser.driver.findElement(locator);
            //browser.executeScript("arguments[0].scrollIntoView(true);", elem);

            browser.driver.wait(function () {
                return _self.isVisible(locator);

            }).then(function () {
                element(locator).click().then(function () {
                    d.fulfill();
                }, function (err) {
                    throw err;
                });
            });
        });
        return d.promise;
    };

    return Utils;
})();

module.exports = Utils;
