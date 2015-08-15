angular.module('app')
    .service('boardService', function () {
        this.dataToViewModel = function (scheme, key, data) {
            var dictionary = {};
            var oldVM = scheme;
            angular.forEach(data, function (value) {
                if (!dictionary[value.group]) {
                    dictionary[value.group] = [];
                }
                dictionary[value.group].push(value);
            });

            angular.forEach(scheme, function (row) {
                angular.forEach(row, function (cell) {
                    cell.header = cell.groupId;
                    cell.helpText = 'Is it something that the owners under no circumstances will allow the company to do? Move to a different place? Enter a particular industry? Collaborate with specific people? Make a sticky for each restriction.';
                    if (data) {
                        cell.sticks = dictionary[cell.groupId];
                    }
                });
            });
            return scheme;
        };
    })
    .service('dataSvc', ['$q', '$rootScope', '$timeout',
        function ($q, $rootScope, $timeout) {
            this.querySticks = function (args) {
                var data = new LDB.Collection('sticks').items;
                var deferred = $q.defer();
                var promise;
                deferred.resolve(data);
                promise = deferred.promise;
                promise.args = args;
                return promise;
            };
            this.randomChangeData = function loop() {
                var sticks = new LDB.Collection('sticks');
                var randomItem = sticks.items[Math.floor(Math.random() * sticks.items.length)];
                data = angular.copy(randomItem);
                data.title = makeId();
                sticks.update(randomItem, data, function (updated_items) {
                    console.log('Updated item', updated_items);
                    $rootScope.$broadcast('data:synchronized',updated_items);
                    $timeout(function () {
                          loop();
                    }, 3000);
                });
            };
            this.randomAddData = function loop() {
                var sticks = new LDB.Collection('sticks');
                var data = {};
                data.group = makeRandomGroup();
                data.title = makeId();
                data.description = makeId();
                sticks.save(data, function (_data) {
                    console.log('random created item:', _data);
                    $rootScope.$broadcast('data:synchronized',_data);
                    $timeout(function () {
                        loop();
                    }, 5000);
                });
            };
            this.randomDeleteData = function loop() {
                var sticks = new LDB.Collection('sticks');
                var randomItem = sticks.items[Math.floor(Math.random() * sticks.items.length)];
                data = angular.copy(randomItem);
                data.title = makeId();
                sticks.update(randomItem, data, function (updated_items) {
                    console.log('Updated item', updated_items);
                    $rootScope.$broadcast('data:synchronized',updated_items);
                    $timeout(function () {
                        loop();
                    }, 5000);
                });
            };
            function makeId() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }
            function makeRandomGroup() {
                var groups = ['reason','values','objectives','mission','restrictions','informing'];
                return groups[Math.floor(Math.random() * groups.length)] ;
            }
        }]);


