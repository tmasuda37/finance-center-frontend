function service(transportService) {
  'ngInject';

  const service = {};

  service.getBalance = function (data) {
    return transportService.send('POST', 'summary/balance', data)
  };

  service.getMonthlyBalance = function (data) {
    return transportService.send('POST', 'summary/monthly-balance', data)
  };

  return service;
}

export default {
  name: 'summaryService',
  fn: service
};
