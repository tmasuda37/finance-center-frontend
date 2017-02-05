var ctrl = function ($scope, $q, $filter, transactionService, currencyService, summaryService) {

  $scope.targetMonth = new Date();

  const getDateLabels = () => {
    const list = []

    let aDayOfMonth = new Date($scope.targetMonth.getYear() + 1900, $scope.targetMonth.getMonth(), 1);
    let counter = 1;

    while($scope.targetMonth.getMonth() === aDayOfMonth.getMonth()) {
      const date = $filter('date')(aDayOfMonth, 'yyyy-MM-dd');
      list.push({
        date,
        amount: 0
      });
      aDayOfMonth.setDate(counter++);
    }

    return list;
  };

  const getExpenses = function (list) {
    return list.filter((item) => {
      return item.category.toExpense === true && item.category.toIgnoreCategoryBalance === false;
    });
  };

  const getDistinctByDate = (data, isBudgetTrackingOnly) => {
    const list = getDateLabels();

    data.filter((item) => {
      if (!isBudgetTrackingOnly) {
        return true;
      } else {
        return item.category.isBudgetTracking === isBudgetTrackingOnly;
      }
    })
    .forEach((elt) => {
      const date = $filter('date')(elt.calendar, 'yyyy-MM-dd');
      let existingItem = list.find((elt) => elt.date === date);

      if (existingItem) {
        existingItem.amount += elt.amount;
      } else {
        list.push({
          date,
          amount: elt.amount
        });
      }

    });
    return list;
  };

  const getLabels = (summary) => {
    return summary.map((item) => {
      return item.date;
    });
  };

  const getAmounts = (summary) => {
    return summary.map((item) => {
      return item.amount;
    });
  };

  const updateSubTotals = (summary) => {
    return summary.reduce((a, b) => {
      const subTotal = a + b.amount;
      b.subTotal = subTotal;
      return subTotal;
    }, 0);
  };

  const updateBudgetTotals = (summary, totalBudgetAmount) => {
    return summary.reduce((a, b) => {
      const budgetTotal = a - b.amount;
      b.budgetTotal = budgetTotal;
      return budgetTotal;
    }, totalBudgetAmount);
  };

  const getSubTotals = (summary) => {
    return summary.map((item) => {
      return item.subTotal;
    });
  };

  const getBudgetTotals = (summary) => {
    return summary.map((item) => {
      return item.budgetTotal;
    });
  };

  $scope.retrieve = function (calendar) {
    currencyService.defaultList().then(function(currencyList) {
      $scope.wrappedList = [];

      currencyList.forEach(function (currency) {
        const transactionRequest = {calendar, currency};
        transactionService.listForHouseHold(transactionRequest).then((transactionData) => {
          const expenses = getExpenses(transactionData);
          if (expenses.length !== 0) {
            const budget1Request = {
              calendar: $scope.targetMonth,
              currency,
              isBudgetTracking: false
            };

            const budget1Promise = summaryService.getBudgetTotal(budget1Request)
            let allSummary = [];
            $q.when(budget1Promise, (budgetTotal) => {
              allSummary = getDistinctByDate(expenses, false);
              updateSubTotals(allSummary);
              updateBudgetTotals(allSummary, budgetTotal);
            });

            const budget2Request = {
              calendar: $scope.targetMonth,
              currency,
              isBudgetTracking: true
            };

            const budget2Promise = summaryService.getBudgetTotal(budget2Request);
            let nonIgnoredOnlySummary = [];
            $q.when(budget2Promise, (budgetTotal) => {
              nonIgnoredOnlySummary = getDistinctByDate(expenses, true);
              updateSubTotals(nonIgnoredOnlySummary);
              updateBudgetTotals(nonIgnoredOnlySummary, budgetTotal);
            });

            $q.all([
              budget1Promise,
              budget2Promise
            ]).then(function() {
              const item = {
                currency,
                allLabels: getLabels(allSummary),
                allAmounts: getAmounts(allSummary),
                allSubTotals: getSubTotals(allSummary),
                allBudgetTotals: getBudgetTotals(allSummary),
                trackingAmounts: getAmounts(nonIgnoredOnlySummary),
                trackingSubTotals: getSubTotals(nonIgnoredOnlySummary),
                trackingBudgetTotals: getBudgetTotals(nonIgnoredOnlySummary)
              };

              $scope.wrappedList.push(item);
            });
          }
        });
      });

    });
  };

  $scope.retrieve($scope.targetMonth);

  $scope.dataSetOverride = [{
    yAxisID: 'y-axis-1'
  }];

  $scope.dataSetOverride = [{
      label: 'Daily Expense',
      borderWidth: 1,
      type: 'bar'
    },
    {
      label: 'Total Expense',
      borderWidth: 3,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      type: 'line'
    },
    {
      label: 'Available Budget',
      borderWidth: 3,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      type: 'line'
    }];

    $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };
};

ctrl.$inject = ['$scope', '$q', '$filter', 'transactionService', 'currencyService', 'summaryService'];

export default {
  name: 'DashboardCtrl',
  fn: ctrl
};
