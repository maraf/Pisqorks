var Pisqorks = window.Pisqorks || {};

// Základní třída pro vytvoření modulu.
Pisqorks.BaseModule = function () {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.BaseModule.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Inicializuje požadavky na vlastnosti prohlížeče.
Pisqorks.BaseModule.prototype.InitializeFeatures = function (features) {
};

// Registruje tlačítka na hlavním panelu.
Pisqorks.BaseModule.prototype.InitializeNavigation = function (navbar) {
};

// Registruje navigační pravidla / routy.
Pisqorks.BaseModule.prototype.InitializeRoutes = function (router) {
};

// Po dokončení inicializace.
Pisqorks.BaseModule.prototype.Run = function (router) {
};