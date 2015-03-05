/**
 * Created by megha on 3/4/15.
 */
//This file handles all types of responses that are obtained from external service provider like Parse in our case.
// Credit for building this useful module goes to Pulkit Singhal (https://github.com/pulkitsinghal)
'use strict';
var q = require('q')
  , log = require('winston')
  , zlib = require('zlib');

function decompressResponse (response, body) {
  var deferred = q.defer();

  if (response.headers['content-encoding'] === 'gzip') {
    log.debug('response is gzipped. gunzipping...');
    zlib.gunzip(body, function(error, buffer){
      log.debug('gunzipping now.');
      if(error) {
        log.error('error: ' + error);
        deferred.reject(error);
      } else {
        log.debug('buffer: ' + buffer.toString());
        deferred.resolve(buffer.toString());
      }
    });
  }
  else if (response.headers['content-encoding'] === 'deflate') {
    log.debug('response is deflated. inflating...');
    zlib.inflate(body, function(error, buffer){
      log.debug('inflating now.');
      if(error) {
        log.error(error);
        deferred.reject(error);
      } else {
        log.debug(buffer.toString());
        deferred.resolve(buffer.toString());
      }
    });
  }
  else {
    if (body instanceof String) {
      deferred.resolve(body);
    }
    else if ( body !== null && typeof body === 'object' && !(body instanceof Buffer) ) {
      deferred.resolve(JSON.stringify(body));
    }
    else {
      deferred.resolve(body.toString());
    }
  }

  return deferred.promise;
}

var evaluateResponse = function (response, message) {
  if(response.statusCode === 200 || response.statusCode === 201) {
    log.debug('Call succeeded. Resolving promise.');
    return q(message);
  } else {
    log.debug('Call failed. Rejecting promise. Status Code: ' + response.statusCode + '\n' + JSON.stringify(message));
    return q.reject(message);
  }
};

var processResponse = function (err, res, body) {
  if (err) {
    return q.reject(err);
  }

  return decompressResponse(res, body)
    .then(function(message){
      if (res.headers['content-type'] && res.headers['content-type'].indexOf( 'application/json')!==-1) {
        return evaluateResponse(res, JSON.parse(message));
      } else {
        return evaluateResponse(res, message);
      }
    });
};

exports.decompressResponse = decompressResponse;
exports.evaluateResponse = evaluateResponse;
exports.processResponse = processResponse;
