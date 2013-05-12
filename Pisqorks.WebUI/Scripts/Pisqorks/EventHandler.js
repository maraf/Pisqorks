var Pisqorks = window.Pisqorks || {};

Pisqorks.EventHandler = function () {
    this._events = {};
};
Pisqorks.EventHandler.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.EventHandler.prototype.AddEventListener = function (eventName, action) {
    if (this._events[eventName] == null) {
        this._events[eventName] = new Array();
    }
    this._events[eventName].push(action);
};
Pisqorks.EventHandler.prototype.RemoveEventListener = function (eventName, action) {
    if (this._events[eventName] == null) {
        return;
    }
    this._events[eventName].pop(action);
};
Pisqorks.EventHandler.prototype._RaiseEvent = function (eventName, eventArgs) {
    if (this._events[eventName] == null) {
        return;
    }
    for (var i = 0, length = this._events[eventName].length; i < length; i++) {
        this._events[eventName][i](eventArgs);
    }
};