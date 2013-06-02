var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

// Zobrazuje informaci o aktuálním uživateli.
Pisqorks.Account.UserInfoView = function (root) {
    Pisqorks.BaseObject.call(this);

    this._root = $(root);
};
Pisqorks.Account.UserInfoView.prototype = Object.create(Pisqorks.BaseObject.prototype);

Pisqorks.Account.UserInfoView.prototype.Update = function (context) {
    if (context.IsAuthenticated) {
        this._root.html("<strong>" + context.Username + "</strong><br />" + (context.IsAnonymous ? "Created at" : "Logged in") + " " + context.LoggedIn.format("dd.MM.yyyy HH:mm"));
    } else {
        this._root.html("");
    }
};