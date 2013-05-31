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

    if (this._Default(this._tabRoot, null) != null)
        this._tabRoot.find("a").html(title);
};
Pisqorks.Game.GameBoardView.prototype._SetMessage = function (message, type) {
    this._messageBox.html(message);

    type = this._Default(type, null);
    this._messageBox[0].className = "alert";
    if (type != null) {
        this._messageBox.addClass(type);
    }
    return this._messageBox;
};
Pisqorks.Game.GameBoardView.prototype.Render = function (root) {
    this._root = root.Content;
    this._tabRoot = root.Tab;

    this._messageBox = $("<div class='alert' />");
    this._root.append(this._messageBox);

    this._SetMessage("Initializing...");
};
Pisqorks.Game.GameBoardView.prototype._StartGame = function (userName2, canPlay) {
    this._SetTitle("Me vs " + userName2);
    this._ChangeCanPlay(canPlay);
    this._PlaySound("join");
};
Pisqorks.Game.GameBoardView.prototype._InitializeGame = function (width, height, winningLine, shape) {
    this._width = width;
    this._height = height;
    this._winningLine = winningLine;
    this._shape = shape;

    this._RenderBoard();
    this._SetMessage("Waiting for oponent...");
};
Pisqorks.Game.GameBoardView.prototype._RenderBoard = function () {
    var html = "<table class='game-board'>";
    for (var y = 0; y < this._height; y++) {
        html += "<tr>";
        for (var x = 0; x < this._width; x++) {
            html += "<td data-x='" + x + "' data-y='" + y + "'></td>";
        }
        html += "</tr>";
    }
    html += "</table>";

    this._root.append(html);
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
    var table = this._root.find("table.game-board");
    if (!this._closed) {
        this._canPlay = val;
        this._SetMessage(val ? "You move..." : "Waiting for oponents move ...");

        if (val)
            table.removeClass("game-board-disabled");
        else
            table.addClass("game-board-disabled");
    } else {
        table.removeClass("game-board-disabled");
    }
};
Pisqorks.Game.GameBoardView.prototype._Moved = function (shape, x, y) {
    this._root.find("td[data-x=" + x + "][data-y=" + y + "]").addClass(shape == 0 ? "round" : "cross");
    this._ChangeCanPlay(shape != this._shape);

    this._PlaySound("move");
};
Pisqorks.Game.GameBoardView.prototype._PlaySound = function (baseName) {
    var basePath = "Content/sounds/";
    if (this._Default(this._audioPlayer, null) == null) {
        this._audioPlayer = new Audio();
    }

    if (this._audioPlayer.canPlayType("audio/mpeg")) {
        this._audioPlayer.src = basePath + baseName + ".mp3";
        this._audioPlayer.play();
    } else if (this._audioPlayer.canPlayType("audio/ogg")) {
        this._audioPlayer.src = basePath + baseName + ".ogg";
        this._audioPlayer.play();
    }
};
Pisqorks.Game.GameBoardView.prototype._Winner = function (shape) {
    var anchor = '<button class="btn btn-mini right">Close game</button>';

    if (shape == this._shape) {
        this._SetMessage("You are the winner!" + anchor, "alert-success");
        this._PlaySound("win");
    } else {
        this._SetMessage("You have lost this game!" + anchor, "alert-error");
        this._PlaySound("lost");
    }

    this._messageBox.find("button").click(function () {
        this._RaiseEvent("Closed");
    }.bind(this));
    this._closed = true;
    this._ChangeCanPlay(false);
};
Pisqorks.Game.GameBoardView.prototype._Invalid = function (shape) {
    this._ChangeCanPlay(true);
};