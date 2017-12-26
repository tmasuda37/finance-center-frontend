function service(transportService, $q) {
  'ngInject';

  const service = {};

  let cachedCurrency;

  service.defaultList = function () {
    return transportService.send('GET', 'currency/list')
  };

  service.defaultCurrency = function () {
    return transportService.send('GET', 'currency/default')
  };

  return service;
}

export default {
  name: 'currencyService',
  fn: service
};
