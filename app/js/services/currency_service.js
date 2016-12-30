function currencyService(transportService) {
  'ngInject';

  const service = {};

  service.getCurrencies = function () {
    return transportService.send('GET', 'currency/list')
  };

  return service;
}

export default {
  name: 'currencyService',
  fn: currencyService
};
