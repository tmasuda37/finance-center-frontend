function service(transportService, $q) {
  'ngInject';

  const service = {};

  let cachedCurrency;

  service.defaultList = function () {
    return transportService.send('GET', 'currency/list')
  };

  service.defaultCurrency = function () {
    if (!cachedCurrency) {
      return transportService.send('GET', 'currency/default')
    }

    return $q.resolve(cachedCurrency);
  };

  service.cacheCurrency = function (currency) {
    cachedCurrency = currency;
  };

  return service;
}

export default {
  name: 'currencyService',
  fn: service
};
