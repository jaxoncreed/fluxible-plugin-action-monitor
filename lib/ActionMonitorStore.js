
var createStore = require('fluxible-app/utils/createStore');


var ActionMonitorStore = createStore({
    storeName: "ActionMonitorStore",
    handlers: {
        "ACTION_START": "handleActionStart",
        "ACTION_PROGRESS": "handleActionProgress",
        "ACTION_END": "handleActionEnd"
    },
    initialize: function(dispatcher) {
        this.actionsInProgress = {};
    },
    handleActionStart: function(actionId) {
        this.actionsInProgress[actionId] = 0;
        this.emitChange();
    },
    handleActionProgress: function(payload) {
        this.actionsInProgress[payload.actionId] = payload.progress;
        this.emitChange();
    },
    handleActionEnd: function(actionId) {
        delete this.actionsInProgress[actionId];
        this.emitChange();
    },
    getProgress: function(actionId) {
        return this.actionsInProgress[actionId];
    },
    getActionsInProgress: function() {
        return this.actionsInProgress;
    },
    dehydrate: function() {
        return {
            actionsInProgress: this.actionsInProgress,
        };
    },
    rehydrate: function(state) {
        this.actionsInProgress = state.actionsInProgress;
    }
});

module.exports = ActionMonitorStore;