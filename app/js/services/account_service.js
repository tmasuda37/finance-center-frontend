function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function () {
    return transportService.send('POST', 'account/create')
  };

  service.retrieveHouseHold = function () {
    return transportService.send('GET', 'account/retrieve')
  };

  service.updateHouseHold = function (data) {
    return transportService.send('POST', 'account/update', data)
  };

  return service;
}

export default {
  name: 'accountService',
  fn: service
};
