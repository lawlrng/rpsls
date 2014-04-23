$(document).ready(function () {
    var selected = 0,

        displayWinner = function (msg) {
            $("#msg").text(msg);
            updateStats(R.stats);
        },

        updateStats = function (stats) {
            console.log("Hi!");
            console.log(stats);
            $("#humanStats").text(stats.player);
            $("#computerStats").text(stats.comp);
            $("#tieStats").text(stats.ties);
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
            move = R.randomMove();

        $ul.children("li").removeClass("selected");
        $ul.children("li[title='" + move + "']").addClass("selected").click();
    });

    // Called when a move is selected.
    $("div.choiceDisplay").change(function () {
        var $this = $(this);

        // I don't program in a language at work that has pre/post increment...
        // Leave me alone about it!
        // Anyways, if a selection is made on one side, random the other.
        if (selected++ === 0) {
            if ($this.attr("data-type") === 'human') {
                $("input[data-type='computer']").click();
            } else {
                $("input[data-type='human']").click();
            }
        } else {
            R.determineWinner($("ul[data-type='human'] li.selected").attr("title"),
                              $("ul[data-type='computer'] li.selected").attr("title"),
                              displayWinner);
            selected = 0;
        }
    });
});
