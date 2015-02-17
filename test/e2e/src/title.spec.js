describe('homepage title', function() {

    it('should include FSP', function() {
        browser.get('http://localhost:9000/');
        
        browser.driver.getTitle().then(function(title) {
            expect(title).toContain('Durandal Boilerplate');
        });

    });
});
