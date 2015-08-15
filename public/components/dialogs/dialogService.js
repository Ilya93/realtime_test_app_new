angular.module('app')
    .service('dialogService', ['commonDialogs',function (commonDialogs) {
        return {
            openStickDialog:function(box, stick){
                var options={
                    headerTxt: box.header,
                    descPlaceholder: 'Placeholder',
                    bodyTmpl: 'components/dialogs/plainStick.modal.partial.html',
                    controller: 'StickyDialogCtrl',
                    entityName: "instructions",
                    className: 'res-theme'
                };
                if(!stick) stick={group:box.groupId};
                return commonDialogs.stickDialogsBase(options,stick);
            }
        };
    }]);
