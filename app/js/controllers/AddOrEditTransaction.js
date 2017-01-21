var ctrl = function ($scope, $q, $state, $stateParam, categoryService, currencyService, eventService, placeService, transactionService) {

  $scope.isEditMode = $stateParam.publicId;

  const promise1 = categoryService.defaultList();
  $q.when(promise1, function (data) {
    $scope.categoryList = data;
  });

  const promise2 = currencyService.defaultList();
  $q.when(promise2, function(data) {
    $scope.currencyList = data;
  });

  const promise3 = eventService.defaultList()
  $q.when(promise3, function(data) {
    $scope.eventList = data;
  });

  const promise4 = placeService.defaultList()
  promise4.then(function(data) {
    $scope.placeList = data;
  });

  $scope.currentTx = {};

  $q.all([
    promise1,
    promise2,
    promise3,
    promise4
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
