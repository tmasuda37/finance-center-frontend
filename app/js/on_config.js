function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, lockProvider, $httpProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'ExampleCtrl as home',
      templateUrl: 'home.html',
      title: 'Home',
      controllerAs: 'vm'
    })
    .state('createAccount', {
      url: '/add-account',
      controller: 'AddAccountCtrl'
    })
    .state('addTransaction', {
      url: '/add-transaction',
      controller: 'AddTransactionCtrl',
      templateUrl: 'add-transaction.html',
      title: 'Add new transaction',
      controllerAs: 'vm'
    })
    .state('doLogout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

  $urlRouterProvider.otherwise('/');

  lockProvider.init({
    clientID: 'VPBBm5pT65qSKUpliiH7O2t6YRYmhewk',
    domain: 'tmasuda.auth0.com'
  });

  $httpProvider.interceptors.push(function($q) {
    return {
      'request': function(config) {
         config.headers = config.headers || {};
         if (localStorage.id_token) {
             config.headers.Authorization = 'Bearer ' + localStorage.id_token;
         }
         return config;
      },

      'responseError': function(response) {
        if (response.status === 401) {
          window.location.href = '/';
        }

        return $q.reject(response);
      }
    };
  });

}

export default OnConfig;
