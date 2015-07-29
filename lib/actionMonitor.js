
var actionMonitorAction = require('./actionMonitorAction');

module.exports = {

    name: 'ActionMonitorPlugin',

    plugContext: function (options, context, app) {

        return {

            plugActionContext: function (actionContext, context, app) {
                var origExecuteAction = actionContext.executeAction;
                delete actionContext.executeAction;
                actionContext.executeAction = function (action, payload, actionIdOrDone, done) {
                    console.log(actionIdOrDone);
                    if (typeof actionIdOrDone === "string") {
                        console.log("Oh first");
                        payload._actionId = actionIdOrDone;
                        payload._action = action;
                        origExecuteAction(actionMonitorAction, payload, done);
                    } else {
                        console.log("oh second");
                        origExecuteAction(action, payload, actionIdOrDone);
                    }
                };
            },

            dehydrate: function () {
                return {};
            },

            rehydrate: function (state) {}
        };
    }
}