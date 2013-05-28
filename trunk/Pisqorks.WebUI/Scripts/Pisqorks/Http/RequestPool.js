var Pisqorks = window.Pisqorks || {};
Pisqorks.Http = window.Pisqorks.Http || {};

Pisqorks.Http.RequestPool = function () {
    Pisqorks.EventHandler.call(this);
    
};
Pisqorks.Http.RequestPool.prototype = Object.create(Pisqorks.EventHandler.prototype);

Pisqorks.Http.RequestPool.prototype.Create = function (url, method) {
    var request = new Pisqorks.Http.HttpRequest(url, method);
    request.AddEventListener("loading", Pisqorks.Http.RequestPool.prototype._OnLoading.bind(this));
    request.AddEventListener("success", Pisqorks.Http.RequestPool.prototype._OnSuccess.bind(this));
    request.AddEventListener("error", Pisqorks.Http.RequestPool.prototype._OnError.bind(this));
    request.Header("Content-type", "application/json");
    return request;
};
Pisqorks.Http.RequestPool.prototype._OnLoading = function () {
    this._RaiseEvent("loading");
};
Pisqorks.Http.RequestPool.prototype._OnSuccess = function (e) {
    this._RaiseEvent("success", e);
};
Pisqorks.Http.RequestPool.prototype._OnError = function (e) {
    this._RaiseEvent("error", e);
};