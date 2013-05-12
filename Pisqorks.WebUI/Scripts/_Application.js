var Pisqorks = window.Pisqorks || {};

Pisqorks.Application = {
    Started: false,
    Router: new Pisqorks.Router(),
    RequestPool: new Pisqorks.Http.RequestPool(),
    NavigationBar: null,
    Layout: Pisqorks.UI.Layout
};

Pisqorks.Application.Start = function () {
    if (this.Started) {
        return;
    }

    this._InitializeRoutes();
    this._InitializeRequestPool();
    this._InitializeNavigation();
    



    $("#login-modal")
        .on("submit", function(e) {
            e.preventDefault();
        })
        .on("hidden", function () {
            Pisqorks.Application.Router.Navigate("/");
        })
        .modal({ show: false });
};

Pisqorks.Application._InitializeRoutes = function () {
    this.Router.RegisterRoute("/", "Home", function () {
        Pisqorks.Application.Layout.Content().html("Going to home!");
    });
    this.Router.RegisterRoute("/account/login", "Sign in", function () {
        $("#login-modal").modal('show');
    });
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
    this.NavigationBar = new Pisqorks.UI.NavigationBar(".navbar ul.nav", this.Layout, this.Router, this.RequestPool);

    this.NavigationBar.AddButton("Home", "/", "home");
    this.NavigationBar.AddRemoteButton("About", "/about", null);
    this.NavigationBar.AddButton("Sign in", "/account/login", null, true);
};