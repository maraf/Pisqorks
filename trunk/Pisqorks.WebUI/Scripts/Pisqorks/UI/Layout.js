Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

// Usnadňuje a zobecňuje přístup k html prvkům na stránce
Pisqorks.UI.Layout = {
    _Elements: {},
    _TryGet: function(selector) {
        if (this._Elements[selector] == null) {
            this._Elements[selector] = $(selector);
        }
        return this._Elements[selector];
    },

    Content: function () {
        return this._TryGet(".content-body");
    },
    Loading: function () {
        return this._TryGet(".loading");
    },
};