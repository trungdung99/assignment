(function ($) {
    // Slidder home 4
    if ($("#bxslider-home4").length > 0) {
        const slider = $("#bxslider-home4").bxSlider({
            nextText: "<i class=\"fa fa-angle-right\"></i>",
            prevText: "<i class=\"fa fa-angle-left\"></i>",
            auto: true,
            onSliderLoad(currentIndex) {
                $("#bxslider-home4 li").find(".caption").each(function (i) {
                    $(this).show().addClass("animated fadeInRight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                        $(this).removeClass("fadeInRight animated");
                    });
                });
            },
            onSlideBefore(slideElement, oldIndex, newIndex) {
                // slideElement.find('.sl-description').hide();
                slideElement.find(".caption").each(function () {
                    $(this).hide().removeClass("animated fadeInRight");
                });
            },
            onSlideAfter(slideElement, oldIndex, newIndex) {
                // slideElement.find('.sl-description').show();
                setTimeout(() => {
                    slideElement.find(".caption").each(function () {
                        $(this).show().addClass("animated fadeInRight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(this).removeClass("fadeInRight animated");
                        });
                    });
                }, 500);
            },
        });
            // slider.reloadSlider();
    }
}(jQuery)); // End of use strict