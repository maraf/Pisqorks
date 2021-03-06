﻿var Pisqorks = window.Pisqorks || {};
Pisqorks.Http = window.Pisqorks.Http || {};

// Obalová třída na XMLHttpRequest.
Pisqorks.Http.HttpRequest = function (url, method) {
    Pisqorks.EventHandler.call(this);

    this._sent = false;

    this._xhr = new XMLHttpRequest();
    this._xhr.addEventListener("readystatechange", this._ReadyStateChange.bind(this));
    this._xhr.open(this._Default(method, "get"), url, true);
    this._timestamp = Date.now();
};
Pisqorks.Http.HttpRequest.prototype = Object.create(Pisqorks.EventHandler.prototype);

// Odešle požadavek.
Pisqorks.Http.HttpRequest.prototype.Send = function (data) {
    if (!this._sent) {
        this._sent = true;
        this._timestamp = Date.now();
        this._xhr.send(data);
    }
};

// Přidá delegáta vyvolaného při úspěšném volání serveru.
Pisqorks.Http.HttpRequest.prototype.OnSuccess = function (func) {
    this.AddEventListener("success", func);
    return this;
};

// Přidá delegáta vyvolaného při neúspěšném volání serveru.
Pisqorks.Http.HttpRequest.prototype.OnError = function (func) {
    this.AddEventListener("error", func);
    return this;
};

// Nastaví hlavičku požadavku.
Pisqorks.Http.HttpRequest.prototype.Header = function (name, value) {
    this._xhr.setRequestHeader(name, value);
    return this;
};

// Nastaví autentizační hlavičku požadavku.
Pisqorks.Http.HttpRequest.prototype.AuthHeader = function (value) {
    this.Header("X-AuthToken", value);
    return this;
};

// Při interní změně XMLHttpRequestu.
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