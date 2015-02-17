/*global jasmine, describe, beforeEach, it, expect, require */
define(['viewmodels/shell'], function(model) {

    describe('viewmodels/shell', function() {
        "use strict";

        it('should have a "router" property', function() {
            expect(model.router).toBeDefined();
        });

        describe('activate', function() {

            it('should be a property of type function', function() {
                expect(model.activate).toBeDefined();
            });

            it('should return a promise  ', function() {
                expect(model.activate().then).toBeDefined();
            });

        });

    });

});