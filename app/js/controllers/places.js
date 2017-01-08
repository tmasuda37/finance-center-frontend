var ctrl = function ($scope, placeService) {

  $scope.fetch = function () {
    placeService.defaultList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.submit = function (data) {
    placeService.create(data).then(
      function() {
        $scope.newPlace = {
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

  $scope.newPlace = {
    name: ''
  };

  $scope.status = 'init';

};

ctrl.$inject = ['$scope', 'placeService'];

export default {
  name: 'PlacesCtrl',
  fn: ctrl
};
