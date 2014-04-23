$("img.choice").click(function () {
    var $this = $(this),
        choice = $this.attr("title"),
        $img = $(document.createElement("img"));

    $img.attr("src", "img/full/" + choice + ".png")
        .attr("title", choice).attr("alt", choice);

    $this.closest("ul").siblings(".choiceDisplay").html($img);
});

