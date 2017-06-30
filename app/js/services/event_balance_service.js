function service(transportService) {
  'ngInject';

  const service = {};

  service.getBalance = function (event) {
    return transportService.send('POST', 'event-balance/list', event);
  };

  return service;
}

export default {
  name: 'eventBalanceService',
  fn: service
};
