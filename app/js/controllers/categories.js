var ctrl = function ($scope, $anchorScroll, categoryService) {

  $scope.currentCategory = {
    name: '',
    toExpense: true
  };

  $scope.fetch = function () {
    categoryService.getList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.toggleEdit = function (row) {
    $anchorScroll();
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

ctrl.$inject = ['$scope', '$anchorScroll', 'categoryService'];

export default {
  name: 'CategoriesCtrl',
  fn: ctrl
};
