var Pisqorks = window.Pisqorks || {};

Pisqorks.Router = function (applicationPath, eventBus) {
    Pisqorks.BaseObject.call(this);

    this._routes = new Array();
    this._eventBus = eventBus;
    this._applicationPath = this._Default(applicationPath, null);
    this._currentRoute = null;

    window.addEventListener("hashchange", this._OnNavigation.bind(this));
};
Pisqorks.Router.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Router.prototype.RegisterRoute = function(url, title, action) {
    this._routes.push({ Url: url, Title: title, Action: action });
};
Pisqorks.Router.prototype.Navigate = function (url) {
    //this._Navigate(url, true);
    location.hash = "#" + url;
};
Pisqorks.Router.prototype.ProcessNavigation = function () {
    this._OnNavigation();
};
Pisqorks.Router.prototype._Navigate = function (url, pushState) {
    var routed = false;
    for (var i = 0, j = this._routes.length; i < j; i++) {
        if (this._routes[i].Url == url) {
            if (this._currentRoute != null && "OnUnload" in this._currentRoute.Action) {
                this._currentRoute.Action.OnUnload();
            }

            document.querySelector("title").innerHTML = this._routes[i].Title + " - Pisqorks";
            document.querySelector("#sub-title").innerHTML = this._routes[i].Title;

            //history.pushState(null, this._routes[i].Title, url);
            location.hash = "#" + url;
            var args = { Url: url, Title: this._routes[i].Title };
            if ("OnLoad" in this._routes[i].Action) {
                this._routes[i].Action.OnLoad(args);
            } else {
                this._routes[i].Action(args);
            }

            this._eventBus.RaiseEvent("Navigate", { Path: url });
            this._currentRoute = this._routes[i];

            routed = true;
            break;
        }
    }

    if (!routed) {
        this._Navigate("/not-found");
    }
};
Pisqorks.Router.prototype.CreateAppUrl = function (url) {
    return "#" + url;
};
Pisqorks.Router.prototype.IsCurrent = function (url) {
    return this._GetCurrentUrl() == url;
};
Pisqorks.Router.prototype._OnNavigation = function () {
    this._Navigate(this._GetCurrentUrl(), false);
};
Pisqorks.Router.prototype._GetCurrentUrl = function () {
    var hash = "/";
    if (location.hash != "") {
        hash = location.hash.substring(1);
    }
    return hash;
};
