var ctrl = function ($scope, $q, $state, $stateParam, categoryService, currencyService, eventService, placeService, transactionService) {

  $scope.isEditMode = $stateParam.publicId;

  const categoryApplyToPromise = categoryService.getCategoryApplyToList();
  $q.when(categoryApplyToPromise, function(categoryApplyToList) {
    $scope.categoryApplyToList = categoryApplyToList;
    $scope.categoryList = [];

    categoryApplyToList.forEach(function (categoryApplyTo) {
      var request = {categoryApplyTo};
      const categoryPromise = categoryService.getList(request);
      $q.when(categoryPromise, function (data) {
        data.forEach(function (item) {
          $scope.categoryList.push(item);;
        });
      });
    });

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
    categoryApplyToPromise,
    currencyPromise,
    eventPromise,
    placePromise
  ]).then(function() {
    if ($scope.isEditMode) {
      var request = {publicId: $stateParam.publicId};
      transactionService.retrieve(request).then(function(data) {
        data.calendar = new Date(data.calendar);
        $scope.currentTx = data;
      });
    } else {
      $scope.currentTx.calendar = new Date();
      currencyService.defaultCurrency().then(function(data) {
        $scope.currentTx.currency = data;
      });
    }
  });

  $scope.filterByCategoryApplyTo = function (item) {
    if ($scope.currentTx.category) {
      return item.categoryApplyTo === $scope.currentTx.category.categoryApplyTo;
    } else {
      $scope.currentTx.category = null;
      return false;
    }
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
        }
      }, function(error) {
        console.error(error);
      });
  };

  $scope.cancel = function () {
    $state.go('transactions');
  };

};

ctrl.$inject = ['$scope', '$q', '$state', '$stateParams', 'categoryService', 'currencyService', 'eventService', 'placeService', 'transactionService'];

export default {
  name: 'AddOrEditTransactionCtrl',
  fn: ctrl
};
