var Pisqorks = window.Pisqorks || {};

// Třída zaobalující požadavek na vlastnost prohlížeče.
Pisqorks.FeatureRequest = function () {
    Pisqorks.BaseObject.call(this);

    this._Features = new Array();
};
Pisqorks.FeatureRequest.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Přidá požadavek na vlastnost, které musí být v době kontroly v prohlížeči.
// Jméno, funkce, která provede kontrolu, případná uživatelská zpráva.
Pisqorks.FeatureRequest.prototype.Require = function (name, checkFunc, message) {
    this._Features.push({ Name: name, Required: true, CheckFunc: checkFunc, Message: message });
};

// Přidá požadavek na vlastnost, které nemusí být v době kontroly v prohlížeči.
Pisqorks.FeatureRequest.prototype.Optional = function (name, checkFunc, message) {
    this._Features.push({ Name: name, Required: false, CheckFunc: checkFunc, Message: message });
};

// Provede kontrolu. Volitelný name zkontroluje pouze požadovanou vlastnost, jinak kontroluje vše.
// Vrací objekt, obsahující v Reqired zda všechny povinné vlastnosti jsou splněny, 
// v Optional zda všechny volitelné vlastnosti jsou splněny, a v Missing seznam vlastností, které chybí.
Pisqorks.FeatureRequest.prototype.Check = function (name) {
    if (this._Default(name, null) != null) {
        for (var i = 0, length = this._Features.length; i < length; i++) {
            if (this._Features[i].Name == name) {
                return this._Features[i].CheckFunc();
            }
        }
    }

    var required = true;
    var optional = true;
    var missing = new Array();
    for (var i = 0, length = this._Features.length; i < length; i++) {
        if (!this._Features[i].CheckFunc()) {
            if (this._Features[i].Required) {
                required = false;
            } else {
                optional = false;
            }
            missing.push(this._Features[i]);
        }
    }
    return { Required: required, Optional: optional, Missing: missing };
};