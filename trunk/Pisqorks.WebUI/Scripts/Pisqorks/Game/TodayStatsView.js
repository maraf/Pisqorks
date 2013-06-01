var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.TodayStatsView = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this._requestPool = requestPool;
};
Pisqorks.Game.TodayStatsView.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.TodayStatsView.prototype.Render = function (root) {
    this._root = root;
    this._root.html("Loading data...");

    this._requestPool.Create("/api/game/today-stats", "get")
        .AuthHeader(Pisqorks.Application.UserContext.AuthToken)
        .OnSuccess(this._RenderData.bind(this))
        .Send();
};
Pisqorks.Game.TodayStatsView.prototype._RenderData = function (result) {
    var data = JSON.parse(result.Content);
    if (data != null) {
        var html = ''
            + '<ul class="stats-legend">'
                + '<li><i></i> Wins</li>'
                + '<li><i></i> Loses</li>'
                + '<li><i></i> Unfinished</li>'
            + '</ul>';
        this._root.html(html);


        var pieChart = new Pisqorks.UI.PieChart();
        pieChart.PrepareData([data.Wins, data.Loses, data.Unfinished], ["blue", "red", "green"]);
        pieChart.Render(this._root);
    } else {
        this._root.html('Unnable to ');
    }
};