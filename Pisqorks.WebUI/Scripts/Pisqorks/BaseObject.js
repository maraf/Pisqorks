var Pisqorks = window.Pisqorks || {};

// Základní objekt.
Pisqorks.BaseObject = function () {
};

// Vrací hodnotu value, pokud ta není undefined. Jinak vračí defaultValue.
Pisqorks.BaseObject.prototype._Default = function (value, defaultValue) {
    if (typeof value == 'undefined') {
        return defaultValue;
    }
    return value;
};

// Rozparsuje datum z formátu /Date(TIMESTAMP)/ do instance date.
Pisqorks.BaseObject.prototype._ParseDate = function (value) {
    return eval("new " + value.replace("/", "").replace("/", ""));
};