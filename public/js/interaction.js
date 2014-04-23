$(document).ready(function () {
    var selected = 0;

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

    $("input[value='Random']").click(function () {
        var $this = $(this),
            $ul = $this.siblings("ul"),
            move = R.randomMove();

        $ul.children("li").removeClass("selected");
        $ul.children("li[title='" + move + "']").addClass("selected").click();
    });

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
                              function (msg, winner) {
                                if (winner == 1) {
                                    console.log(msg + ' Player 1 wins!');
                                } else if (winner == 0) {
                                    console.log(msg + ' A tie!');
                                } else {
                                    console.log(msg + ' Player 2 wins!');
                                }
                            });
            selected = 0;
        }
    });
});
