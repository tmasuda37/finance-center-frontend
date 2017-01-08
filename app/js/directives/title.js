function directive() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/title.html'
  };
}

export default {
  name: 'titleDirective',
  fn: directive
};
