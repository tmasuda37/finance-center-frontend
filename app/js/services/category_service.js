function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'category/create', data)
  };

  service.getList = function () {
    return transportService.send('GET', 'category/list')
  };

  return service;
}

export default {
  name: 'categoryService',
  fn: service
};
