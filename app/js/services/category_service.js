function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'category/create', data)
  };

  service.getList = function (data) {
    return transportService.send('POST', 'category/list', data)
  };

  service.getCategoryApplyToList = function () {
    return transportService.send('GET', 'category/apply-to-list')
  };

  return service;
}

export default {
  name: 'categoryService',
  fn: service
};
