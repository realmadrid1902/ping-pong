$(document).ready(menu);

function menu() {
    $("<div/>").attr("id", "menu")
        .css({"position": "absolute"})
        .appendTo("body");

    var img = $("<img/>")
        .attr("src", "images/menu.jpg")
        .css({
            "width": "200%",
            //"height": "80%"
        }).appendTo("#menu");
    var button = $("<button/>").css({
        "position": "absolute",
        "top": "80%",
        "left": "90%",
        "font-size": "100%"
    }).text("START").appendTo("#menu");
    button.click(deleteMenu);
    function deleteMenu() {
        $("body").empty();
        game();
    }

}