var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = '';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('query', function() {

    var objectId = '';

    before(function(done) {

        var Score = new Noserv.Object("Score", sessionToken);
        var score = Score.extend();

        score.set('name', '야구');
        score.set('선수', '선수1');
        score.set('how', 70);

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

    describe('get', function() {
        it('should get without error', function(done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            var query = new Noserv.Query(score);
            query.get(objectId, {
                success: function(data) {

                    assert(data.results);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('find all', function() {
        it('should find all without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            var query = new Noserv.Query(score);

            query.find({
                success: function(data) {

                    assert(data.results);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('or', function() {
        it('should or all without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            var queryMax = new Noserv.Query(score);
            queryMax.lessThan("how", 80);

            var queryMin = new Noserv.Query(score);
            queryMin.greaterThan("how", 40);

            var query = Noserv.Query.or(queryMax, queryMin);

            query.find({
                success: function(data) {

                    assert(data.results);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('matches', function() {
        it('should count without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            var query = new Noserv.Query(score);

            query.matches("name", "야.*");

            query.find({
                success: function(data) {

                    assert(data.results);
                    assert(data.results[0]);
                    assert.equal(data.results[0].name, '야구');
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });

    describe('count', function() {
        it('should count without error', function (done) {

            var Score = new Noserv.Object("Score", sessionToken);
            var score = Score.extend();

            var query = new Noserv.Query(score);

            query.lessThanOrEqualTo("how", 80);

            query.count({
                success: function(data) {

                    assert(data.count);
                    done();
                },
                error: function(user, error) {

                    done(error);
                }
            });
        });
    });
});
