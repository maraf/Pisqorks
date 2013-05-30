var Pisqorks = window.Pisqorks || {};
Pisqorks.Game = window.Pisqorks.Game || {};

Pisqorks.Game.GameBoardView = function (gameID, gameHub, requestPool) {
    Pisqorks.EventHandler.call(this);

    this._gameHub = gameHub;
    this._gameID = gameID;
    this._requestPool = requestPool;
    this._canPlay = false;
    this._SetTitle("Waiting...");

    this._gameHub.Register(gameID, this);
};
Pisqorks.Game.GameBoardView.prototype = Object.create(Pisqorks.EventHandler.prototype);
Pisqorks.Game.GameBoardView.prototype._SetTitle = function (title) {
    this.Title = title;
    this._RaiseEvent("TitleChanged", title);
};
Pisqorks.Game.GameBoardView.prototype.Render = function (root) {
    this._root = $(root);
};
Pisqorks.Game.GameBoardView.prototype._StartGame = function (userName2, canPlay) {
    this._SetTitle("Me vs " + userName2);
    this._ChangeCanPlay(canPlay);
};
Pisqorks.Game.GameBoardView.prototype._InitializeGame = function (width, height, winningLine, shape) {
    this._width = width;
    this._height = height;
    this._winningLine = winningLine;
    this._shape = shape;

    this._RenderBoard();
};
Pisqorks.Game.GameBoardView.prototype._RenderBoard = function () {
    var html = "<table class='game-board'>";
    for (var y = 0; y < this._height; y++) {
        html += "<tr>";
        for (var x = 0; x < this._width; x++) {
            html += "<td data-x='" + y + "' data-y='" + x + "'></td>";
        }
        html += "</tr>";
    }
    html += "</table>";

    this._root.html(html);
    this._root.find("table.game-board td").click(this._OnCellClick.bind(this));
};
Pisqorks.Game.GameBoardView.prototype._OnCellClick = function(e) {
    if (this._canPlay) {
        $cell = $(e.currentTarget);
        if (!$cell.hasClass("cross") || $cell.hasClass("round")) {

            this._gameHub.Move(this._gameID, $cell.data("x"), $cell.data("y"))
            this._ChangeCanPlay(false);

            $cell.addClass(this._shape);
        }
    }
};
Pisqorks.Game.GameBoardView.prototype._ChangeCanPlay = function (val) {
    this._canPlay = val;
    //TODO: Update status --- SetStatus(val ? 'You move ...' : 'Waiting for oponents move ...');
};
Pisqorks.Game.GameBoardView.prototype._Moved = function (shape, x, y) {
    this._root.find("td[data-x=" + x + "][data-y=" + y + "]").addClass(shape == 0 ? "round" : "cross");
    this._ChangeCanPlay(shape != this._shape);
};

//   HUB
// - stahnout status hry
// - priradit hrace
// - stahnout existujici data
// - provest tah (pokud jsem na rade) => zpracovat novy status
//
// - STATUS
//   - Waiting oponent
//   - Active
//   - Closed
//   - 