var Pisqorks = window.Pisqorks || {};
Pisqorks.Http = window.Pisqorks.Http || {};

Pisqorks.Http.HttpRequest = function (url, method) {
    Pisqorks.EventHandler.call(this);

    this._sent = false;

    this._xhr = new XMLHttpRequest();
    this._xhr.addEventListener("readystatechange", this._ReadyStateChange.bind(this));
    this._xhr.open(this._Default(method, "get"), url, true);
    this._timestamp = Date.now();
};
Pisqorks.Http.HttpRequest.prototype = Object.create(Pisqorks.EventHandler.prototype);


Pisqorks.Http.HttpRequest.prototype.Send = function (data) {
    if (!this._sent) {
        this._sent = true;
        this._timestamp = Date.now();
        this._xhr.send(data);
    }
};
Pisqorks.Http.HttpRequest.prototype._ReadyStateChange = function (e) {
    if (this._xhr.readyState == 1) {
        this._RaiseEvent("opened");
    } else if (this._xhr.readyState == 3) {
        this._RaiseEvent("loading");
    } else if (this._xhr.readyState == 4) {
        var took = Date.now() - this._timestamp;
        if (this._xhr.status == 200) {
            this._RaiseEvent("success", { Content: this._xhr.responseText, Took: took });
        } else {
            this._RaiseEvent("error", { Content: this._xhr.responseText, Took: took, Status: this._xhr.status, StatusText: this._xhr.statusText });
        }
    }
};