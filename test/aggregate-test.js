var assert = require('assert');
var Noserv = require('../').Noserv;
var NoservInit = require('../').NoservInit;

var sessionToken = 'hee1jxg03xbc5wmi';
var appId = 'QuTvoTiPhHVIhOIfNZbc6NAk9NwfIUeB';
var appKey = '1olHlLDo4JQEIqasKDw25DdKPnxJ40kV';

NoservInit.put(appId, appKey);

describe('aggregate', function() {

    var objectId = '';

    describe('aggregate', function () {
        it('should aggregate without error', function (done) {

            var Aggregate = new Noserv.Object("Aggregate", sessionToken);
            var aggregate1 = Aggregate.extend();

            aggregate1.set('test', 'data1');
            aggregate1.set('groupId', 'a');
            aggregate1.set('num', 1);

            aggregate1.save(aggregate1, {
                success: function (data) {

                    var aggregate2 = Aggregate.extend();

                    aggregate2.set('test', 'data2');
                    aggregate2.set('groupId', 'a');
                    aggregate2.set('num', 2);

                    aggregate2.save(aggregate2, {
                        success: function (data) {

                            var aggregate3 = Aggregate.extend();

                            aggregate3.set('test', 'data3');
                            aggregate3.set('groupId', 'b');
                            aggregate3.set('num', 3);

                            aggregate3.save(aggregate3, {
                                success: function (data) {

                                    var aggregate4 = Aggregate.extend();

                                    aggregate4.set('test', 'data4');
                                    aggregate4.set('groupId', 'b');
                                    aggregate4.set('num', 4);

                                    aggregate4.save(aggregate4, {
                                        success: function (data) {

                                            var aggregate5 = Aggregate.extend();

                                            var aggregate = new Noserv.Aggregate(aggregate5);

                                            aggregate.push({ $match : {
                                                "num": {
                                                    "$lt": 4
                                                }
                                            }});

                                            aggregate.push({ $group : {
                                                _id : { groupId : "$groupId" },
                                                sum : { $sum : "$num" },
                                                count: { $sum: 1 }
                                            }});

                                            aggregate.aggregate({
                                                success: function(data) {

                                                    assert(data.results);
                                                    done();
                                                },
                                                error: function(user, error) {

                                                    done(error);
                                                }
                                            });

                                        },
                                        error: function (data, error) {

                                            done(error);
                                        }
                                    });
                                },
                                error: function (data, error) {

                                    done(error);
                                }
                            });
                        },
                        error: function (data, error) {

                            done(error);
                        }
                    });
                },
                error: function (data, error) {

                    done(error);
                }
            });
        });
    });


});
