/*global jasmine, describe, beforeEach, it, expect, require */
define(['viewmodels/shell'], function(shell) {

    describe('viewmodels/shell', function() {
        "use strict";
        ////var shell = require('viewmodels/shell');

        it('should have a "router" property', function() {
            expect(shell.router).toBeDefined();
        });

        describe('activate', function() {

            it('should be a property of type function', function() {
                expect(shell.activate).toBeDefined();
            });

            it('should return a promise  ', function() {
                expect(shell.activate().then).toBeDefined();
            });

        });

    });

});