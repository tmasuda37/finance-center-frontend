var ctrl = function ($scope, $state, $stateParams, transactionService, currencyService, eventService, categoryService) {

  $scope.targetMonth = $stateParams.targetMonth || new Date();

  $scope.itemPerPage = '12';

  $scope.isBulkEdit = false;

  eventService.defaultList().then(function(data) {
    $scope.eventList = data;
  });

  categoryService.getList().then(function(data) {
    $scope.categoryList = data;
  })

  $scope.$on('currencyChanged', function(event, currency) {
    $scope.retrieve($scope.targetMonth, currency);
  });

  $scope.filterByApplyTo = function (dummy, row) {
    return function (item) {
      return item.toExpense === row.category.toExpense;
    }
  };

  $scope.retrieve = function (calendar, currency, category) {
    var request = { calendar, currency, category };
    $scope.rowCollection = [];

    if ($state.current.name === 'accountTransactions') {
      transactionService.listForAccount(request).then(function (data) {
        $scope.rowCollection = data;
        $scope.itemPerPage = category ? $scope.rowCollection.length : $scope.itemPerPage;
      });
    } else {
      transactionService.listForHouseHold(request).then(function (data) {
        $scope.rowCollection = data;
        $scope.itemPerPage = category ? $scope.rowCollection.length : $scope.itemPerPage;
      });
    }
  };

  $scope.edit = function (tx) {
    $state.go('addOrEditTransaction', {publicId: tx.publicId});
  };

  $scope.toggleEdit = function (row) {
    if ($state.current.name === 'accountTransactions') {
      row.isEdit = !row.isEdit;
    }
  };

  $scope.isEditMode = function () {
    let retValue = false;

    if ($scope.rowCollection && $scope.rowCollection.length !== 0) {
      $scope.rowCollection.forEach(function (row) {
        if (row.isEdit === true) {
          retValue = true;
        };
      });
    }

    return retValue;
  };

  $scope.delete = function (tx) {
    if (confirm('Are you sure to delete?')) {
      transactionService.delete(tx).then(function() {
        $scope.retrieve($scope.targetMonth, $scope.currency);
      });
    }
  };

  $scope.toggleBulkEdit = function () {
    $scope.isBulkEdit = !$scope.isBulkEdit;

    if ($scope.isBulkEdit === false) {
      $scope.retrieve($scope.targetMonth, $scope.currency);
    }
  };

  $scope.saveBulkEdit = function () {
    const editingData = $scope.rowCollection.filter(tx => tx.isBulkEdit === true);
    transactionService.saveAll(editingData).then(function() {
      $scope.toggleBulkEdit();
    });
  };

  $scope.$on('$viewContentLoaded', function () {
    currencyService.defaultCurrency().then(function (data) {
      $scope.currency = $stateParams.currency || data;
      $scope.retrieve($scope.targetMonth, $scope.currency, $stateParams.category);
    });
  });

};

ctrl.$inject = ['$scope', '$state', '$stateParams', 'transactionService', 'currencyService', 'eventService', 'categoryService'];

export default {
  name: 'TransactionsCtrl',
  fn: ctrl
};
