function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'category/create', data)
  };

  service.defaultList = function () {
    return transportService.send('GET', 'category/list')
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
