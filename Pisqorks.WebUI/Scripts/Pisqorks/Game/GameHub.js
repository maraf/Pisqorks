﻿var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

// Herní hub, obaluje SignalR hub a umožňuje ho využít pro více her najednou.
Pisqorks.Game.GameHub = function (callback) {
    Pisqorks.BaseObject.call(this);

    this._boards = {};

    this._hub = $.connection.gameHub;
    //TODO: Define functions...
    this._hub.client.startGame = this._StartGame.bind(this);
    this._hub.client.initialize = this._InitializeGame.bind(this);
    this._hub.client.moved = this._Moved.bind(this);
    this._hub.client.winner = this._Winner.bind(this);
    this._hub.client.invalid = this._Invalid.bind(this);

    $.connection.hub.start().done(callback);
    //TODO: Pri kliku na policko, zobrazit jen "loading" na te pozici a potvrdit az prijetim ze serveru
};
Pisqorks.Game.GameHub.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Zaregistruje hru.
Pisqorks.Game.GameHub.prototype.Register = function (gameID, view) {
    this._boards[gameID] = view;
    this._hub.server.playerConnected(gameID, Pisqorks.Application.UserContext.AuthToken);
};

// Při startu hry.
Pisqorks.Game.GameHub.prototype._StartGame = function (gameID, userName2, canPlay) {
    this._boards[gameID]._StartGame(userName2, canPlay);
};

// Při inicializaci hry.
Pisqorks.Game.GameHub.prototype._InitializeGame = function (gameID, width, height, winningLine, shape) {
    this._boards[gameID]._InitializeGame(width, height, winningLine, shape);
};

// Odešle tah.
Pisqorks.Game.GameHub.prototype.Move = function (gameID, x, y) {
    this._hub.server.move(gameID, Pisqorks.Application.UserContext.AuthToken, x, y);
};

// Při schválení tahu.
Pisqorks.Game.GameHub.prototype._Moved = function (gameID, shape, x, y) {
    this._boards[gameID]._Moved(shape, x, y);
};

// Při ukončení hry.
Pisqorks.Game.GameHub.prototype._Winner = function (gameID, shape) {
    this._boards[gameID]._Winner(shape);
};

// Při odepření posledního tahu.
Pisqorks.Game.GameHub.prototype._Invalid = function (gameID) {
    this._boards[gameID]._Invalid();
};