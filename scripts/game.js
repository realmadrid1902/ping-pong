function game() {
    $("<div/>").attr("id", "game").appendTo("body")
    $("<div/>").attr("id", "paddleA").appendTo("#game")
    $("<div/>").attr("id", "paddleB").appendTo("#game")
    $("<div/>").attr("id", "ball").appendTo("#game")

    var ball = {
        speed: 5,
        x: 290,
        y: 140,
        directionX: 1,
        directionY: 1
    };

    var paddleA = {
        speed: 5,
        x: parseInt($("#paddleA").width() + $("#paddleA").position().left),
        y1: parseInt($("#paddleA").position().top),
        y2: parseInt($("#paddleA").position().top + $("#paddleA").height()),
        directionX: 1,
        directionY: 1,
        update: function () {
            this.y1 = parseInt($("#paddleA").position().top);
            this.y2 = this.y1 + $("#paddleA").height();
        }
    };

    var paddleB = {
        speed: 5,
        x: parseInt($("#paddleB").position().left),
        y1: parseInt($("#paddleB").position().top),
        y2: parseInt($("#paddleB").position().top + $("#paddleB").height()),
        directionX: 1,
        directionY: 1,
        update: function () {
            this.y1 = parseInt($("#paddleB").position().top);
            this.y2 = this.y1 + $("#paddleB").height();
        }
    };

    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());

        if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
            ball.directionY = -1
        }

        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }


        if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
            ball.directionX = -1
        }

        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
        }

        // paddleA

        if (paddleA.y2 > ball.y && ball.y > paddleA.y1) {
            if (ball.x < parseInt($("#paddleA").width() + $("#paddleA").position().left)) {
                ball.directionX = 1
                if (ball.x < $("#paddleA").position().left) {
                    ball.directionX = -1
                }
            }
        }

        // paddleB
        if (paddleB.y2 > ball.y && ball.y > paddleB.y1) {
            if (ball.x > parseInt($("#paddleB").position().left)) {
                ball.directionX = -1
                if (ball.x < parseInt($("#paddleB").width() + $("#paddleB").position().left)) {
                    ball.directionX = 1
                }
            }
        }

        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        $("#ball").css({ "left": ball.x, "top": ball.y });
    }

    var pad1 = $("#paddleA");
    var pad2 = $("#paddleB");
    var directions = {};
    var speed = 4;

    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
    }

    function stop(e) {
        delete directions[e.which];
    }

    function paddleAmove(e) {
        for (var i in directions) {
            if (!directions.hasOwnProperty(i)) continue;
            //console.log(i);

            if (pad1.position().top > 0 && i == 38) {
                pad1.css("top", (pad1.position().top - speed) + "px");
            }

            if (pad1.position().top < ($("#game").height() - pad1.height()) && i == 40) {
                pad1.css("top", (pad1.position().top + speed) + "px");
            }
        }
        paddleA.update();
    }

    function paddleBmove(e) {
        for (var i in directions) {
            if (!directions.hasOwnProperty(i)) continue;
            //console.log(i);

            if (pad2.position().top > 0 && i == 37) {
                pad2.css("top", (pad2.position().top - speed) + "px");
            }

            if (pad2.position().top < ($("#game").height() - pad2.height()) && i == 39) {
                pad2.css("top", (pad2.position().top + speed) + "px");
            }
        }
        paddleB.update();
    }

    setInterval(gameLoop, 16);

    function gameLoop() {
        moveBall();
        paddleAmove();
        paddleBmove();
    }

}