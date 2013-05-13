Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

Pisqorks.UI.BindingManager = function (selector, layout, router, requestPool, eventBus) {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.UI.BindingManager.prototype = Object.create(Pisqorks.BaseObject.prototype);

Pisqorks.UI.BindingManager.prototype.BindModel = function (rootSelector, model) {
    $(rootSelector).find("*[data-binding]").each(function (i, element) {
        $element = $(element);

        if ($element.is(":checkbox")) {
            $element.attr("checked", model[$element.data("binding")]);
        } else {
            $element.val(model[$element.data("binding")]);
        }
    });
};

Pisqorks.UI.BindingManager.prototype.UpdateModel = function (rootSelector, model) {
    $(rootSelector).find("*[data-binding]").each(function (i, element) {
        $element = $(element);

        if ($element.is(":checkbox")) {
            model[$element.data("binding")] = $element.is(":checked");
        } else {
            model[$element.data("binding")] = $element.val();
        }
    });
};