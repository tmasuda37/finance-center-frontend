function service(transportService) {
  'ngInject';

  const service = {};

  service.defaultList = function () {
    return transportService.send('GET', 'currency/list')
  };

  return service;
}

export default {
  name: 'currencyService',
  fn: service
};
