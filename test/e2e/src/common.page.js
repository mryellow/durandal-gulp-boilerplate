/**
 * Common controller
 */
var CommonPage = (function () {
    var config  = require('./test.conf');
    var Utils   = require('./utils');
    var u       = new Utils();

    function CommonPage() {

    }

    CommonPage.prototype.goRoute = function (route, title) {
        var _self = this;

/*
// TODO: Implement better navigation status tracker.
https://github.com/angular/protractor/issues/610
var waitForCurrentUrl = function(timeout) {
    if (timeout == null) {
        timeout = browser.manage().timeouts().pageLoadTimeout;
    };

    return browser.driver.wait(function() {
        // Return a condition. Code will continue to run until is true
        return browser.driver.getCurrentUrl().then(function(url) {
            return url;
        }, function(err) {
            // errored  .. TODO: retry
            throw err;
        });
    }, timeout, 'Expectation error: Timed out waiting for current url');
};
*/


        // CUSTOM: Optional, click navigation rather than using a `get`.
        //koSendClick(by.xpath("//*[@id='navbar_main']//a[@role='menuitem' and text()='" + title + "']"));
        return browser.driver.get(browser.baseUrl + '#' + route).then(function () {
            return browser.driver.wait(function () {
                // TODO: `getCurrentUrl`
                return browser.driver.getTitle().then(function(route_title) {
                    //console.log('Title: ', route_title, (route_title.indexOf(title) >= 0));
                    // CUSTOM: Check for logout alert
                    /*
                    browser.driver.isElementPresent(by.xpath("//*[@class='alert-float']//*[@role='alert']//span[text()='Successfully logged out']")).then(function (el) {
                        if (el) {
                            console.log('Logout');
                        }
                    });
                    */
                    return (route_title && route_title.indexOf(title) >= 0); // FIXME: test `=== 0` instead? Only if title is at the start, no partial matches.
                });
            }, 30000).then(function () {
                return _self.waitReady();
                // CUSTOM: Clear alerts
                /*
                browser.driver.findElements(by.xpath("//*[@class='alert-float']//*[@role='alert']//button[@class='close']")).then(function (alerts) {
                    for (var x = 0; x < alerts.length; x++) {
                        try {
                            alerts[x].click();
                        } catch (e) {
                            console.log('alert', e);
                        }
                    }
                });
                */
            });
        });
    };

    CommonPage.prototype.waitReady = function () {
        var _self = this;

        // TODO: Could look for Durandal `page-host` to ensure it's there first.
        //var locator = by.css('.page-host');
        //browser.driver.isElementPresent(locator).then(function(isPresent) {

        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(config.spinner).then(function (el) {
                return el === true;
            });
        }, 10000).then(function () {
            return browser.driver.wait(function () {
                // FIXME: Use `u.isVisible` instead?
                return element(config.spinner).getAttribute('style').then(function (value) {
                    return ((value === 'display: none;') || (value === 'visibility: hidden;'));
                });
            }, 10000);
        });
    };

    return CommonPage;
})();

module.exports = CommonPage;
