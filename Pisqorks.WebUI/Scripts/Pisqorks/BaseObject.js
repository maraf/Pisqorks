var Pisqorks = window.Pisqorks || {};

Pisqorks.BaseObject = function () {
};
Pisqorks.BaseObject.prototype._Default = function (value, defaultValue) {
    if (typeof value == 'undefined') {
        return defaultValue;
    }
    return value;
};
Pisqorks.BaseObject.prototype._ParseDate = function (value) {
    return eval("new " + value.replace("/", "").replace("/", ""));
};