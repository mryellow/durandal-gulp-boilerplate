describe('homepage title', function() {

    it('should be updated by app', function() {
        browser.get('http://localhost:9001/');

        var element = by.css('page-host');
        browser.driver.isElementPresent(element).then(function(isPresent) {
            browser.driver.getTitle().then(function(title) {
                expect(title).toContain('Durandal Boilerplate');
            });
        });
        
    });
});
