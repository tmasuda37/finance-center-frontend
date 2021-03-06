var ctrl = function ($scope, $anchorScroll, placeService) {

  $scope.currentPlace = {
    name: ''
  };

  $scope.fetch = function () {
    placeService.defaultList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.toggleEdit = function (row) {
    $anchorScroll();
    $scope.currentPlace = row;
  };

  $scope.submit = function (data) {
    placeService.create(data).then(
      function() {
        $scope.currentPlace = {
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

  $scope.status = 'init';

};

ctrl.$inject = ['$scope', '$anchorScroll', 'placeService'];

export default {
  name: 'PlacesCtrl',
  fn: ctrl
};
