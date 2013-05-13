var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameModule = function () {
    Pisqorks.BaseModule.call(this);

};
Pisqorks.Game.GameModule.prototype = Object.create(Pisqorks.BaseModule.prototype);

Pisqorks.Game.GameModule.prototype.InitializeFeatures = function (features) {

};
Pisqorks.Game.GameModule.prototype.InitializeNavigation = function (navbar) {
    navbar.AddButton("Play!", "/play", "play");
    navbar.AddButton("Statistics", "/statistics", "signal");
};
Pisqorks.Game.GameModule.prototype.InitializeRoutes = function (router) {

};