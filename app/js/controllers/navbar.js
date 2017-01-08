var ctrl = function ($scope) {

  $scope.isCollapsed = true;

  $scope.$on('$viewContentLoaded', function(){
    $scope.isCollapsed = true;
  });

};

ctrl.$inject = ['$scope'];

export default {
  name: 'NavBarCtrl',
  fn: ctrl
};
