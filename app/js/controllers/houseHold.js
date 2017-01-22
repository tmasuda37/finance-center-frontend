var ctrl = function ($scope, accountService) {

  accountService.retrieveHouseHold().then(function(data) {
    $scope.houseHold = data;
  });

  $scope.submit = function (houseHoldId) {
    var request = { houseHoldId };
    accountService.updateHouseHold(request).then(
      function(data) {
        $scope.houseHold = data;
      }, function(error) {
        console.error(error);
      })
  };

};

ctrl.$inject = ['$scope', 'accountService'];

export default {
  name: 'HouseHoldCtrl',
  fn: ctrl
};
