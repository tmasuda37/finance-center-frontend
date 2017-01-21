var ctrl = function ($scope, $state, accountService) {

  accountService.create().then(
    function() {
      $state.go('addOrEditTransaction');
    }, function(error) {
      console.error(error);
    });

};

ctrl.$inject = ['$scope', '$state', 'accountService'];

export default {
  name: 'AddAccountCtrl',
  fn: ctrl
};
