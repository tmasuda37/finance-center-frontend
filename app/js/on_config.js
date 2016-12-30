function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, lockProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'ExampleCtrl as home',
    templateUrl: 'home.html',
    title: 'Home',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/');

  lockProvider.init({
    clientID: 'VPBBm5pT65qSKUpliiH7O2t6YRYmhewk',
    domain: 'tmasuda.auth0.com'
  });

}

export default OnConfig;
