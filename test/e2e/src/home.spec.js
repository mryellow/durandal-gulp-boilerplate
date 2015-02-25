describe('homepage', function() {
    var route = 'home';
    var title = 'Welcome';

    var config  = require('./test.conf');
    var Utils = require('./utils');
    var u = new Utils();
    var Page = require('./' + route + '.page');
    var page = new Page();
    
    beforeEach(function (done) {
        page.init(route, title).then(function () {
            done();
        });

    });

    describe('title', function() {

        it('should be updated by app', function() {
            browser.driver.getTitle().then(function(title) {
                // Static version was 'Durandal Gulp Boilerplate'.
                expect(title).toContain('Durandal Boilerplate');
            });
        });

    });

    describe('search', function() {

        it('should create modal', function() {
            u.koSendKeys(by.name('search'), 'foobar', protractor.Key.ENTER);

            var locator = by.css('.modalHost');
            browser.wait(function () {
                return browser.driver.isElementPresent(locator).then(function (present) {
                    return (present === true);
                });
            });
            expect(browser.driver.isElementPresent(locator)).toBeTruthy();
            
        });

    });

});
