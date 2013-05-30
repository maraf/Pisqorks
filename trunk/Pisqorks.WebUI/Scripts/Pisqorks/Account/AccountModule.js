var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

Pisqorks.Account.AccountModule = function (eventBus, requestPool, userContext) {
    Pisqorks.BaseModule.call(this);

    this._anonymButtons = [];
    this._userButtons = [];
    this._eventBus = eventBus;
    this._requestPool = requestPool;
    this._userContext = userContext;
    this.LoginPage = new Pisqorks.Account.LoginPage();
    this.RegisterPage = new Pisqorks.Account.RegisterPage();
    this.UserInfoView = new Pisqorks.Account.UserInfoView("#user-info-view");
};
Pisqorks.Account.AccountModule.prototype = Object.create(Pisqorks.BaseModule.prototype);

Pisqorks.Account.AccountModule.prototype.InitializeFeatures = function (features) {
    this._features = features;
    this._features.Optional("LocalStorage", function () { return "localStorage" in window }, "Local storage for storing persistent information about you account.");
};

Pisqorks.Account.AccountModule.prototype.InitializeNavigation = function (navbar) {
    this._anonymButtons.push(navbar.AddButton("Sign in", "/account/login", null, true));
    this._anonymButtons.push(navbar.AddButton("Register", "/account/register", null, true));

    this._userButtons.push(navbar.AddButton("Edit account", "/account", null, true));

    var handler = this._OnSignIn.bind(this);
    this._eventBus.AddEventListener("SignIn", handler);
    this._eventBus.AddEventListener("SignOut", handler);
    this._OnSignIn({ IsAuthneticated: false, IsAnonymous: false });
};
Pisqorks.Account.AccountModule.prototype._OnSignIn = function (context) {
    var anonymButton = true;
    var userButton = false;
    if (context.IsAuthneticated) {
        if (!context.IsAnonymous) {
            userButton = true;
            anonymButton = false;
        }
        
        if (this._features.Check("LocalStorage")) {
            localStorage.setItem("authToken", context.AuthToken);
        }
    }

    for (var i = 0; i < this._anonymButtons.length; i++) {
        if (anonymButton) {
            this._anonymButtons[i].removeClass("hide");
        } else {
            this._anonymButtons[i].addClass("hide");
        }
    }
    for (var i = 0; i < this._userButtons.length; i++) {
        if (userButton) {
            this._userButtons[i].removeClass("hide");
        } else {
            this._userButtons[i].addClass("hide");
        }
    }
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
Pisqorks.Account.AccountModule.prototype.Run = function () {
    this.LoginPage.Initialize();
    this.RegisterPage.Initialize();
};
Pisqorks.Account.AccountModule.prototype.LoadUserState = function (callback) {
    var onSuccess = function (result) {
        this._OnLoadUserState(result);
        callback();
    }.bind(this);

    if (this._features.Check("LocalStorage")) {
        var value = localStorage.getItem("authToken");
        if (value != null) {
            this._requestPool
                .Create("/api/account/info", "get")
                .OnSuccess(onSuccess)
                .OnError(function () {
                    this._requestPool
                        .Create("/api/account/anonymous", "post")
                        .OnSuccess(onSuccess)
                        .Send();
                }.bind(this))
                .AuthHeader(value)
                .Send();

            return;
        }
    }

    this._requestPool
        .Create("/api/account/anonymous", "post")
        .OnSuccess(onSuccess)
        .Send();
};
Pisqorks.Account.AccountModule.prototype._OnLoadUserState = function (result) {
    var context = JSON.parse(result.Content);
    context.LoggedIn = this._ParseDate(context.LoggedIn)

    this._eventBus.RaiseEvent("SignIn", context);
    this.UserInfoView.Update(this._userContext);
};