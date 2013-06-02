var Pisqorks = window.Pisqorks || {};
Pisqorks.Http = window.Pisqorks.Http || {};

// Továrna na šíťová volání.
Pisqorks.Http.RequestPool = function () {
    Pisqorks.EventHandler.call(this);
    
};
Pisqorks.Http.RequestPool.prototype = Object.create(Pisqorks.EventHandler.prototype);

// Vytvoří síťové volání.
Pisqorks.Http.RequestPool.prototype.Create = function (url, method) {
    var request = new Pisqorks.Http.HttpRequest(url, method);
    request.AddEventListener("loading", Pisqorks.Http.RequestPool.prototype._OnLoading.bind(this));
    request.AddEventListener("success", Pisqorks.Http.RequestPool.prototype._OnSuccess.bind(this));
    request.AddEventListener("error", Pisqorks.Http.RequestPool.prototype._OnError.bind(this));
    request.Header("Content-type", "application/json");
    return request;
};

// Vyvolá událost loading.
Pisqorks.Http.RequestPool.prototype._OnLoading = function () {
    this._RaiseEvent("loading");
};

// Vyvolá událost success.
Pisqorks.Http.RequestPool.prototype._OnSuccess = function (e) {
    this._RaiseEvent("success", e);
};

// Vyvolá událost error.
Pisqorks.Http.RequestPool.prototype._OnError = function (e) {
    this._RaiseEvent("error", e);
};