var ctrl = function ($scope, categoryService) {

  $scope.fetch = function (categoryApplyTo) {
    const request = { categoryApplyTo };
    categoryService.getList(request).then(function(data) {
      $scope.rowCollection = data;
    });
  };

  categoryService.getCategoryApplyToList().then(function(data) {
    $scope.categoryApplyToList = data;
  });

  $scope.submit = function (data) {
    categoryService.create(data).then(
      function() {
        $scope.fetch($scope.newCategory.categoryApplyTo);

        $scope.newCategory = {
          name: ''
        };

        $scope.status = 'completed';

      }, function(error) {
        $scope.status = 'failed';

        console.error(error);
      });
  };

  $scope.newCategory = {
    name: ''
  };

  $scope.status = 'init';

};

ctrl.$inject = ['$scope', 'categoryService'];

export default {
  name: 'CategoriesCtrl',
  fn: ctrl
};
