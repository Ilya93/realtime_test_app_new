(function () {
    'use strict'
    StickController.$inject = ['$scope'];
    angular.module('app')
        .controller('stickCtrl', StickController);

    function StickController($scope) {
        //$scope.onChangeActivity = function (ev) {
        //    ev.stopPropagation();
        //    var data = angular.copy($scope.stick);
        //    $scope.changinActivity = $scope.stick.saving = true;
        //    if ($scope.onActiveChange) $scope.onActiveChange(data, callback);
        //    function callback(data) {
        //
        //        $scope.stick.active = data.active;
        //
        //        $scope.changinActivity = $scope.stick.saving = false;
        //        delete $scope.stick.saving;
        //    }
        //}
        //$scope.isShow = true;
    }
})();
