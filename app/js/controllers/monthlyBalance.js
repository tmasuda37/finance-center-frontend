var ctrl = function ($scope, $state, summaryService, currencyService) {

  $scope.targetMonth = new Date();

  const getExpenses = function (list) {
    return list.filter((item) => {
      return item.category.toExpense === true && item.category.toIgnoreCategoryBalance === false;
    });
  };

  const getNonExpenses = function (list) {
    return list.filter((item) => {
      return item.category.toExpense === false && item.category.toIgnoreCategoryBalance === false;
    });
  };

  const getLabels = (monthlyBalance) => {
    return monthlyBalance.map((item) => {
      return item.category.name;
    });
  };

  const getAmounts = (monthlyBalance) => {
    return monthlyBalance.map((item) => {
      return item.amount;
    });
  };

  $scope.getTotal = function (list, toExpense) {
    return list.reduce(function (prev, item) {
      if (item.category.toExpense === toExpense && item.category.toIgnoreCategoryBalance === false) {
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
          const expenses = getExpenses(monthlyBalance);
          const nonExpenses = getNonExpenses(monthlyBalance);
          const item = {
            currency,
            monthlyBalance,
            expenses,
            nonExpenses,
            expenseLabels: getLabels(expenses),
            expenseAmounts: getAmounts(expenses),
            nonExpenseLabels: getLabels(nonExpenses),
            nonExpenseAmounts: getAmounts(nonExpenses)
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
