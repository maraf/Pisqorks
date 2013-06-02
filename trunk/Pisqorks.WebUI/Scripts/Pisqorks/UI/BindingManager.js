Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

// Umožňuje spárovat objekt s formulářem a zpět.
// Párování probíhá pomocí atributu data-binding 
// a jeho hodnota je použita pro spárování s vlastností objektu.
Pisqorks.UI.BindingManager = function () {
    Pisqorks.BaseObject.call(this);

};
Pisqorks.UI.BindingManager.prototype = Object.create(Pisqorks.BaseObject.prototype);

// Nastaví hodnoty z modelu do formuláře pod rootSelector.
Pisqorks.UI.BindingManager.prototype.BindModel = function (rootSelector, model) {
    $(rootSelector).find("*[data-binding]").each(function (i, element) {
        $element = $(element);

        if ($element.is(":checkbox")) {
            $element.attr("checked", model[$element.data("binding")]);
        } else if (element.tagName == "select") {
            $element.find("option").each(function (i, option) {
                if (option.val() == $element.data("binding")) {
                    option.select();
                }
            });
        } else {
            $element.val(model[$element.data("binding")]);
        }
    });
};

// Nastaví hodnoty z formuláře pod rootSelector do objektu model.
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