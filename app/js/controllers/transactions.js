var ctrl = function ($scope, transactionService) {

  var request = {page: 0, size: 100};
  transactionService.defaultList(request).then(function(data) {
    $scope.rowCollection = data.content;
  });

};

ctrl.$inject = ['$scope', 'transactionService'];

export default {
  name: 'TransactionsCtrl',
  fn: ctrl
};
