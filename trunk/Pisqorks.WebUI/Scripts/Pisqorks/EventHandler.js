var Pisqorks = window.Pisqorks || {};

// Bázová třída pro objekt, který umožňuje práci s vlastními událostmi.
Pisqorks.EventHandler = function () {
    Pisqorks.BaseObject.call(this);

    this._events = {};
};
Pisqorks.EventHandler.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Navěsí posluchače na událost.
Pisqorks.EventHandler.prototype.AddEventListener = function (eventName, action) {
    if (this._events[eventName] == null) {
        this._events[eventName] = new Array();
    }
    this._events[eventName].push(action);
};

// Odvěsí posluchače z události.
Pisqorks.EventHandler.prototype.RemoveEventListener = function (eventName, action) {
    if (this._events[eventName] == null) {
        return;
    }
    this._events[eventName].pop(action);
};

// Vyvolá událost.
Pisqorks.EventHandler.prototype._RaiseEvent = function (eventName, eventArgs) {
    if (this._events[eventName] == null) {
        return;
    }
    for (var i = 0, length = this._events[eventName].length; i < length; i++) {
        this._events[eventName][i](eventArgs);
    }
};