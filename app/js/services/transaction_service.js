function transactionService(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'transaction/create', data)
  };

  return service;
}

export default {
  name: 'transactionService',
  fn: transactionService
};
