function authService(lock, authManager) {
  'ngInject';

  const service = {};

  service.login = function() {
    lock.show();
  };

  service.registerAuthenticationListener = function() {
    lock.on('authenticated', function (authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();
    });
  };

  service.logout = function() {
    localStorage.removeItem('id_token');
    authManager.unauthenticate();
    window.location.href = '/';
  }

  return service;
}

export default {
  name: 'authService',
  fn: authService
};
