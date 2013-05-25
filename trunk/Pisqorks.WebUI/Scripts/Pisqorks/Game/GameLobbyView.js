var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Account || {};

Pisqorks.Game.GameLobbyView = function (root) {
    Pisqorks.BaseObject.call(this);

    this._root = $(root);
    this.Title = "Lobby";
};
Pisqorks.Game.GameLobbyView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.GameLobbyView.prototype.Render = function (root) {
    root.html("Pisqorks lobby...");
};