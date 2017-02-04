var ctrl = function ($scope, $filter, transactionService, currencyService) {

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

  const getDistinctByDate = (data) => {
    const list = getDateLabels();
    data.forEach((elt) => {
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

  const getSubTotals = (summary) => {
    return summary.map((item) => {
      return item.subTotal;
    });
  };

  $scope.retrieve = function (calendar) {
    currencyService.defaultList().then(function(currencyList) {
      $scope.wrappedList = [];

      currencyList.forEach(function (currency) {
        const request = {calendar, currency};
        transactionService.listForHouseHold(request).then((transactionData) => {
          const expenses = getExpenses(transactionData);
          if (expenses.length !== 0) {
            const summary = getDistinctByDate(expenses);
            updateSubTotals(summary);

            const item = {
              currency,
              labels: getLabels(summary),
              amounts: getAmounts(summary),
              subTotals: getSubTotals(summary)
            };

            $scope.wrappedList.push(item);
          }
        });
      });

    });
  };

  $scope.retrieve($scope.targetMonth);

  $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

  $scope.dataSetOverride = [{
      label: 'Bar chart',
      borderWidth: 1,
      type: 'bar'
    },
    {
      label: 'Line chart',
      borderWidth: 3,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      type: 'line'
    }];

};

ctrl.$inject = ['$scope', '$filter', 'transactionService', 'currencyService'];

export default {
  name: 'DashboardCtrl',
  fn: ctrl
};
