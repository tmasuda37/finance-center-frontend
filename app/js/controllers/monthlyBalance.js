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

  $scope.getTotalAmount = function (list) {
    return list.reduce(function (prev, item) {
      if (item.category.toIgnoreCategoryBalance === false) {
        return prev + item.amount;
      }
      return prev;
    }, 0)
  };

  $scope.getTotalBudget = function (list) {
    return list.reduce(function (prev, item) {
      if (item.category.toIgnoreCategoryBalance === false) {
        return prev + item.budget;
      }
      return prev;
    }, 0)
  };

  $scope.getDiff = function (row) {
    if (!row.budget) {
      return;
    }
    return row.budget - row.amount;
  };

  $scope.toggleEdit = function (item) {
    item.isEdit = !item.isEdit;
  }

  $scope.setBudget = function () {
    summaryService.setBudget($scope.targetMonth).then(function() {
      $scope.retrieve($scope.targetMonth);
    });
  }

  $scope.saveBudget = function (item) {
    summaryService.updateBudget(item).then(function() {
      $scope.retrieve($scope.targetMonth);
    });
  }

  $scope.showTransactions = (currency, category) => {
    $state.go('houseHoldTransactions', { targetMonth: $scope.targetMonth, currency, category });
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
