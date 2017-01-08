function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function () {
    return transportService.send('POST', 'account/create')
  };

  return service;
}

export default {
  name: 'accountService',
  fn: service
};
