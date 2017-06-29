var ctrl = function ($scope, categoryService, currencyService, eventService, placeService, transactionService) {

  var reader = new FileReader();

  categoryService.getList().then(function(data) {
    $scope.categoryList = data;
  });

  currencyService.defaultList().then(function(data) {
    $scope.currencyList = data;
  });

  eventService.defaultList().then(function(data) {
    $scope.eventList = data;
  });

  placeService.defaultList().then(function(data) {
    $scope.placeList = data;
  });

  var removeCommaInQuotes = function (str) {
    let inQuote = false;
    let copy = '';

    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == '"') {
        inQuote = !inQuote;
      }

      if (str.charAt(i) == ',' && inQuote) {
          copy += '|';
      } else {
          copy += str.charAt(i);
      }
    }

    return copy;
  };

  $scope.importFile = function () {
    var csv = event.target.files[0];
    reader.readAsText(csv);
  };

  reader.onload = function () {
    var content = reader.result;
    var lines = content.split('\n');
    var linesWithoutHeader = lines.splice(1);

    const importedItems = [];

    _.each(linesWithoutHeader, function (line) {
      var splitReadyLine = removeCommaInQuotes(line);

      if (!splitReadyLine || splitReadyLine.length === 0) {
        return;
      }

      var values = splitReadyLine.split(',');
      var dateInfo = values[0].split('/');
      var description;

      if (values[2]) {
        description = values[2].replace(/\"|\'/g, '');
      }

      importedItems.push({
        calendar: new Date(dateInfo[2], dateInfo[1]-1, dateInfo[0]),
        category: null,
        applyTo: 'Bank',
        currency: $scope.currency,
        amount: Math.abs(values[3]),
        toExpense: values[3] < 0,
        description
      });
    });

    transactionService.duplicateCheck(importedItems).then(
      function(checkedData) {
        $scope.rowCollection = checkedData;
      }, function(error) {
        console.error(error);
      });

    $scope.$apply();
  };

  $scope.filterByApplyTo = function (dummy, row) {
    return function (item) {
      return item.toExpense === row.toExpense;
    }
  };

  $scope.submit = function () {
    transactionService.createAll($scope.rowCollection).then(
      function() {
        $scope.rowCollection = [];
      }, function(error) {
        console.error(error);
      });
  };

};

ctrl.$inject = ['$scope', 'categoryService', 'currencyService', 'eventService', 'placeService', 'transactionService'];

export default {
  name: 'ImportCSVCtrl',
  fn: ctrl
};
