var Pisqorks = window.Pisqorks || {};

Pisqorks.UserContext = function (authToken, username, loggedIn, eventBus) {
    Pisqorks.BaseObject.call(this);

    this._eventBus = eventBus;
    this.IsAnonymous = true;
    this.AuthToken = authToken;
    this.Username = username;
    this.LoggedIn = loggedIn;

    this._eventBus.AddEventListener("SignIn", this._OnSignIn.bind(this));
    this._eventBus.AddEventListener("SignOut", this._OnSignOut.bind(this));
};
Pisqorks.UserContext.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.UserContext.prototype._OnSignIn = function (context) {
    this.isAnonymous = false;
    this.AuthToken = context.AuthToken;
    this.Username = context.Username;
    this.LoggedIn = context.LoggedIn;
};
Pisqorks.UserContext.prototype._OnSignOut = function (context) {
    this.isAnonymous = true;

};