var ctrl = function (authService) {

  authService.logout();

};

ctrl.$inject = ['authService'];

export default {
  name: 'LogoutCtrl',
  fn: ctrl
};
