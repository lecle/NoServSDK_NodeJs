var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = '';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('files', function() {

    describe('upload', function () {
        it('should upload (base64) without error', function (done) {

            var base64 = "p39ya2luZyBhdDFJeignwmV=hdCE";
            var file = new Noserv.File("testfile.txt", { base64: base64 });

            file.save({
                success: function (data) {
                    assert(data.url);
                    assert(data.objectId);

                    done();
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });

        it('should upload (byte array) without error', function (done) {

            var bytes = [ 0xAC, 0xBA, 0xCA, 0xDA ];
            var file = new Noserv.File("testfile.txt", bytes);

            file.save({
                success: function (data) {
                    assert(data.url);
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