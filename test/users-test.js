var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = 'KukF8nmhhfW3MyAK';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('users', function() {

    var userName = generateRandomString(10);
    var objectId = '';
    var currentSessionToken = '';

    function generateRandomString(length) {

        length = length ? length : 32;

        var rdmString = "";

        for( ; rdmString.length < length; rdmString  += Math.random().toString(36).substr(2));

        return  rdmString.substr(0, length);
    }

    describe('create', function() {
        it('should create without error', function(done) {

            var User = new Noserv.User(sessionToken, appId, appKey);
            var user = User.extend();

            user.set('_sessionToken', sessionToken);
            user.set('username', userName);
            user.set('password', 'test');
            user.set('hp', '010-1111-2222');

            user.signUp(null, {
                success: function(data) {

                    assert(data.createdAt);
                    assert(data.objectId);
                    assert(data.sessionToken);

                    objectId = data.objectId;
                    currentSessionToken = data.sessionToken;

                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('login', function() {
        it('should login without error', function (done) {

            var User = new Noserv.User(sessionToken, appId, appKey);
            var user = User.extend();

            user.logIn(userName,'test', {
                success: function(data) {

                    assert(data.objectId);
                    assert(data.sessionToken);
                    user.set('objectId', data.objectId);
                    user.set('_sessionToken', data.sessionToken);

                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('save', function() {
        it('should save without error', function (done) {

            var User = new Noserv.User(sessionToken, appId, appKey);
            var user = User.extend();

            user.set('objectId', objectId);
            user.set('tel', '031-444-5555'); //새로 추가한 변수.

            user.save(user, {
                success: function(data) {

                    assert(data.updatedAt);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('currentUser', function() {
        it('should get current user info without error', function (done) {

            var User = new Noserv.User(sessionToken, appId, appKey);
            var user = User.extend();

            user.set('_sessionToken', currentSessionToken);

            user.currentUser({
                success: function(data) {

                    assert(data.objectId);
                    assert(data.username);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('delete', function() {
        it('should delete without error', function (done) {

            var User = new Noserv.User(sessionToken, appId, appKey);
            var user = User.extend();

            user.delete(objectId, {
                success: function(data) {

                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });
});