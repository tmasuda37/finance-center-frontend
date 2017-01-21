var ctrl = function ($scope, categoryService, currencyService, eventService, placeService, transactionService) {

  $scope.newTx = {
    calendar: new Date()
  };

  $scope.balance = {};

  categoryService.defaultList().then(function(data) {
    $scope.categoryList = data;
  });

  currencyService.defaultList().then(function(data) {
    $scope.currencyList = data;
  });

  currencyService.defaultCurrency().then(function(data) {
    $scope.newTx.currency = data;
  });

  eventService.defaultList().then(function(data) {
    $scope.eventList = data;
  });

  placeService.defaultList().then(function(data) {
    $scope.placeList = data;
  });

  $scope.submit = function (data) {
    transactionService.create(data).then(
      function(response) {
        $scope.newTx = {
          calendar: new Date(),
          currency: $scope.currency
        };

        $scope.balance = {
          amount: response.amount,
          currency: response.currency
        };
      }, function(error) {
        console.error(error);
      });
  };

};

ctrl.$inject = ['$scope', 'categoryService', 'currencyService', 'eventService', 'placeService', 'transactionService'];

export default {
  name: 'AddTransactionCtrl',
  fn: ctrl
};
