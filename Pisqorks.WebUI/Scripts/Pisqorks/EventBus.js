var Pisqorks = window.Pisqorks || {};

Pisqorks.EventBus = function () {
    Pisqorks.EventHandler.call(this);

};
Pisqorks.EventBus.prototype = Object.create(Pisqorks.EventHandler.prototype);

Pisqorks.EventBus.prototype.RaiseEvent = function (eventName, eventArgs) {
    this._RaiseEvent(eventName, eventArgs);
};