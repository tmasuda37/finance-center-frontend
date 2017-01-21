var ctrl = function ($scope, transactionService, currencyService) {

  $scope.targetMonth = new Date();

  currencyService.defaultList().then(function(data) {
    $scope.currencyList = data;
  });

  currencyService.defaultCurrency().then(function(data) {
    $scope.currency = data;
  });

  $scope.retrieve = function (calendar, currency) {
    var request = {calendar, currency};
    transactionService.defaultList(request).then(function(data) {
      $scope.rowCollection = data;
    });
  };

  $scope.retrieve($scope.targetMonth, $scope.currency);

};

ctrl.$inject = ['$scope', 'transactionService', 'currencyService'];

export default {
  name: 'TransactionsCtrl',
  fn: ctrl
};
