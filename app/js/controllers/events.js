var ctrl = function ($scope, eventService) {

  $scope.fetch = function () {
    eventService.defaultList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.submit = function (data) {
    eventService.create(data).then(
      function() {
        $scope.newEvent = {
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

  $scope.newEvent = {
    name: ''
  };

  $scope.status = 'init';

};

ctrl.$inject = ['$scope', 'eventService'];

export default {
  name: 'EventsCtrl',
  fn: ctrl
};
