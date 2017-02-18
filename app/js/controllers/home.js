var ctrl = function ($scope, authService, serverStatusService, $uibModal) {

  const modalPromise = $uibModal.open({
    animation: true,
    backdrop : 'static',
    ariaLabelledBy: 'modal-title-bottom',
    ariaDescribedBy: 'modal-body-bottom',
    windowClass: 'center-modal',
    templateUrl: 'wake-up-server.html',
    size: 'lg',
  });

  serverStatusService.wakeUp().then(() => {
    modalPromise.close();
  });

  $scope.login = function () {
    authService.login();
  };

};

ctrl.$inject = ['$scope', 'authService', 'serverStatusService', '$uibModal'];

export default {
  name: 'HomeCtrl',
  fn: ctrl
};
