var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameLobbyView = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this._requestPool = requestPool;
    this.Title = "Lobby";
};
Pisqorks.Game.GameLobbyView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.GameLobbyView.prototype.Render = function (tab) {
    this._table = $("<table class='table table-condensed table-striped'><thead><tr><th>Player</th><th>Created</th><th>Board W</th><th>Board H</th><th>Shape</th><th></th></tr></thead><tbody></tbody></table>").appendTo(tab.Content);

    $buttons = $("<div class='control-group'><a class='btn btn-small btn-primary' href='#/play/create'>+ Create</a> <a class='btn btn-small right' href='#/play/refresh'>Refresh</a></div>").appendTo(tab.Content);
    $buttons.find("a[href='#/play/refresh']").click(this._OnRefreshClick.bind(this));

    this._LoadGames();

    $("#game-create-modal")
        .on("submit", function (e) {
            e.preventDefault();

            var model = {};
            var manager = new Pisqorks.UI.BindingManager();
            manager.UpdateModel("#game-create-modal", model);
            this._CreateGame(model);
        }.bind(this))
        .on("show", function () {
            var manager = new Pisqorks.UI.BindingManager();
            manager.BindModel("#game-create-modal", { BoardWidth: 20, BoardHeight: 20, WinningLine: 5, IsPublic: true });
        })
        .on("hidden", function () {
            if (Pisqorks.Application.Router.IsCurrent("/play/create")) {
                history.go(-1);
            }
        })
        .modal({ show: false });
};
Pisqorks.Game.GameLobbyView.prototype._OnRefreshClick = function (e) {
    e.preventDefault();
    this._LoadGames();
};
Pisqorks.Game.GameLobbyView.prototype._LoadGames = function () {
    this._table.find("tbody").html("<tr><td colspan='5'>Loading games ...</td></tr>");

    this._requestPool.Create("/api/game/lobby", "get")
        .AuthHeader(Pisqorks.Application.UserContext.AuthToken)
        .OnSuccess(this._ParseGames.bind(this))
        .Send();
};
Pisqorks.Game.GameLobbyView.prototype._ParseGames = function (result) {
    var data = JSON.parse(result.Content);
    if (data == null) {
        this._table.find("tbody").html("<tr><td colspan='5'>No games...</td></tr>");
    } else {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            data[i].Created = this._ParseDate(data[i].Created);

            html += "<tr>"
                + "<td>" + data[i].Player1.Username + "</td>"
                + "<td>" + data[i].Created.format("dd.MM.yyyy HH:mm") + "</td>"
                + "<td>" + data[i].BoardWidth + "</td>"
                + "<td>" + data[i].BoardHeight + "</td>"
                + "<td>" + data[i].Player1Shape + "</td>"
                + "<td>Action</td>"
            + "</tr>";
        }
        this._table.find("tbody").html(html);
    }
};
Pisqorks.Game.GameLobbyView.prototype.ShowCreate = function () {
    $("#game-create-modal").modal('show');
};
Pisqorks.Game.GameLobbyView.prototype.HideCreate = function () {
    $("#game-create-modal").modal('hide');
};
Pisqorks.Game.GameLobbyView.prototype._CreateGame = function (model) {
    this._requestPool.Create("/api/game/create", "post")
        .AuthHeader(Pisqorks.Application.UserContext.AuthToken)
        .OnSuccess(this._OnGameCreated.bind(this))
        .Send(JSON.stringify(model));
};
Pisqorks.Game.GameLobbyView.prototype._OnGameCreated = function (result) {
    var gameID = JSON.parse(result.Content);
    alert(gameID);
};
Pisqorks.Game.GameLobbyView.prototype._OnGameCreateError = function (result) {
    alert("Sorry, but we currently unnable to create your game!");
};