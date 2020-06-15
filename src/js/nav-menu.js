$('#nav-btn').click(function() {
    $("#nav-menu").toggleClass("active");
})
$(window).resize(function () {
    if($(window).width() >= 481)  {
        $("#nav-menu").removeClass("active")
    }
})