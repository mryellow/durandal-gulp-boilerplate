/**
 * Page controller
 */
var CommonPage = (function () {
    var config  = require('./test.conf');
    var Utils   = require('./utils');
    var u       = new Utils();

    function CommonPage() {

    }
    
    CommonPage.prototype.goRoute = function (route, title) {
        var d = protractor.promise.defer();
        var _self = this;

        //_self.waitReady();
        // CUSTOM: Optional, click navigation rather than using a `get`.
        //koSendClick(by.xpath("//*[@id='navbar_main']//a[@role='menuitem' and text()='" + title + "']"));
        browser.driver.get(browser.baseUrl + '#' + route).then(function () {
            browser.driver.wait(function () {
                // TODO: `getCurrentUrl`
                return browser.driver.getTitle().then(function(route_title) {
                    //console.log('Title: ', route_title);
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
                _self.waitReady();
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
                d.fulfill();
            });
        });
        return d.promise;
    };

    CommonPage.prototype.waitReady = function () {
        var d = protractor.promise.defer();
        var _self = this;

        // TODO: Could look for Durandal `page-host` to ensure it's there first.
        //var locator = by.css('.page-host');
        //browser.driver.isElementPresent(locator).then(function(isPresent) {

        browser.driver.wait(function () {
            return browser.driver.isElementPresent(config.spinner).then(function (el) {
                return el === true;
            });
        }, 30000).then(function () {
            browser.driver.wait(function () {
                return element(config.spinner).getAttribute('style'), function (value) {
                    return ((value === 'display: none;') || (value === 'visibility: hidden;'));
                };
            }).then(function () {
                d.fulfill(true);
            });
        });
        return d.promise;
    };

    return CommonPage;
})();

module.exports = CommonPage;
