var ctrl = function ($scope, $state, summaryService, currencyService) {

  $scope.targetMonth = new Date();

  $scope.toExpenseFilter = function (prev) {
    return function (item) {
      return item.category.toExpense === prev;
    }
  };

  $scope.getTotal = function (list, toExpense) {
    return list.reduce(function (prev, item) {
      if (item.category.toExpense === toExpense) {
        return prev + item.amount;
      }
      return prev;
    }, 0)
  };

  $scope.retrieve = function (calendar) {
    currencyService.defaultList().then(function(currencyList) {
      $scope.wrappedList = [];

      currencyList.forEach(function (currency)  {
        const request = {calendar, currency};
        let promise = {};

        if ($state.current.name === 'accountMonthlyBalance') {
          promise = summaryService.getMonthlyAccountBalance(request);
        } else {
          promise = summaryService.getMonthlyHouseHoldBalance(request);
        }

        promise.then(function(monthlyBalance) {
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

ctrl.$inject = ['$scope', '$state', 'summaryService', 'currencyService'];

export default {
  name: 'MonthlyBalanceCtrl',
  fn: ctrl
};
