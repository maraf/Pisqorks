var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameModule = function () {
    Pisqorks.BaseModule.call(this);

    $(function() {
        this._playPageRoot = $("<div id='play-page'></div>");
        this.PlayPage = new Pisqorks.Game.PlayPage(this._playPageRoot);
    }.bind(this))
};
Pisqorks.Game.GameModule.prototype = Object.create(Pisqorks.BaseModule.prototype);

Pisqorks.Game.GameModule.prototype.InitializeFeatures = function (features) {

};
Pisqorks.Game.GameModule.prototype.InitializeNavigation = function (navbar) {
    navbar.AddButton("Play!", "/play", "play");
    navbar.AddButton("Statistics", "/statistics", "signal");
};
Pisqorks.Game.GameModule.prototype.InitializeRoutes = function (router) {
    router.RegisterRoute("/play", "Play!", {
        OnLoad: this._OnPlayLoad.bind(this),
        UnOnload: this._OnPlayUnload.bind(this)
    });
};
Pisqorks.Game.GameModule.prototype._OnPlayLoad = function () {
    $(".content-body").html("");
    this._playPageRoot.appendTo($(".content-body"));
};
Pisqorks.Game.GameModule.prototype._OnPlayUnload = function () {
    this._playPageRoot.remove();
};