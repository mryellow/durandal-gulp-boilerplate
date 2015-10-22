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

        var currentUrl;
        var escaped = route.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        var reg = new RegExp('('+escaped+')+');

        return browser.getCurrentUrl().then(function (url) {
            currentUrl = url;
        }).then(function () {
            //console.log('url', currentUrl, (currentUrl && reg.test(currentUrl)));
            if (currentUrl && reg.test(currentUrl)) {
                //console.log('already', currentUrl, route, reg);
                return _self.waitReady();
            } else {
                //console.log('goto', route);
                return browser.driver.get(browser.baseUrl + '#' + route).then(function () {
                    //console.log('wait', route);
                    return u.waitForUrlToChangeTo(reg).then(function () {
                        //console.log('loading', route);
                        return _self.waitReady();
                    });
                });
            }
        });


    };

    CommonPage.prototype.waitReady = function (started) {
        var _self = this;

        // TODO: Could look for Durandal `page-host` to ensure it's there first.
        //var locator = by.css('.page-host');
        //browser.driver.isElementPresent(locator).then(function(isPresent) {
        var path = config.spinner;
        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(path).then(function (el) {
                return el === true;
            });
        }, config.timeout).then(function () {
            return browser.driver.wait(function () {
                // FIXME: Use `u.isVisible` instead?
                return element(path).getAttribute('style').then(function (value) {
                    // Wait for started or finished.
                    return (((value === 'display: none;') || (value === 'visibility: hidden;')) ^ started);
                });
            }, config.timeout);
        });
    };

    CommonPage.prototype.waitCloud = function (started) {
        var _self = this;

        // TODO: App specific implementation, left as a hook.
        return true;

        /*
        var path = by.xpath('//div[@data-bind="visible: $root.status.syncing"]');
        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(path).then(function (el) {
                return el === true;
            });
        }, config.timeout).then(function () {
            return browser.driver.wait(function () {
                // FIXME: Use `u.isVisible` instead?
                return element(path).getAttribute('style').then(function (value) {
                    // Wait for started or finished.
                    return (((value === 'display: none;') || (value === 'visibility: hidden;')) ^ started);
                });
            }, config.timeout);
        });
        */
    };

    // FIXME: Save `route` and `title` as properties of page?
    CommonPage.prototype.login = function(user, pass, skipcloud, route, title) {
        //if (!user || !pass) throw new Error('Username and password must be configured in ENV.');
        var _self = this;

        // TODO: App specific implementation, left as a hook.
        return true;

        /*
        return _self.goRoute('settings', 'Settings | DI').then(function () {
            // Wait for login button
            return browser.driver.isElementPresent(by.xpath('//button[text()="Login"]')).then(function (el) {
                // Detect current login state.
                // Bailout if already logged in (no login button found).
                if (!el) return _self.waitReady();

                // Continue with login.
                return u.koSendKeys(by.id('user_settings_user'), user).then(function () {
                    return u.koSendKeys(by.id('user_settings_pass'), pass, protractor.Key.ENTER);
                // FIXME: Check for validation errors.
                }).then(function () {
                    //console.log('wait doing');
                    return _self.waitReady(true);
                });

            }).then(function () {
                //console.log('wait loading');
                //by.linkText('Login')
                return _self.waitReady();
            }).then(function () {
                //console.log('wait syncing');
                if (skipcloud) {
                    if (!route || !title) return true;
                    return _self.goRoute(route, title);
                }
                return _self.waitCloud();
            });

        }).then(function () {
            //console.log('do stuff');
            if (!route || !title) return true;
            return _self.goRoute(route, title);
        });
        */
    };

    CommonPage.prototype.logout = function() {
        var _self = this;

        // Detect current login state.
        // FIXME: Better indicator than searching for login/logout button?
        return browser.driver.isElementPresent(by.xpath('//button[text()="Logout"]')).then(function (el) {
            // Bailout if already logged out (no logout button found).
            if (!el) return _self.waitReady();

            // Note: Use 2nd button as 1st is under BrowserSync notice.
            return element(by.xpath('//button[text()="Logout"]')).click().then(function () {
                // FIXME: Check for validation errors.
                // Waiting for spinner, didn't happen.
                // FIXME: logout has no spinner?
                //return _self.waitReady(true);
                //}).then(function () {
                return _self.waitReady();
            });
        });
        // FIXME: Wait for login button?
    };

    return CommonPage;
})();

module.exports = CommonPage;
