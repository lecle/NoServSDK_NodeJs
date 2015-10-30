"use strict";

var request = require('request');

module.exports = require('./javascriptSDK/noserv.js');

module.exports.isRunning = {};
module.exports.reqQueue = {};

module.exports.Noserv.sendAjax = function(method, url, data, callF, addF){

    var jsonData = JSON.parse(data);
    var appId = jsonData._ApplicationId;

    if(appId && module.exports.isRunning[appId]) {
        if(!module.exports.reqQueue[appId])
            module.exports.reqQueue[appId] = [];

        module.exports.reqQueue[appId].push({
            method : method,
            url : url,
            data : data,
            callF : callF,
            addF : addF
        });

        return;
    }

    if(appId)
        module.exports.isRunning[appId] = true;

    var options = {
        method : method,
        uri : url,
        timeout : 10000,
        body : data,
        headers : {
            'content-type' : 'text/plain'
        }
    };

    request(options, function(err, res) {

        if(appId)
            module.exports.isRunning[appId] = false;

        if(err) {
            if (callF.error)
                callF.error(data, err.message);
        } else {

            var response = null;

            if(res.body && res.body.charAt && res.body.charAt(0) === '{')
                response = JSON.parse(res.body);
            else
                response = res.body;

            if(addF)
                addF(response);

            if(callF && callF.success)
                callF.success(response);
        }

        if(module.exports.reqQueue[appId] && module.exports.reqQueue[appId].length > 0) {

            var arg = module.exports.reqQueue[appId].shift();
            process.nextTick(function() {

                module.exports.Noserv.sendAjax(arg.method, arg.url, arg.data, arg.callF, arg.addF);
            });
        }
    });
};
