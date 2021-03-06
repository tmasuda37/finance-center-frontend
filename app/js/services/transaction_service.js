function service(transportService) {
  'ngInject';

  const service = {};

  service.getApplyToList = function () {
    return transportService.send('GET', 'transaction/apply-to-list')
  };

  service.create = function (data) {
    return transportService.send('POST', 'transaction/create', data)
  };

  service.createAll = function (data) {
    return transportService.send('POST', 'transaction/createAll', data)
  };

  service.saveAll = function (data) {
    return transportService.send('POST', 'transaction/saveAll', data)
  };

  service.duplicateCheck = function (data) {
    return transportService.send('POST', 'transaction/duplicateCheck', data)
  };

  service.listForAccount = function (data) {
    return transportService.send('POST', 'transaction/list-for-account', data);
  };

  service.listForHouseHold = function (data) {
    return transportService.send('POST', 'transaction/list-for-house-hold', data);
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
