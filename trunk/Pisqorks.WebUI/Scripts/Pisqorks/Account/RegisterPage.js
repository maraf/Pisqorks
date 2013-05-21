var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

Pisqorks.Account.RegisterPage = function () {
    Pisqorks.BaseObject.call(this);


};
Pisqorks.Account.RegisterPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Account.RegisterPage.prototype.Initialize = function () {
    $("#register-modal")
        .on("submit", function (e) {
            e.preventDefault();

            var manager = new Pisqorks.UI.BindingManager();
            manager.UpdateModel("#register-modal", {});

            console.log(model);
        })
        .on("show", function () {
            var manager = new Pisqorks.UI.BindingManager();
            manager.BindModel("#register-modal", { SignIn: true });
        })
        .on("hidden", function () {
            if (Pisqorks.Application.Router.IsCurrent("/account/register")) {
                //Pisqorks.Application.Router.Navigate("/");
                history.go(-1);
            }
        })
        .modal({ show: false });
};
Pisqorks.Account.RegisterPage.prototype.Show = function () {
    $("#register-modal").modal('show');
};
Pisqorks.Account.RegisterPage.prototype.Hide = function () {
    $("#register-modal").modal('hide');
};