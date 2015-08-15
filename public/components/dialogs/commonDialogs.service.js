angular.module('app')
    .service('commonDialogs', ['ngDialog', '$rootScope', '$q', '$timeout',  function (ngDialog, $rootScope, $q, $timeout) {
        return {
            openPlainStickDialog: openPlainStickDialog,
            openStickDialog: openPlainStickDialog, //backward compatibility
            openWarning: openWarning,
            stickDialogsBase: stickDialog
        };
        function stickDialog(options, stick) {
            options = options || {};
            var deleteDefer = $q.defer();
            var saveDefer = $q.defer();
            var scope = $rootScope.$new(false, $rootScope);
            scope.canDelete = true;
            scope.canDeactivate = true;
            angular.extend(scope, options);
            scope.stick = stick;
            scope.model = stick ? angular.copy(stick) : {};
            options.className = options.className || '';
            var dialog = ngDialog.open({
                template: 'components/dialogs/modal.partial.html',
                className: 'ngdialog-theme-plain stick-dialog ngdialog-centered '+ options.className,
                showClose: true,
                scope: scope,
                closeByDocument: false,
                controller: options.controller
            });
            scope.dialogId = dialog.id;
            if (!scope.model.hasOwnProperty('active')) scope.model.active = true;
            if (options.hasOwnProperty('groupId')) scope.model.group = options.groupId;
            scope.isEditMode = stick && (stick.id || stick._id);

            scope.spinner = {performing: false};
            scope.save = function (data) {
                var newStick = data || scope.model;
                scope.spinner.performing = false;
                if (stick) angular.extend(stick, newStick);
                saveDefer.resolve(newStick);
                $timeout(dialog.close, 0)
            };
            scope.remove = function () {
                scope.spinner.performing = false;
                deleteDefer.resolve(scope.model);
                $timeout(dialog.close, 0)
            };

            dialog.closePromise.then(function (data) {
                scope.$destroy();
            });

            return {
                closePromise: dialog.closePromise,
                deletePromise: deleteDefer.promise,
                savePromise: saveDefer.promise
            };
        }

        function openPlainStickDialog(box, stick) {
            var options = {
                headerTxt: box.header,
                descPlaceholder: box.descPlaceholder,
                bodyTmpl: 'components/dialogs/plainStick.modal.partial.html',
                entityName: box.entityName
            };
            if (!stick) stick = {group: box.groupId};
            return stickDialog(options, stick);
        }
        function openWarning(options) {
            var okPromise = $q.defer();
            var cancelPromise = $q.defer();
            var scope = $rootScope.$new(false, $rootScope);
            angular.extend(scope, options);
            var dialog = ngDialog.open({
                template: 'public/partials/warning.modal.partial.html',
                className: 'ngdialog-theme-plain stick-dialog ignore-theme',
                showClose: false,
                closeByDocument: false,
                closeByEscape: false,
                scope: scope,
                controller: options.controller,
                message:options.message,
                hideContinueBtn:options.hideContinueBtn
            });
            scope.ok = function (dialogScope) {
                okPromise.resolve();
                $timeout(dialog.close, 0)
            };
            scope.cancel = function (dialogScope) {
                cancelPromise.resolve();
                $timeout(dialog.close, 0)
            };


            dialog.closePromise.then(function (data) {
                scope.$destroy();
            });
            return {
                okPromise: okPromise.promise,
                cancelPromise: cancelPromise.promise,
                closePromise: dialog.closePromise
            }
        }
    }]);