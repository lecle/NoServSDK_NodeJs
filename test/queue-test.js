var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = '';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('queue', function() {

  describe('get', function() {
    it('should get without error', function(done) {

      var Score = new Noserv.Object("Score", sessionToken);
      var score = Score.extend();

      var query = new Noserv.Query(score);
      var cnt = 0;

      for(var i=0; i<10; i++) {

        if(i===5) {

          NoservInit.put('ydmijbikcs5j0pb9zwxxlgl2t5z2rzfr', 'bfx2o7sfx4oyldijrwtoe32mehzolxrz');

          Score = new Noserv.Object("Score", sessionToken);
          score = Score.extend();

          query = new Noserv.Query(score);
        }

        query.find({
          success: function(data) {

            assert(data.results);

            cnt ++;

            if(cnt === 10)
              done();
          },
          error: function(user, error) {

            done(error);
          }
        });
      }
    });
  });
});
