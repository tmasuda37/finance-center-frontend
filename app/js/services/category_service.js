function categoryService(transportService) {
  'ngInject';

  const service = {};

  service.getCategories = function () {
    return transportService.send('GET', 'category/list')
  };

  return service;
}

export default {
  name: 'categoryService',
  fn: categoryService
};
