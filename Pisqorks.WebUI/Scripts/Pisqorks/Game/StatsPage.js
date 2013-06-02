var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

// Stránky se statistikami.
Pisqorks.Game.StatsPage = function (requestPool) {
    Pisqorks.Game.BaseTabPage.call(this);

    this._tabLastID = 1;
    this._requestPool = requestPool;

    this.PlayedGamesView = new Pisqorks.Game.PlayedGamesView(requestPool);
    this.TodayStatsView = new Pisqorks.Game.TodayStatsView(requestPool);
};
Pisqorks.Game.StatsPage.prototype = Object.create(Pisqorks.Game.BaseTabPage.prototype);
Pisqorks.Game.StatsPage.prototype.Render = function (root) {
    this._CreateRoot(root);

    var tab = this._CreateTab("Played games", true);
    this.PlayedGamesView.Render(tab.Content);

    var tab2 = this._CreateTab("Today stats");
    tab2.Tab.find("a").on('shown', function (e) {
        this.TodayStatsView.Render(tab2.Content);
    }.bind(this));
};