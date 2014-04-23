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

$("img.choice").click(function () {
    var $this = $(this),
        choice = $this.attr("title"),
        $li = $this.parent(),
        $img = $(document.createElement("img"));

    $li.siblings().removeClass("selected");
    $li.addClass("selected");

    $img.attr("src", "img/full/" + choice + ".png")
        .attr("title", choice).attr("alt", choice);

    $this.closest("ul").siblings(".choiceDisplay").html($img);
});

$("input[value='Random']").click(function () {
    var $this = $(this),
        $ul = $this.siblings("ul"),
