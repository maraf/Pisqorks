Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

Pisqorks.UI.NavigationBar = function (selector, router) {
    this._container = $(selector);
    this._router = router;
};
Pisqorks.UI.NavigationBar.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.UI.NavigationBar.prototype.AddButton = function (title, url, icon, rightButton) {
    var li = $("<li><a href='" + url + "'>" + this._GetButtonHtml(icon) + title + "</a></li>");

    if (this._Default(rightButton, false)) {
        li.addClass("nav-right");
    }
    li.find("a").click(this._ButtonClick.bind(this));

    this._container.append(li);
    return li;
};
Pisqorks.UI.NavigationBar.prototype._ButtonClick = function (e) {
    this._router.Navigate(e.currentTarget.href.substr(location.origin.length));
    e.preventDefault();
};
Pisqorks.UI.NavigationBar.prototype._GetButtonHtml = function (icon) {
    if (this._Default(icon, null) == null) {
        return "";
    }
    return "<i class='icon-" + icon + "'></i> ";
};