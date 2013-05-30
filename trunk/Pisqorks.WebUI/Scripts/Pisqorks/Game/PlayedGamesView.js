var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.PlayedGamesView = function () {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.Game.PlayedGamesView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.PlayedGamesView.prototype.Render = function (root) {
    root.html("Work in progress...");
};