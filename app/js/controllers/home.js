var ctrl = function ($scope, authService) {

  $scope.login = function () {
    authService.login();
  };

};

ctrl.$inject = ['$scope', 'authService'];

export default {
  name: 'HomeCtrl',
  fn: ctrl
};
