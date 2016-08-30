var should = require('chai').should();
var pass = require('../index');

describe('index.js', function() {

  describe('#isCommon()', function() {
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
  });
});
