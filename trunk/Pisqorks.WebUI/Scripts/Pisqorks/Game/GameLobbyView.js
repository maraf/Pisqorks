var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Account || {};

Pisqorks.Game.GameLobbyView = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this._requestPool = requestPool;
    this.Title = "Lobby";
};
Pisqorks.Game.GameLobbyView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.GameLobbyView.prototype.Render = function (root) {
    this._table = $("<table class='table table-condensed table-striped'><thead><tr><th>Player</th><th>Created</th><th>Board W</th><th>Board H</th><th>Shape</th><th></th></tr></thead><tbody></tbody></table>").appendTo(root);

    $buttons = $("<div class='control-group'><a class='btn btn-small btn-primary' href='#/play/create'>+ Create</a> <a class='btn btn-small right' href='#/play/refresh'>Refresh</a></div>").appendTo(root);
    $buttons.find("a[href='#/play/refresh']").click(this._OnRefreshClick.bind(this));

    this._LoadGames();
};
Pisqorks.Game.GameLobbyView.prototype._OnRefreshClick = function (e) {
    this._LoadGames();
    e.preventDefault();
};
Pisqorks.Game.GameLobbyView.prototype._LoadGames = function () {
    this._table.find("tbody").html("<tr><td colspan='5'>Loading games ...</td></tr>");

    this._requestPool.Create("/api/game/lobby", "get").Send();
};