function service($http, $q) {
  'ngInject';

  const service = {};

  service.send = function (method, uri, data) {
    var deferred = $q.defer();

    var backendUrl = '';
    if (window.location.host === 'localhost:3000') {
      backendUrl = 'localhost:8080';
    } else if (window.location.host === 'finance-center-frontend-dev.herokuapp.com') {
      backendUrl = 'finance-center-backend-dev.herokuapp.com';
    } else if (window.location.host === 'finance-center-frontend-prod.herokuapp.com') {
      backendUrl = 'finance-center-backend-prod.herokuapp.com';
    }

    $http({
      method: method,
      url: window.location.protocol + '//' + backendUrl + '/' + uri,
      data,
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(response) {
      deferred.reject(response);
    });

    return deferred.promise;
  };

  return service;
}

export default {
  name: 'transportService',
  fn: service
};
