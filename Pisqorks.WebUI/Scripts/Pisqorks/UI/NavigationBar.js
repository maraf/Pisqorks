Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

Pisqorks.UI.NavigationBar = function (selector, layout, router, requestPool, eventBus) {
    Pisqorks.BaseObject.call(this);

    this._container = $(selector);
    this._layout = layout;
    this._router = router;
    this._requestPool = requestPool;
    this._eventBus = eventBus;

    this._eventBus.AddEventListener("Navigate", this._OnNavigate.bind(this));
};
Pisqorks.UI.NavigationBar.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.UI.NavigationBar.prototype.AddButton = function (title, url, icon, rightButton) {
    var li = $("<li><a href='" + this._router.CreateAppUrl(url) + "'>" + this._GetButtonHtml(icon) + title + "</a></li>");

    if (this._Default(rightButton, false)) {
        li.addClass("right");
    }
    //li.find("a").click(this._ButtonClick.bind(this));

    this._container.append(li);
    return li;
};
Pisqorks.UI.NavigationBar.prototype.AddRemoteButton = function (title, url, icon, rightButton) {
    this._router.RegisterRoute(url, title, Pisqorks.UI.NavigationBar.prototype._OnRoute.bind(this));
    this.AddButton(title, url, icon, rightButton);
};
Pisqorks.UI.NavigationBar.prototype._OnRoute = function (e) {
    var content = this._layout.Content();

    this._requestPool
        .Create("/content" + e.Url)
        .OnSuccess(function (data) {
            content.html(data.Content);
        })
        .OnError(function (data) {
            content.html("Sorry, but we are unnable to load this page!");
        })
        .Send();
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
Pisqorks.UI.NavigationBar.prototype._OnNavigate = function (e) {
    this._container.find("li").removeClass("active")
    this._container.find("a[href='" + this._router.CreateAppUrl(e.Path) + "']").parent().addClass("active");
};