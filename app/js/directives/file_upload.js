function directive() {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.fileUpload);
      element.bind('change', onChangeFunc);
    }
  };

}

export default {
  name: 'fileUpload',
  fn: directive
};
