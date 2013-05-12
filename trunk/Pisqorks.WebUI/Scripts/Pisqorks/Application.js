var Pisqorks = window.Pisqorks || {};

Pisqorks.Application = {
    Started: false,
    Layout: Pisqorks.UI.Layout,
    FeatureRequest: new Pisqorks.FeatureRequest(),
    EventBus: new Pisqorks.EventBus(),
    Router: null,
    RequestPool: new Pisqorks.Http.RequestPool(),
    NavigationBar: null,
    Modules: {
        Account: new Pisqorks.Account.AccountModule()
    }
};

Pisqorks.Application.Start = function () {
    if (this.Started) {
        return;
    }

    this._InitializeFeatures();
    if (this._CheckFeatures()) {
        this._InitializeRoutes();
        this._InitializeRequestPool();
        this._InitializeNavigation();
        $(".all").removeClass("hide");

        
    }
};

Pisqorks.Application._RunInModules = function(funcName, params) {
    for (var module in this.Modules) {
        this.Modules[module][funcName].apply(this.Modules[module], params);
    }
}

Pisqorks.Application._InitializeFeatures = function () {
    //this.FeatureRequest.Require("TEST", function () { return false }, "Some testing feature that is always missing.");
    this.FeatureRequest.Require("History", function () { return "history" in window }, "History API for navigating betweent application states.");
    this._RunInModules("InitializeFeatures", [this.FeatureRequest]);
};
Pisqorks.Application._CheckFeatures = function () {
    var result = this.FeatureRequest.Check();
    if (!result.Required) {
        var html = "";
        for (var i = 0, length = result.Missing.length; i < length; i++) {
            html += "<li>" + result.Missing[i].Message + "</li>";
        }
        $("#feature-missinglist").html(html);
        $("#feature-modal").modal({ keyboard: false });
        return false;
    }
    return true;
};

Pisqorks.Application._InitializeRoutes = function () {
    this.Router = new Pisqorks.Router(null, this.EventBus);

    this.Router.RegisterRoute("/", "Home", function () {
        Pisqorks.Application.Layout.Content().html("Going to home!");
    });
    this._RunInModules("InitializeRoutes", [this.Router]);
};

Pisqorks.Application._InitializeRequestPool = function () {
    this.RequestPool.AddEventListener("loading", Pisqorks.Application._OnLoading.bind(this));
    this.RequestPool.AddEventListener("success", Pisqorks.Application._OnLoaded.bind(this));
    this.RequestPool.AddEventListener("error", Pisqorks.Application._OnLoaded.bind(this));
};
Pisqorks.Application._OnLoading = function () {
    this.Layout.Loading().removeClass("hide");
};
Pisqorks.Application._OnLoaded = function () {
    this.Layout.Loading().addClass("hide");
};

Pisqorks.Application._InitializeNavigation = function () {
    this.NavigationBar = new Pisqorks.UI.NavigationBar(".navbar ul.nav", this.Layout, this.Router, this.RequestPool, this.EventBus);

    this.NavigationBar.AddButton("Home", "/", "home");
    this.NavigationBar.AddRemoteButton("About", "/about", null);

    this._RunInModules("InitializeNavigation", [this.NavigationBar]);
};