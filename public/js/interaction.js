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

