var Pisqorks = window.Pisqorks || {};

// Navigátor mezi stavy aplikace.
Pisqorks.Router = function (applicationPath, eventBus) {
    Pisqorks.BaseObject.call(this);

    this._routes = new Array();
    this._eventBus = eventBus;
    this._applicationPath = this._Default(applicationPath, null);
    this._currentRoute = null;

    window.addEventListener("hashchange", this._OnNavigation.bind(this));
};
Pisqorks.Router.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Zaregistruje routu.
Pisqorks.Router.prototype.RegisterRoute = function(url, title, action) {
    this._routes.push({ Url: url, Title: title, Action: action });
};

// Naviguje na URL.
Pisqorks.Router.prototype.Navigate = function (url) {
    //this._Navigate(url, true);
    location.hash = "#" + url;
};

// Provode (prvotní) navigaci podle aktuálního stavu URL.
Pisqorks.Router.prototype.ProcessNavigation = function () {
    this._OnNavigation();
};

// Vyvoláno při požadavku na navigaci (typicky změna URL).
Pisqorks.Router.prototype._Navigate = function (url, pushState) {
    var routed = false;
    for (var i = 0, j = this._routes.length; i < j; i++) {
        if (this._routes[i].Url == url) {

            // pokud má akce unload, vyvoláme ji
            if (this._currentRoute != null && "OnUnload" in this._currentRoute.Action) {
                this._currentRoute.Action.OnUnload();
            }

            // upraví titulky v aplikaci
            document.querySelector("title").innerHTML = this._routes[i].Title + " - Pisqorks";
            document.querySelector("#sub-title").innerHTML = this._routes[i].Title;

            // provede navigaci
            var args = { Url: url, Title: this._routes[i].Title };
            if ("OnLoad" in this._routes[i].Action) {
                this._routes[i].Action.OnLoad(args);
            } else {
                this._routes[i].Action(args);
            }

            // vyvoláme globální událost navigace
            this._eventBus.RaiseEvent("Navigate", { Path: url });
            this._currentRoute = this._routes[i];

            routed = true;
            break;
        }
    }

    // přejdeme na "Nenalezeno"
    if (!routed) {
        this._Navigate("/not-found");
    }
};

// Vytvoři odkaz na URL v rámci aplikace.
Pisqorks.Router.prototype.CreateAppUrl = function (url) {
    return "#" + url;
};

// Vrací true, pokud předaná URL je aktuální.
Pisqorks.Router.prototype.IsCurrent = function (url) {
    return this._GetCurrentUrl() == url;
};

// Při navigaci - změně hash.
Pisqorks.Router.prototype._OnNavigation = function () {
    this._Navigate(this._GetCurrentUrl(), false);
};

// Vrací aktuální URL v rámci aplikace.
Pisqorks.Router.prototype._GetCurrentUrl = function () {
    var hash = "/";
    if (location.hash != "") {
        hash = location.hash.substring(1);
    }
    return hash;
};
