function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'transaction/create', data)
  };

  service.createAll = function (data) {
    return transportService.send('POST', 'transaction/createAll', data)
  };

  service.defaultList = function (data) {
    return transportService.send('POST', 'transaction/list', data);
  };

  service.retrieve = function (data) {
    return transportService.send('POST', 'transaction/retrieve', data);
  };

  service.delete = function (data) {
    return transportService.send('POST', 'transaction/delete', data);
  };

  return service;
}

export default {
  name: 'transactionService',
  fn: service
};
