// Tests for the Backbone Required Attributes plugin
describe('Backbone Required Attributes', function() {

  describe('#validateAttrs', function() {

    describe('when plugin isn\'t correcty set up', function() {

      it('should log a warning message if "requiredAttrs" is not declared', function() {
        spyOn(console, 'warn');
        var TestView = Backbone.View.extend({
          initialize: function(options) {
            this.validateAttrs(options);
          }
        });
        var testView = new TestView();
        expect(console.warn).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalledWith(
          '"requiredAttrs" must be declared.'
        );
      });

      it('should log a warning message if "requiredAttrs" is empty', function() {
        spyOn(console, 'warn');
        var TestView = Backbone.View.extend({
          requiredAttrs: {},
          initialize: function(options) {
            this.validateAttrs(options);
          }
        });
        var testView = new TestView();
        expect(console.warn).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalledWith(
          '"requiredAttrs" cannot be empty.'
        );
      });

      it('should log a warning message if no values are passed to "#validateAttrs"', function() {
        spyOn(console, 'warn');
        var TestView = Backbone.View.extend({
          requiredAttrs: {
            'title': 'string'
          },
          initialize: function(options) {
            this.validateAttrs();
          }
        });
        var testView = new TestView();
        expect(console.warn).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalledWith(
          'No values were pass to "validateAttrs".'
        );
      });

    });

    describe('when plugin is correcty set up', function() {

      it('should not log any warnings if "requiredAttrs" and "#validateAttrs" are both valid', function() {
        spyOn(console, 'warn');
        var TestView = Backbone.View.extend({
          requiredAttrs: {
            'title': 'string'
          },
          initialize: function(options) {
            this.validateAttrs(options);
          }
        });
        var testView = new TestView({ 'title': 'foo' });
        expect(console.warn).not.toHaveBeenCalled();
      });

      describe('when rule exists', function() {

        describe('when rule is "string"', function() {

          it('logs "error" if value is not a string', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'title': 'string'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'title': {} });
            expect(console.error).toHaveBeenCalled();
          });

          it('doesn\'t log "error" if value is a string', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'title': 'string'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'title': 'foo' });
            expect(console.error).not.toHaveBeenCalled();
          });

        });

        describe('when rule is "boolean"', function() {

          it('logs "error" if value is not a boolean', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'isPanamanian': 'boolean'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'isPanamanian': {} });
            expect(console.error).toHaveBeenCalled();
          });

          it('doesn\'t log "error" if value is a boolean', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'isPanamanian': 'boolean'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'isPanamanian': true });
            expect(console.error).not.toHaveBeenCalled();
          });

        });

        describe('when rule is "array"', function() {

          it('logs "error" if value is not an array', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': 'array'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': {} });
            expect(console.error).toHaveBeenCalled();
          });

          it('doesn\'t log "error" if value is an array', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': 'array'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': [] });
            expect(console.error).not.toHaveBeenCalled();
          });

        });

        describe('when rule is "number"', function() {

          it('logs "error" if value is not a number', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': 'number'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': '5' });
            expect(console.error).toHaveBeenCalled();
          });

          it('doesn\'t log "error" if value is a number', function(){
            spyOn(console, 'error');
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': 'number'
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': 5 });
            expect(console.error).not.toHaveBeenCalled();
          });

        });

        describe('when rule is a function', function() {

          it('logs "error" if value doesn\'t have in its prototype chain the prototype property of the constructor', function(){
            spyOn(console, 'error');
            function A(){};
            function C(){};
            var a = new A(),
                c = new C();
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': C
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': a });
            expect(console.error).toHaveBeenCalled();
          });

          it('doens\'t log "error" if value has in its prototype chain the prototype property of the constructor', function(){
            spyOn(console, 'error');
            function A(){};
            function C(){};
            var a = new A(),
                c = new C();
            var TestView = Backbone.View.extend({
              requiredAttrs: {
                'foo': C
              },
              initialize: function(options) {
                this.validateAttrs(options);
              }
            });
            var testView = new TestView({ 'foo': c });
            expect(console.error).not.toHaveBeenCalled();
          });

        });

      });

      describe('when rule does not exist', function() {

        it('should log an error message', function() {
          spyOn(console, 'error');
          var TestView = Backbone.View.extend({
            requiredAttrs: {
              'title': 'foo'
            },
            initialize: function(options) {
              this.validateAttrs(options);
            }
          });
          var testView = new TestView({ title: 'here is a string' });
          expect(console.error).toHaveBeenCalled();
          expect(console.error).toHaveBeenCalledWith(
            '"foo" rule does not exist.'
          );
        });

      });

    });

  });

});