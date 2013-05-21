var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

Pisqorks.Account.AccountModule = function () {
    Pisqorks.BaseModule.call(this);

    this.LoginPage = new Pisqorks.Account.LoginPage();
    this.RegisterPage = new Pisqorks.Account.RegisterPage();

    $(function () {
        this.LoginPage.Initialize();
        this.RegisterPage.Initialize();
    }.bind(this));
};
Pisqorks.Account.AccountModule.prototype = Object.create(Pisqorks.BaseModule.prototype);

Pisqorks.Account.AccountModule.prototype.InitializeFeatures = function (features) {
    features.Optional("LocalStorage", function () { return "localStorage" in window }, "Local storage for storing persistent information about you account.");
};

Pisqorks.Account.AccountModule.prototype.InitializeNavigation = function (navbar) {
    navbar.AddButton("Sign in", "/account/login", null, true);
    navbar.AddButton("Register", "/account/register", null, true);
};
Pisqorks.Account.AccountModule.prototype.InitializeRoutes = function (router) {
    router.RegisterRoute("/account/login", "Sign in", {
        OnLoad: this.LoginPage.Show.bind(this.LoginPage),
        OnUnload: this.LoginPage.Hide.bind(this.LoginPage),
    });
    router.RegisterRoute("/account/register", "Register new account", {
        OnLoad: this.RegisterPage.Show.bind(this.RegisterPage),
        OnUnload: this.RegisterPage.Hide.bind(this.RegisterPage),
    });
};