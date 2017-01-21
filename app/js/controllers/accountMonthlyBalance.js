var ctrl = function ($scope, summaryService, currencyService) {

  $scope.targetMonth = new Date();

  $scope.retrieve = function (calendar) {
    currencyService.defaultList().then(function(currencyList) {
      $scope.wrappedList = [];

      currencyList.forEach(function (currency)  {
        var request = {calendar, currency};
        summaryService.getMonthlyBalance(request).then(function(monthlyBalance) {
          const item = {
            currency,
            monthlyBalance
          };
          $scope.wrappedList.push(item);
        });
      });

    });
  };

  $scope.retrieve($scope.targetMonth);

};

ctrl.$inject = ['$scope', 'summaryService', 'currencyService'];

export default {
  name: 'AccountMonthlyBalanceCtrl',
  fn: ctrl
};
