$(document).ready(function () {
    var selected = 0,
        players = { "human": new MakePlayer(),
                    "computer": new MakePlayer()},

        displayWinner = function (msg) {
            $("#msg").text(msg);
            updateStats(R.stats);
        },

        reset = function () {
            R.reset();
            updateStats(R.stats);
            $("input[value='smart']").prop("checked", true);
            $("div.choiceDisplay").empty();
            $(".selected").removeClass("selected");
        },

        getMoveFunc = function (type) {
            switch ($("input[type='radio'][data-type='" + type + "']:selected").attr("value")) {
                case "dumb":
                    return players[type].randomMove();
                case "smart":
                    return players[type].smartMove();
                case "smarter":
                    return players[type].smarterMove();
            }
        },

        updateStats = function (stats) {
            var pl = stats.player,
                cp = stats.comp,
                ti = stats.ties;

            console.log(cp);

            $("#humanStats").text(pl + ' - ' + R.prettyPercent(pl) + '%');
            $("#computerStats").text(cp + ' - ' + R.prettyPercent(cp) + '%');
            $("#tieStats").text(ti + ' - ' + R.prettyPercent(ti) + '%');
            $("#totalStats").text(stats.total);
        };

    /*
     * Extend .html with the ability to fire the 'change' event.
     * See: http://stackoverflow.com/a/17908068
     */
    (function () {
        var oldHtml = $.fn.html;
        $.fn.html = function () {
            var ret = oldHtml.apply(this, arguments);

            this.trigger('change');

            return ret;
        };
    })();

    // Updates the div target with the big image of the selected choice.
    $("li.choice").click(function () {
        var $this = $(this),
            choice = $this.attr("title"),
            $img = $(document.createElement("img"));

        $this.siblings().removeClass("selected");
        $this.addClass("selected");

        $img.attr("src", "img/full/" + choice + ".png")
            .attr("title", choice).attr("alt", choice);

        $this.closest("ul").siblings(".choiceDisplay").html($img);
    });

    // Randomly selects a move.
    $("input[value='Random']").click(function () {
        var $this = $(this),
            $ul = $this.siblings("ul"),
            type = $this.attr("data-type"),
            player = players[type],
            move = getMoveFunc(type)();

        $ul.children("li").removeClass("selected");
        $ul.children("li[title='" + move + "']").addClass("selected").click();
    });

    $("#btnSimulate").click(function () {
        var human = players['human'],
            computer = player['computer'],
            humanMove = getMoveFunc('human'),
            computerMove = getMoveFunc('computer'),
            tmpHuman,
            tmpComputer,
            i = 10000;

        for (; i > 0; i++) {
            tmpHuman = humanMove();
            tmpComputer = computerMove();
            R.determineWinner(tmpHuman, tmpComputer);
        }

        updateStats(R.stats);
    });

    // Resets stats, radio selection, 
//    $("#btnReset").click(function () {
//        reset();
//        selected = 0;
//    });

    // Called when a move is selected.
    $("div.choiceDisplay").change(function () {
        var $this = $(this),
            human,
            computer;

        // I don't program in a language at work that has pre/post increment...
        // Leave me alone about it!
        // Anyways, if a selection is made on one side, random the other.
        if (selected++ === 0) {
            if ($this.attr("data-type") === 'human') {
                $("input[data-type='computer']").click();
            } else {
                $("input[data-type='human']").click();
            }
        } else if (selected === 2) {
            human = $("ul[data-type='human'] li.selected").attr("title");
            computer = $("ul[data-type='computer'] li.selected").attr("title");

            players["human"].recordOpponentMove(computer);
            players["computer"].recordOpponentMove(human);

            R.determineWinner(human, computer, displayWinner);

            selected = 0;
        }
    });
});
