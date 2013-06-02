var Pisqorks = window.Pisqorks || {};

// Sběrnice událostí. Umožňuje šířit a sbírat události na úrovni aplikace.
Pisqorks.EventBus = function () {
    Pisqorks.EventHandler.call(this);

};
Pisqorks.EventBus.prototype = Object.create(Pisqorks.EventHandler.prototype);

// Vyvolá předanou událost. Volitelně s argumenty.
Pisqorks.EventBus.prototype.RaiseEvent = function (eventName, eventArgs) {
    this._RaiseEvent(eventName, eventArgs);
};