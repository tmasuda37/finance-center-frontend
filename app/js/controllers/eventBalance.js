var ctrl = function ($scope, currencyService, eventService, eventBalanceService) {

  eventService.defaultList().then(function(eventList) {
    eventList.forEach(function (event) {
      eventBalanceService.getBalance(event).then(function(data) {
        event.balanceList = data;
      });
    });

    $scope.eventList = eventList;
  });

};

ctrl.$inject = ['$scope', 'currencyService', 'eventService', 'eventBalanceService'];

export default {
  name: 'EventBalanceCtrl',
  fn: ctrl
};
