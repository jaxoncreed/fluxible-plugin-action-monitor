module.exports = function (context, payload, done) {
    var action = payload._action;
    var actionId = payload._actionId;
    delete payload._action;
    delete payload._actionId;
    context.dispatch("ACTION_START", actionId);
    context.executeAction(action, payload, function() {
        context.dispatch("ACTION_END", actionId);
        done();
    });
};