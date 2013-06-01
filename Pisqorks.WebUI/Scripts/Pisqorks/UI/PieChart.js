Pisqorks = window.Pisqorks || {};
Pisqorks.UI = window.Pisqorks.UI || {};

Pisqorks.UI.PieChart = function () {
    Pisqorks.BaseObject.call(this);
};
Pisqorks.UI.PieChart.prototype = Object.create(Pisqorks.BaseObject.prototype);
Pisqorks.UI.PieChart.prototype.PrepareData = function (data, colors, width, height) {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i] > 0) {
            newData.push(data[i]);
        }
    }

    this._data = newData;
    this._colors = colors;
    this._width = this._Default(width, 400);
    this._height = this._Default(height, this._width);
    this._PrepareData();
};
Pisqorks.UI.PieChart.prototype._PrepareData = function () {
    this._angles = [];
    this._total = 0;

    for (var k = 0; k < this._data.length; k++) {
        this._total += this._data[k];
    }

    for (var i = 0; i < this._data.length; i++) {
        var angle = Math.ceil(360 * this._data[i] / this._total);
        this._angles.push(angle);
    }
};
Pisqorks.UI.PieChart.prototype.Render = function (root) {
    var html = '';
    var startAngle = 0;
    var endAngle = 0;

    for (var i = 0; i < this._angles.length; i++) {
        startAngle = endAngle;
        endAngle = startAngle + this._angles[i];

        var w = (this._width / 2);
        var h = (this._height / 2);

        var x1 = parseInt(w + 180 * Math.cos(Math.PI * startAngle / 180));
        var y1 = parseInt(h + 180 * Math.sin(Math.PI * startAngle / 180));

        var x2 = parseInt(w + 180 * Math.cos(Math.PI * endAngle / 180));
        var y2 = parseInt(h + 180 * Math.sin(Math.PI * endAngle / 180));

        var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise

        html += '<path d="' + d + '" fill="' + this._colors[i] + '" />';
    }
    root.append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + this._width + '" height="' + this._height + '" style="display: block;margin: 0 auto;">' + html + '</svg>');
};