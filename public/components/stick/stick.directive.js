(function () {
    'use strict'
    angular.module('app')
        .directive('stick', function () {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                templateUrl: 'components/stick/stick.partial.html',
                link:function(scope,element,attrs,ctrl,transclude){

                },
                controller: 'stickCtrl'
            }
        })


})()

