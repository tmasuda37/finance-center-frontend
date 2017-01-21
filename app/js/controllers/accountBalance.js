var ctrl = function ($scope, summaryService, currencyService) {

  currencyService.defaultList().then(function(currencyList) {
    $scope.wrappedList = [];

    currencyList.forEach(function (currency)  {
      var request = {currency};
      summaryService.getBalance(request).then(function(balance) {
          const item = {
            currency,
            balance
          };
          $scope.wrappedList.push(item);
      });
    });
  });

};

ctrl.$inject = ['$scope', 'summaryService', 'currencyService'];

export default {
  name: 'AccountBalanceCtrl',
  fn: ctrl
};
