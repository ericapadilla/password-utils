var should = require('chai').should();
var pass = require('../index');

describe('index.js', function() {
  describe('#isCommon()', function() {
    context('when password is not a string', function() {
      context('when password is undefined', function() {
        it('should return false', function() {
          pass.isCommon().should.be.false;
          pass.isCommon(undefined).should.be.false;
        });
      });

      context('when password is null', function() {
        it('should return false', function() {
          pass.isCommon(null).should.be.false;
        });
      });

      context('when password is boolean', function() {
        it('should return false', function() {
          pass.isCommon(true).should.be.false;
          pass.isCommon(false).should.be.false;
        });
      });

      context('when password is a number', function() {
        it('should return false', function() {
          pass.isCommon(-1).should.be.false;
          pass.isCommon(0).should.be.false;
          pass.isCommon(1).should.be.false;
        });
      });

      context('when password is an object', function() {
        it('should return false', function() {
          pass.isCommon({}).should.be.false;
          pass.isCommon({ foo: 'bar' }).should.be.false;
        });
      });

      context('when password is an array', function() {
        it('should return false', function() {
          pass.isCommon([]).should.be.false;
        });
      });
    });

    context('when password is a string', function() {
      context('when opts are not passed (should use default opts)', function() {
        context('when password belongs to the list of most commonly-used passwords', function() {
          it('should return true', function() {
            pass.isCommon('password').should.be.true;
            pass.isCommon('cowboy').should.be.true;
          });
        });

        context('when password does not belong to the list of most commonly-used passwords', function() {
          it('should return false', function() {
            pass.isCommon('hallowz').should.be.false;
          });
        });
      });

      context('when invalid opts are passed (should use default opts)', function() {
        context('when invalid restriction is passed', function() {
          context('when password belongs to the list of most commonly-used passwords', function() {
            it('should still return true', function() {
              pass.isCommon('password', { restriction: 'hello' }).should.be.true;
              pass.isCommon('cowboy', { restriction: -1 }).should.be.true;
              pass.isCommon('cowboy', { restriction: 1000 }).should.be.true;
            });
          });

          context('when password does not belong to the list of most commonly-used passwords', function() {
            it('should still return false', function() {
              pass.isCommon('hallowz', { restriction: 0 }).should.be.false;
            });
          });
        });
      });

      context('when valid opts are passed (should use overriden opts)', function() {
        context('when valid restriction is passed', function() {
          context('when password belongs to the list of most commonly-used passwords according to restriction value', function() {
            it('should return true', function() {
              pass.isCommon('password', { restriction: 1 }).should.be.true;
              pass.isCommon('football', { restriction: 10 }).should.be.true;
              pass.isCommon('cowboy', { restriction: 100 }).should.be.true;
              pass.isCommon('pass', { restriction: 100 }).should.be.true;
            });
          });

          context('when password belongs to the list of most commonly-used passwords but is not allowed due to restriction opts', function() {
            it('should return false', function() {
              pass.isCommon('cowboy', { restriction: 25 }).should.be.false;
              pass.isCommon('pass', { restriction: 20 }).should.be.false;
              pass.isCommon('12345', { restriction: 5 }).should.be.false;
            });
          });
        });

        context('when exact is set to false', function() {
          context('when password is a substring of a commonly-used password', function() {
            it('should return true', function() {
              pass.isCommon('zzzzPasswordzzzz', { exact: false }).should.be.true;
              pass.isCommon('4234234PASSWORD', { exact: false }).should.be.true;
              pass.isCommon('passwordsdfsd312314', { exact: false }).should.be.true;
              pass.isCommon('423423pass', { exact: false }).should.be.true;
            });
          });
        });
      });
    });
  });
});
