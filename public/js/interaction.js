$("img.choice").click(function () {
    var $this = $(this),
        choice = $this.attr("title");

    $.get("/ajax/" + choice, function (data) {
        $this.closest(".choiceDisplay").html(data);
    });
});

