var ctrl = function ($scope, categoryService) {

  $scope.itemPerPage = '5';

  $scope.currentCategory = {
    name: '',
    toExpense: true
  };

  $scope.fetch = function () {
    categoryService.getList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.enableEdit = function (row) {
      $scope.currentCategory = row;
  };

  $scope.submit = function (data) {
    categoryService.create(data).then(
      function() {
        $scope.fetch();

        $scope.currentCategory = {
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
