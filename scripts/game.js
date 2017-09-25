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
        directionY: 1
    };

    console.log(paddleA.x)

    var paddleB = {
        speed: 5,
        x: parseInt($("#paddleB").position().left),
        y1: parseInt($("#paddleB").position().top),
        y2: parseInt($("#paddleB").position().top + $("#paddleB").height()),
        directionX: 1,
        directionY: 1
    };

    console.log(paddleB.x)

    $(document).ready(function () {
        setInterval(gameLoop, 16);
    });
    function gameLoop() {
        moveBall();
        //movePaddleA();
        //movePaddleB();
        //checkCollision();

    }

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
}