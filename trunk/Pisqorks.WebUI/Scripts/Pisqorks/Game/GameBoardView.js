var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameBoardView = function () {
    Pisqorks.BaseObject.call(this);

    this.Title = "Lobby";
};
Pisqorks.Game.GameBoardView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.GameBoardView.prototype.Render = function (root) {
    this._root = $(root);

};