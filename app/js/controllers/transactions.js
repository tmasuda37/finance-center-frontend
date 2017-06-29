var ctrl = function ($scope, $state, transactionService) {

  $scope.targetMonth = new Date();

  $scope.itemPerPage = '12';

  $scope.retrieve($scope.targetMonth, $scope.currency);

  $scope.$on('currencyChanged', function(event, currency) {
    $scope.retrieve($scope.targetMonth, currency);
  });

  $scope.retrieve = function (calendar, currency) {
    var request = {calendar, currency};
    if ($state.current.name === 'accountTransactions') {
      transactionService.listForAccount(request).then(function(data) {
        $scope.rowCollection = data;
      });
    } else {
      transactionService.listForHouseHold(request).then(function(data) {
        $scope.rowCollection = data;
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

};

ctrl.$inject = ['$scope', '$state', 'transactionService'];

export default {
  name: 'TransactionsCtrl',
  fn: ctrl
};
