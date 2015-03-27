var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = '';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('classes', function() {

    var objectId = '';

    describe('create', function () {
        it('should create without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            score.set('name', '축구');
            score.set('선수', '선수1');

            score.save(score, {
                success: function (data) {
                    assert(data.createdAt);
                    assert(data.objectId);

                    objectId = data.objectId;

                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });
    });

    describe('update', function () {
        it('should update without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            score.set('objectId', objectId);

            score.set('name', '축구2');
            score.set('test', 'test');

            score.save(score, {
                success: function (data) {
                    assert(data.updatedAt);
                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });
    });

    describe('delete', function () {
        it('should delete without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            score.set('objectId', objectId);

            score.delete(score, {
                success: function (data) {

                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });
    });

});