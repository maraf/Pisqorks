Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

// Hlavní navigační lišta.
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

// Přidá tlačítko. Reakce na jeho klik musí být nastavena explicitně. 
// Příznak rightButton je nepovinný a udává zda má být tlačítko napravo.
Pisqorks.UI.NavigationBar.prototype.AddButton = function (title, url, icon, rightButton) {
    var li = $("<li><a href='" + this._router.CreateAppUrl(url) + "'>" + this._GetButtonHtml(icon) + title + "</a></li>");

    if (this._Default(rightButton, false)) {
        li.addClass("right");
    }

    this._container.append(li);
    return li;
};

// Přidá tlačítko, jehož klik iniciuje http request na server a získaný obsah je automaticky zobrazen v obsahu aplikace.
Pisqorks.UI.NavigationBar.prototype.AddRemoteButton = function (title, url, icon, rightButton) {
    this._router.RegisterRoute(url, title, Pisqorks.UI.NavigationBar.prototype._OnRoute.bind(this));
    this.AddButton(title, url, icon, rightButton);
};

// Při kliku na remote tlačítko, načte obsah.
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

// Vrací html šablonu pro ikonu u tlačítka. 
// Pokud je icon null nebo undefined, vrací prázdný řetězec.
Pisqorks.UI.NavigationBar.prototype._GetButtonHtml = function (icon) {
    if (this._Default(icon, null) == null) {
        return "";
    }
    return "<i class='icon-" + icon + "'></i> ";
};

// Při události navigace. Aktualizuje aktivní tlačítko na liště.
Pisqorks.UI.NavigationBar.prototype._OnNavigate = function (e) {
    this._container.find("li").removeClass("active")
    this._container.find("a[href='" + this._router.CreateAppUrl(e.Path) + "']").parent().addClass("active");
};