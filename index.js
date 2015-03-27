"use strict";

var request = require('request');

module.exports = require('./javascriptSDK/noserv.js');

module.exports.Noserv.sendAjax = function(method, url, data, callF, addF){

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

        if(err) {

            if (callF.error)
                return callF.error(data, err.message);

            return;
        }

        var response = null;

        if(res.body && res.body.charAt && res.body.charAt(0) === '{')
            response = JSON.parse(res.body);
        else
            response = res.body;

        if(addF)
            addF(response);

        if(callF && callF.success)
            callF.success(response);
    });
};