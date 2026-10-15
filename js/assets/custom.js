$(document).ready(function () {
  
    "use strict";
	
	//Testimonial Carousel
    $("#testimonial-carousel").owlCarousel({
        items : 1,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [980, 1],
        itemsTablet: [768, 1],
        itemsMobile : [479, 1],
        navigation : true,
        navigationText : ["", ""],
        pagination : true,
        paginationNumbers: false,
        transitionStyle : "goDown"
    });
    
	//Team Carousel
    var carousel = $("#team-carousel");

    carousel.owlCarousel({
        items : 3,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 2],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
        navigation : true,
        navigationText : ["", ""],
        pagination : true,
        paginationNumbers: false,
        afterAction: function (el) {
        //remove class active
            this
                .$owlItems
                .removeClass('active');

        //add class active
            this
                .$owlItems //owl internal $ object containing items
                .eq(this.currentItem + 1)
                .addClass('active');
        }
    });
	
	//Scroll Spy
	$('body').scrollspy({ target: '#main-nav' });
	
	//Smooth Scrool
	smoothScroll.init();
	
	//Portfolio Lightbox
	// $('.portfolio-column').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	gallery: {
	// 		// options for gallery
	// 		enabled: true
	// 	},
	// 	removalDelay: 300,
	// 	mainClass: 'mfp-fade'
	// });
	
	//WOW JS
	new WOW().init();
	
	
	$(window).load(function() { // makes sure the whole site is loaded
		//Preloader
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({'overflow':'visible'});
		
		//Sticky Nav
		$("#main-nav").sticky({ topSpacing: 0 });
	})

});

$(document).ready(function () {
    var form = $('#ajax-contact');
    var formMessages = $('#form-messages');

    $(form).submit(function (e) {
        e.preventDefault(); // पेज को रीलोड होने से रोकता है

        // बेसिक फ्रंटएंड वैलिडेशन (आप चाहें तो अपनी कस्टम शर्तें भी जोड़ सकते हैं)
        var phone = $('input[name="phone"]').val();
        var phoneRegex = /^[0-9]{10}$/; // 10 अंकों का फोन नंबर चेक करने के लिए

        if (phone.length < 10) {
            $(formMessages).text("कृपया सही 10 अंकों का फोन नंबर दर्ज करें।").css("color", "red");
            return;
        }

        // AJAX के ज़रिए डेटा भेजना
        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form.attr('action')),
            data: formData
        })
        .done(function (response) {
            $(formMessages).text(response).css("color", "green");
            $(form)[0].reset(); // फॉर्म खाली कर देगा
        })
        .fail(function (data) {
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText).css("color", "red");
            } else {
                $(formMessages).text("Oops! An error occured and your message could not be sent.").css("color", "red");
            }
        });
    });
});