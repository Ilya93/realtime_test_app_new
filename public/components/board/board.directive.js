boardCtrl.$inject = ['boardService', '$scope'];
angular.module('app')
    .directive('board', function () {
        return {
            restrict: 'E',
            replace: true,
            controller: boardCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                scheme: '=',
                items: '=',
                onCreateSticky: '&',
                onOpenSticky: '&',
                changedIds: '='
            },
            templateUrl: 'components/board/board.partial.html'
        }
    });
function boardCtrl(utils, $scope) {
    var vm = this;

    angular.forEach(vm.scheme, function (row) {
        angular.forEach(row, function (cell) {
            cell.header = cell.groupId;
        });
    });
    $scope.$watch('vm.items', function (newVal) {
        newVal.then(function (data) {
            utils.dataToViewModel(vm.scheme, vm.key, data);
        });
    });

    vm.isChanged = function (stickId) {
        if (angular.isArray(vm.changedIds)) {
            return vm.changedIds.indexOf(stickId) > -1;
        }
        else return vm.changedIds === stickId;
    }
}
