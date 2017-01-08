var ctrl = function ($scope, categoryService) {

  $scope.fetch = function () {
    categoryService.defaultList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  categoryService.getCategoryApplyToList().then(function(data) {
    $scope.categoryApplyToList = data;
  });

  $scope.submit = function (data) {
    categoryService.create(data).then(
      function() {
        $scope.newCategory = {
          name: ''
        };

        $scope.fetch();
        $scope.status = 'completed';

      }, function(error) {
        $scope.status = 'failed';

        console.error(error);
      });
  };

  $scope.fetch();

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
