var ctrl = function ($scope, categoryService, currencyService, transactionService) {

  // ViewModel
  const vm = this;

  // todo: Loading Default Configuration
  $scope.newTx = {
    calendar: new Date()
  };

  $scope.balance = {};

  categoryService.getCategories().then(function(data) {
    $scope.categoryList = data;
  });

  currencyService.getCurrencies().then(function(data) {
    $scope.currencyList = data;
  });

  $scope.submit = function (data) {
    transactionService.create(data).then(
      function(response) {
        $scope.newTx = {
          calendar: new Date()
        };

        $scope.balance = {
          amount: response.amount,
          currency: response.anAccountBalanceKey.currency
        };
      }, function(error) {
        console.error(error);
      });
  };

};

ctrl.$inject = ['$scope', 'categoryService', 'currencyService', 'transactionService'];

export default {
  name: 'AddTransactionCtrl',
  fn: ctrl
};
