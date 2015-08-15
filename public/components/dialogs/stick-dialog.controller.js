angular.module('app')
    .controller('StickyDialogCtrl', ['$scope',
        function ($scope) {
            var sticks = new LDB.Collection('sticks');
            $scope.save = function (model, stick) {
                console.log(stick);
                $scope.isEditMode ? update($scope.model, stick) : create($scope.model, stick.group);
            };
            $scope.remove = function () {
                var data = $scope.model;
                sticks.find(data, function (results) {
                    console.log('Remove item:', results[0]);
                    results[0].delete();
                    $scope.$parent.remove();
                });
            };
            function create(data, group) {
                data.group = group;
                sticks.save(data, function (_data) {
                    console.log('New item:', _data);
                    return $scope.$parent.save(data);
                });

            }
            function update(data) {
                console.log(data);
                sticks.update({_id: data._id}, data, function (updated_items) {
                    console.log('Updated item', updated_items);
                    $scope.$parent.save();
                });
            }
        }]);
