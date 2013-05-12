var Pisqorks = window.Pisqorks || {};

Pisqorks.Router = function (applicationPath) {
    this._routes = new Array();
    this._applicationPath = this._Default(applicationPath, null);

    window.addEventListener("popstate", this._PopState.bind(this));
};
Pisqorks.Router.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Router.prototype.RegisterRoute = function(url, title, action) {
    this._routes.push({ Url: url, Title: title, Action: action });
};
Pisqorks.Router.prototype.Navigate = function (url) {
    for (var i = 0, j = this._routes.length; i < j; i++) {
        if (this._routes[i].Url == url) {
            document.querySelector("title").innerHTML = this._routes[i].Title + " - Pisqorks";
            document.querySelector("#sub-title").innerHTML = this._routes[i].Title;

            history.pushState(null, this._routes[i].Title, url);
            this._routes[i].Action();
        }
    }
};

Pisqorks.Router.prototype._PopState = function () {
    this.Navigate(location.pathname);
};