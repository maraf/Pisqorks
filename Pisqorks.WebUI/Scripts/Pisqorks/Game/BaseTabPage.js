var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

// Bázová třída zobrazující záložky.
Pisqorks.Game.BaseTabPage = function () {
    Pisqorks.BaseObject.call(this);

    this._tabLastID = 1;
};
Pisqorks.Game.BaseTabPage.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Vytvoří základ pro záložky.
Pisqorks.Game.BaseTabPage.prototype._CreateRoot = function (root) {
    this._tabs = $("<div class='tabbable'><ul class='nav nav-tabs'></ul><div class='tab-content'></div></div>").appendTo(root);
    return this._tabs;
};

// Vytvoří a přídá záložku. Vrací objekt obsahující Tab a Content
Pisqorks.Game.BaseTabPage.prototype._CreateTab = function (title, active, right) {
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