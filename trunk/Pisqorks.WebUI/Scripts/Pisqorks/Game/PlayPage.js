var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Account || {};

Pisqorks.Game.PlayPage = function (root) {
    Pisqorks.BaseObject.call(this);

    this._tabLastID = 1;
    this._root = $(root);
    this._Render();

    this.LobbyView = new Pisqorks.Game.GameLobbyView();
    this.LobbyView.Render(this._CreateRightTab(this.LobbyView.Title, true));

    //TODO: Load current games
};
Pisqorks.Game.PlayPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Game.PlayPage.prototype._Render = function () {
    this._tabs = $("<div class='tabbable'><ul class='nav nav-tabs'></ul><div class='tab-content'></div></div>").appendTo(this._root);


};
Pisqorks.Game.PlayPage.prototype._CreateRightTab = function(title, active) {
    var id = this._tabLastID++;
    $("<li class='right" + (active ? ' active' : '') + "'><a href='#tab" + id + "' data-toggle='tab'>" + title + "</a></li>").appendTo(this._tabs.find("ul"));
    return $("<div class='tab-pane" + (active ? ' active' : '') + "' id='tab" + id + "'></div>").appendTo(this._tabs.find("div.tab-content"));
};