var ctrl = function ($scope, $anchorScroll, eventService) {

  $scope.currentEvent = {
    name: ''
  };

  $scope.fetch = function () {
    eventService.defaultList().then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.toggleEdit = function (row) {
    $anchorScroll();
    $scope.currentEvent = row;
  };

  $scope.submit = function (data) {
    eventService.create(data).then(
      function() {
        $scope.currentEvent = {
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

ctrl.$inject = ['$scope', '$anchorScroll', 'eventService'];

export default {
  name: 'EventsCtrl',
  fn: ctrl
};
