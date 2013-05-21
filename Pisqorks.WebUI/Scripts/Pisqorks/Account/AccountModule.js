var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

Pisqorks.Account.AccountModule = function () {
    Pisqorks.BaseModule.call(this);

    $(function () {
        $("#login-modal")
            .on("submit", function (e) {
                e.preventDefault();

                var model = {};
                var manager = new Pisqorks.UI.BindingManager();
                manager.UpdateModel("#login-modal", model);

                console.log(model);
            })
            .on("hidden", function () {
                if (Pisqorks.Application.Router.IsCurrent("/account/login")) {
                    //Pisqorks.Application.Router.Navigate("/");
                    history.go(-1);
                }
            })
            .modal({ show: false });

    });
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
        OnLoad: function () {
            $("#login-modal").modal('show');
        },
        OnUnload: function () {
            $("#login-modal").modal('hide');
        }
    });
};