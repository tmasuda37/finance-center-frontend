var ctrl = function ($scope) {

  var reader = new FileReader();

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

    $scope.rowCollection = _.map(linesWithoutHeader, function (line) {
      var splitReadyLine = removeCommaInQuotes(line);

      if (!splitReadyLine || splitReadyLine.length === 0) {
        return {};
      }

      var values = splitReadyLine.split(',');
      var dateInfo = values[0].split('/');
      var description;

      if (values[2]) {
        description = values[2].replace(/\"|\'/g, '');
      }

      return {
        calendar: new Date(dateInfo[2], dateInfo[1], dateInfo[0]),
        amount: values[3],
        description
      };
    })

    $scope.$apply();
  };

};

ctrl.$inject = ['$scope'];

export default {
  name: 'ImportCSVCtrl',
  fn: ctrl
};
