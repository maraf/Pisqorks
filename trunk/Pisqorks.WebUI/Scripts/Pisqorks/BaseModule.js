var Pisqorks = window.Pisqorks || {};

Pisqorks.BaseModule = function () {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.BaseModule.prototype = Object.create(Pisqorks.BaseObject.prototype);

Pisqorks.BaseModule.prototype.InitializeFeatures = function (features) {
};
Pisqorks.BaseModule.prototype.InitializeNavigation = function (navbar) {
};
Pisqorks.BaseModule.prototype.InitializeRoutes = function (router) {
};
Pisqorks.BaseModule.prototype.Run = function (router) {
};