var exampleCtrl = function ($scope, authService) {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.authService = authService;

};

exampleCtrl.$inject = ['$scope', 'authService'];

export default {
  name: 'ExampleCtrl',
  fn: exampleCtrl
};
