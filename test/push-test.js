var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = '';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('push', function() {

    describe('push', function () {
        it('should push(channel) without error', function (done) {

            Noserv.Push.send({
                "channels": [
                    "Giants"
                ],
                "data": {
                    "alert": "The Giants won against the Mets 2-3."
                }
            },{
                success: function (data) {
                    assert(data.createdAt);
                    assert(data.objectId);

                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });

        it('should push(query) without error', function (done) {

            Noserv.Push.send({
                "where": {
                    "scores": true,
                    "gameResults": true,
                    "injuryReports": true
                },
                "data": {
                    "alert": "테스트 푸시내용"
                }
            },{
                success: function (data) {
                    assert(data.createdAt);
                    assert(data.objectId);

                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });
    });
});
