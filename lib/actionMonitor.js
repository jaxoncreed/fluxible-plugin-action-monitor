
var actionMonitorAction = require('./actionMonitorAction');

var plugContext = function (specificContext, context, app) {
    var origExecuteAction = specificContext.executeAction;
    delete specificContext.executeAction;
    specificContext.executeAction = function (action, payload, actionIdOrDone, done) {
        if (typeof actionIdOrDone === "string") {
            payload._actionId = actionIdOrDone;
            payload._action = action;
            origExecuteAction(actionMonitorAction, payload, done);
        } else {
            origExecuteAction(action, payload, actionIdOrDone);
        }
    };
}

module.exports = {

    name: 'ActionMonitorPlugin',

    plugContext: function (options, context, app) {

        return {

            plugActionContext: plugContext,

            plugComponentContext: plugContext,

            dehydrate: function () {
                return {};
            },

            rehydrate: function (state) {}
        };
    }
}