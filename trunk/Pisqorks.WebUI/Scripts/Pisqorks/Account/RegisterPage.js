var Pisqorks = window.Pisqorks || {};
Pisqorks.Account = window.Pisqorks.Account || {};

// Registrační dialog.
Pisqorks.Account.RegisterPage = function (requestPool) {
    Pisqorks.BaseObject.call(this);

    this._requestPool = requestPool;
};
Pisqorks.Account.RegisterPage.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.Account.RegisterPage.prototype.Initialize = function () {
    $("#register-modal")
        .on("submit", this._OnRegister.bind(this))
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
Pisqorks.Account.RegisterPage.prototype._OnRegister = function () {
    e.preventDefault();

    // Posbírá data
    var model = {};
    var manager = new Pisqorks.UI.BindingManager();
    manager.UpdateModel("#register-modal", model);

    //this._requestPool.Create("/api/account/register", "post")
    //    .OnSuccess()
    //    .Send(JSON.stringify(model));
};
Pisqorks.Account.RegisterPage.prototype._OnRegisterDone = function (result) {
    //var data = JSON.parse(result);
    //if (!data.Success) {
    //    alert("Registration was no successfull");
    //} else {

    //}
};