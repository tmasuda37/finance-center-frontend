function directive() {

  return {
    restrict: 'E',
    templateUrl: 'directives/currency-select.html',
    scope: {
      currency: '='
    },
    controller: ['$scope', '$rootScope', 'currencyService', function ($scope, $rootScope, currencyService) {
        currencyService.defaultList().then(function(data) {
          $scope.currencyList = data;

          currencyService.defaultCurrency().then(function(data) {
            $scope.currency = data;
          });
        });

        $scope.changeCurrency = function (currency) {
          $scope.currency = currency;
          $rootScope.$broadcast('currencyChanged', $scope.currency);
          currencyService.cacheCurrency($scope.currency);
        };
    }]
  };

}

export default {
  name: 'currencySelect',
  fn: directive
};
