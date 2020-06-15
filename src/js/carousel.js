
    const $carousel = $("#carousel");
    let $carouselItem = $(".carousel__item"),
        $slideWidth = $carousel.width(),
        animated = false;
    
    $carouselItem.css({
        "position": "relative",
        "width": $carousel.width()
    });
    
    $carousel.css({
        display: "flex",
        overflow:"hidden",
        position:"relative"
    });
    
    $carousel.prepend("<a class='arrow arrow_left'><</a>","<a class='arrow arrow_right'>></a>");
    // don't add arrows if use mobile
    if ($(window).width() <= 993) {
        $(".arrow").hide() ;
    }
    let $leftArrow = $(".arrow_left"),$rightArrow = $(".arrow_right");    
    // If user window size grow -- remove arrows
    $(window).resize(function () {
        $carouselItem.css("width",$carousel.width());
        $slideWidth = $carousel.width();
        $(window).width() <= 993 ? $(".arrow").hide() : $(".arrow").show()
    });
    // function for left moving
    function leftMoving() {
        $carouselItem = $(".carousel__item");
        if (animated) return;  //  can  click while  animation work
        animated = true;
        $carouselItem.eq(-1).prependTo($(".carousel-container"));
        $carouselItem.css("left",-$slideWidth);
        $carouselItem.animate({left: "+=" + $slideWidth + "px"}, 900, function () {
            $carouselItem.css("left", "0");
            animated = false;
        });
    };
    // function for right moving
    function rightMoving() {
        $carouselItem = $(".carousel__item");
        if (animated) return; 
        animated = true;
        $carouselItem.animate({ left: "-=" + $slideWidth + "px"}, 900,function () {
            $(".carousel-container").append($carouselItem.eq(0));
            $carouselItem.css("left","0");
            animated = false;
        });
    };
    
    let xStart,xEnd = 0;
    // touch for mobile and tablet
    document.getElementById("carousel").addEventListener("touchstart",function (event) {
        xStart = event.changedTouches[0].pageX;
    });
    //  touch direction 
    document.getElementById("carousel").addEventListener("touchend",function (event) {
        xEnd = event.changedTouches[0].pageX;
        
        if (xStart>xEnd) {
            rightMoving();
        }
        if (xStart<xEnd) {
            leftMoving();
        }
    });
    //сlicks on buttons 
    $rightArrow.click(rightMoving);
    $leftArrow.click(leftMoving);
