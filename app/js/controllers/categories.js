var ctrl = function ($scope, categoryService) {

  $scope.newCategory = {
    name: '',
    toExpense: true
  };

  $scope.fetch = function () {
    categoryService.getList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.submit = function (data) {
    categoryService.create(data).then(
      function() {
        $scope.fetch();

        $scope.newCategory = {
          name: '',
          toExpense: true
        };

        $scope.status = 'completed';

      }, function(error) {
        $scope.status = 'failed';

        console.error(error);
      });
  };

  $scope.fetch();

  $scope.status = 'init';

};

ctrl.$inject = ['$scope', 'categoryService'];

export default {
  name: 'CategoriesCtrl',
  fn: ctrl
};
