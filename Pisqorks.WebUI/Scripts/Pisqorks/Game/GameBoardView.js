var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameBoardView = function (gameID, requestPool) {
    Pisqorks.EventHandler.call(this);

    this._gameID = gameID;
    this._requestPool = requestPool;
    this._canPlay = false;
    this._SetTitle("Waiting...");
};
Pisqorks.Game.GameBoardView.prototype = Object.create(Pisqorks.EventHandler.prototype);
Pisqorks.Game.GameBoardView.prototype._SetTitle = function (title) {
    this.Title = title;
    this._RaiseEvent("TitleChanged", title);
};
Pisqorks.Game.GameBoardView.prototype.Render = function (root) {
    this._root = $(root);


    this.hub = $.connection.GameHub;
    //TODO: Define functions...
    this.hub.startGame = this._StartGame.bind(this);
    this.hub.moved = function (cid, x, y) { /* TODO: When player moved... */ };

    //TODO: Pri kliku na policko, zobrazit jen "loading" na te pozici a potvrdit az prijetim ze serveru

    $.connection.hub.start().done(function () {
        hub.playerConnected(this._gameID, Pisqorks.Application.UserContext.AuthToken);
    }.bind(this));
};
Pisqorks.Game.GameBoardView.prototype._StartGame = function (userName2, nextPlayer) {
    this._SetTitle("vs " + userName2);

    //TODO: Setup can play
    this._ChangeCanPlay(userName2 != nextPlayer);
};


Pisqorks.Game.GameBoardView.prototype._ChangeCanPlay = function (val) {
    this._canPlay = val;
    //TODO: Update status --- SetStatus(val ? 'You move ...' : 'Waiting for oponents move ...');
};

//   HUB
// - stahnout status hry
// - priradit hrace
// - stahnout existujici data
// - provest tah (pokud jsem na rade) => zpracovat novy status
//
// - STATUS
//   - Waiting oponent
//   - Active
//   - Closed
//   - 