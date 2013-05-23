var Pisqorks = window.Pisqorks || {};

Pisqorks.FeatureRequest = function () {
    Pisqorks.BaseObject.call(this);

    this._Features = new Array();
};
Pisqorks.FeatureRequest.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.FeatureRequest.prototype.Require = function (name, checkFunc, message) {
    this._Features.push({ Name: name, Required: true, CheckFunc: checkFunc, Message: message });
};
Pisqorks.FeatureRequest.prototype.Optional = function (name, checkFunc, message) {
    this._Features.push({ Name: name, Required: false, CheckFunc: checkFunc, Message: message });
};
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