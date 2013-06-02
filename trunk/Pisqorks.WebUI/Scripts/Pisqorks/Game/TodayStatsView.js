var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

// Zobrazení grafu s dnes odehranými hrami.
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
                + '<li><i></i> Wins: ' + data.Wins + '</li>'
                + '<li><i></i> Loses: ' + data.Loses + '</li>'
                + '<li><i></i> Unfinished: ' + data.Unfinished + '</li>'
            + '</ul>';
        this._root.html(html);


        var pieChart = new Pisqorks.UI.PieChart();
        pieChart.PrepareData([data.Wins, data.Loses, data.Unfinished], ["#90E390", "#FA8383", "#D8E8FF", "#649864", "#BC2727", "#A2ADBF"]);
        pieChart.Render(this._root);
    } else {
        this._root.html('Unnable to ');
    }
};