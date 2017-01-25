var ctrl = function ($scope, $q, $state, $stateParam, categoryService, currencyService, eventService, placeService, transactionService) {

  $scope.isEditMode = $stateParam.publicId;

  const applyToPromise = transactionService.getApplyToList();
  $q.when(applyToPromise, function(data) {
    $scope.applyToList = data;
  });

  const categoryPromise = categoryService.getList();
  $q.when(categoryPromise, function (data) {
    $scope.categoryList = data;
  });

  const currencyPromise = currencyService.defaultList();
  $q.when(currencyPromise, function(data) {
    $scope.currencyList = data;
  });

  const eventPromise = eventService.defaultList()
  $q.when(eventPromise, function(data) {
    $scope.eventList = data;
  });

  const placePromise = placeService.defaultList()
  $q.when(placePromise, function(data) {
    $scope.placeList = data;
  });

  $scope.currentTx = {};

  $q.all([
    applyToPromise,
    categoryPromise,
    currencyPromise,
    eventPromise,
    placePromise
  ]).then(function() {
    if ($scope.isEditMode) {
      var request = {publicId: $stateParam.publicId};
      transactionService.retrieve(request).then(function(data) {
        data.calendar = new Date(data.calendar);
        $scope.currentTx = data;
        $scope.toExpense = data.category.toExpense;
      });
    } else {
      $scope.currentTx.calendar = new Date();
      currencyService.defaultCurrency().then(function(data) {
        $scope.currentTx.currency = data;
      });
    }
  });

  $scope.filterByApplyTo = function (item) {
    return item.toExpense === $scope.toExpense;
  };

  $scope.submit = function (data) {
    transactionService.create(data).then(
      function() {
        if ($scope.isEditMode) {
          $scope.cancel();
        } else {
          $scope.currentTx = {
            calendar: new Date()
          };
          $scope.toExpense = undefined;
        }
      }, function(error) {
        console.error(error);
      });
  };

  $scope.cancel = function () {
    $state.go('accountTransactions');
  };

};

ctrl.$inject = ['$scope', '$q', '$state', '$stateParams', 'categoryService', 'currencyService', 'eventService', 'placeService', 'transactionService'];

export default {
  name: 'AddOrEditTransactionCtrl',
  fn: ctrl
};
