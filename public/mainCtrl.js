angular.module('app', ['ngDialog'])
    .controller('appController', ['$scope', 'dataSvc', 'dialogService', '$timeout',
        function ($scope, service, dialog, $timeout) {
            var scheme = [
                [
                    {groupId: 'reason'},
                    {groupId: 'values'},
                    {groupId: 'mission'}
                ],
                [
                    {groupId: 'objectives'},
                    {groupId: 'restrictions'},
                    {groupId: 'informing'}
                ]
            ];

            $scope.scheme = scheme;
            $scope.itemsPromise = service.querySticks();

            //$timeout(function () {
            //    service.randomChangeData();
            //}, 5000);
            //
            //$timeout(function () {
            //    service.randomAddData();
            //}, 5000);
            //
            //$timeout(function () {
            //    service.randomDeleteData();
            //}, 5000);
            $scope.$on('data:synchronized', function (event, args) {
                if(angular.isArray(args)) {
                    $scope.changedIds = args.map(function (item) {
                        return item._id;
                    });
                }
                else   $scope.changedIds = args._id;
                $scope.itemsPromise = service.querySticks();
            });

            $scope.onCreate = function (box) {
                return dialog.openStickDialog(box).savePromise.then(function (result) {
                    if (!box.sticks)box.sticks = [];
                    box.sticks.push(result);
                });
            };
            $scope.onOpen = function (box, stick) {
                var result = dialog.openStickDialog(box, stick);
                result.deletePromise.then(function (data) {
                    var ind = box.sticks.indexOf(stick);
                    box.sticks.splice(ind, 1);
                });
            }

        }]);
