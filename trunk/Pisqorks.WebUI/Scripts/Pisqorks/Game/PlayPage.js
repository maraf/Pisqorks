var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.PlayPage = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this.rendered = false;
    this._tabLastID = 1;

    this.LobbyView = new Pisqorks.Game.GameLobbyView(requestPool);

    //TODO: Load current games
};
Pisqorks.Game.PlayPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.PlayPage.prototype.Render = function (root) {
    if (!this.rendered) {
        this._tabs = $("<div class='tabbable'><ul class='nav nav-tabs'></ul><div class='tab-content'></div></div>").appendTo(root);
        this.LobbyView.Render(this._CreateTab(this.LobbyView.Title, true, true));

        this.rendered = true;
    }
};
Pisqorks.Game.PlayPage.prototype._CreateTab = function (title, active, right) {
    var id = this._tabLastID++;
    var $li = $(
        "<li class='"
        + (this._Default(right, false) ? "right" : "")
        + (active ? ' active' : '')
        + "'><a href='#tab"
        + id + "' data-toggle='tab'>"
        + title + "</a></li>"
    ).appendTo(this._tabs.find("ul"));
    var $content = $(
        "<div class='tab-pane"
        + (active ? ' active' : '')
        + "' id='tab"
        + id
        + "'></div>"
    ).appendTo(this._tabs.find("div.tab-content"));

    return { Tab: $li, Content: $content };
};