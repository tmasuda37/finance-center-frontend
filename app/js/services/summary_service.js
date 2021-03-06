function service(transportService) {
  'ngInject';

  const service = {};

  service.getBalance = function (data) {
    return transportService.send('POST', 'summary/balance', data)
  };

  service.getMonthlyAccountBalance = function (data) {
    return transportService.send('POST', 'summary/monthly-account-balance', data)
  };

  service.getMonthlyHouseHoldBalance = function (data) {
    return transportService.send('POST', 'summary/monthly-house-hold-balance', data)
  };

  service.setBudget = function (data) {
    return transportService.send('POST', 'summary/set-budget', data)
  };

  service.updateBudget = function (data) {
    return transportService.send('POST', 'summary/update-budget', data)
  };

  service.getBudgetTotal = function (data) {
    return transportService.send('POST', 'summary/get-budget-total', data)
  };

  return service;
}

export default {
  name: 'summaryService',
  fn: service
};
