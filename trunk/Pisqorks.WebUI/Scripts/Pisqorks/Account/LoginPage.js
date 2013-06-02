var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

// Přihlašovací dialog.
Pisqorks.Account.LoginPage = function () {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.Account.LoginPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Account.LoginPage.prototype.Initialize = function () {
    $("#login-modal")
        .on("submit", function (e) {
            e.preventDefault();

            var model = {};
            var manager = new Pisqorks.UI.BindingManager();
            manager.UpdateModel("#login-modal", model);

            console.log(model);
        })
        .on("show", function () {

            setTimeout(function () { $("#login-modal").find("input[type=text]").first().focus(); }, 100);
        })
        .on("hidden", function () {

            if (Pisqorks.Application.Router.IsCurrent("/account/login")) {
                history.go(-1);
            }
        })
        .modal({ show: false });
};
Pisqorks.Account.LoginPage.prototype.Show = function () {
    $("#login-modal").modal('show');
};
Pisqorks.Account.LoginPage.prototype.Hide = function () {
    $("#login-modal").modal('hide');
};