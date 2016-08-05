
$(document).ready(function(){

    $('#contact-form').validate({
        rules: {
            fname: {
                required: true,
                rangelength: [2, 255]
            },
            lname: {
                required: true,
                rangelength: [2, 255]
            },
            email: {
                required: true,
                email: true
            },
            company: {
                required: false,
                rangelength: [2, 255]
            },
            details: {
                required: false,
                maxlength: 1000
            }
        },
        messages: {
            fname: {
                required: "Please enter your first name.",
                rangelength: "Your name must be between 2 - 255 characters."
            },
            lname: {
                required: "Please enter your last name.",
                rangelength: "Your last name must be between 2 - 255 characters."
            },
            email: {
                required: "Please enter your email address."
            },
            company: {
                rangelength: "Your company/organization name must be between 2 - 255 characters."
            },
            details: {
                maxlength: "Your message must contain max 1000 characters."
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: $(form).serialize()
            }).done(function(response) {
                $('#contact-form :input').attr('disabled', 'disabled');
                $('#contact-form').fadeTo("slow", 0, function() {
                    $(this).css({ 'display': 'none' });
                    $(this).find(':input').attr('disabled', 'disabled');
                    $(this).find('label').css('vxcvcxcursor', 'default');
                    $('#success').fadeTo("slow", 1);
                    $('html, body').animate({ scrollTop: $("#contact-section").offset().top }, 400);
                });

                }).fail(function(data) {
                    $('#contact-form').hide("slow", function() {
                        $('#error').fadeTo("slow", 1);
                        $('html, body').animate({ scrollTop: $("#contact-section").offset().top }, 400);
                    });
                });
        }
    });

    $("input.float-input:visible").focus(function() {
        $("label[for='" + this.id + "']").addClass("moveup");
    });

    $(".close-btn").click(function() {
        $(this).css({
            'z-index': 101
        });
        $(this).toggleClass('toggle-fixed');
        $(this).find("i.fi-list").toggleClass("fi-x");
        $(".mobile-nav-container").toggleClass('open');
    });

    var year = new Date().getFullYear();
    $(".year-footer").html(year);


    $(window).scroll(function(){
        if ($(window).scrollTop() > 500) {
            $('.scroll-to-top').css({'display' : 'block'});
        } else {
            $('.scroll-to-top').css({'display' : 'none'});
        }
    });

    $('.scroll-to-top').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop : 0},600);
        return false;
    });

    function initGoogleMap() {
        var map;
        if ($("#map").length) {
            var center = { lat: 49.2704215, lng: -123.0166829 };
            var styles = [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e9e9e9"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 16
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dedede"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }, {
                    "lightness": 16
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#333333"
                }, {
                    "lightness": 40
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f2f2f2"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }];
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                scaleControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                styles: styles
            });


            var marker = new google.maps.Marker({
                position: center,
                animation: google.maps.Animation.DROP,
                map: map,
                icon: 'assets/img/contact/map_pin@2x.png',
            });
        }

    }

    initGoogleMap();
});
