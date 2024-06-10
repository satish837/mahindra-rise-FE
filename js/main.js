jQuery(function () {
    var vw = jQuery(window).width();

    //AOS
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
        initClassName: "aos-init", // class applied after initialization
        animatedClassName: "aos-animate", // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 30, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: "cubic-bezier(0.165, 0.84, 0.44, 1)", // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
    //Beam Slider
    setTimeout(function () {
        if (jQuery('.beam-slider').length > 0) {
            let mainSliderSelector = '.beam-slider',
                interleaveOffset = 0.9;

            // Main Slider

            let mainSliderOptions = {
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 7000
                },
                grabCursor: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                on: {
                    init: function () {
                        this.autoplay.stop();
                    },
                    imagesReady: function () {
                        this.el.classList.remove('loading');
                        setTimeout(() => {
                            if (jQuery('.beam-slider .swiper-slide-active video').length > 0) {
                                this.autoplay.stop();
                            } else {
                                this.autoplay.start();
                            }
                        }, 10);
                    },
                    slideChangeTransitionEnd: function () {
                        let swiper = this,
                            captions = swiper.el.querySelectorAll('.content');
                        for (let i = 0; i < captions.length; ++i) {
                            captions[i].classList.remove('active');
                            TweenMax.to(swiper.slides[i].querySelectorAll('.content h2, .content small, .content .awardImg'), 0, { autoAlpha: 0, y: 20 });
                            TweenMax.to(swiper.slides[i].querySelectorAll('.content p'), 0, { autoAlpha: 0, y: 40 });
                            TweenMax.to(swiper.slides[i].querySelectorAll('.content .btn'), 0, { autoAlpha: 0, y: 60 });
                            TweenMax.to(swiper.slides[i].querySelectorAll('.content h3'), 0, { autoAlpha: 0, y: 70 });
                        }
                        TweenMax.to(swiper.slides[swiper.activeIndex].querySelectorAll('.content h2, .content small, .content p, .content .btn, .content h3 , .content .awardImg'), 0.6, {
                            autoAlpha: 1, y: 0, onComplete: function () {
                                swiper.slides[swiper.activeIndex].querySelector('.content').classList.add('active');
                            }
                        });
                        if (jQuery('.beam-slider .swiper-slide-active video').length > 0) {
                            swiper.autoplay.stop();
                            jQuery('.beam-slider .swiper-slide-active video').each(function () {

                                jQuery(this).get(0).play();
                                var duration = (jQuery(this)[0].duration) * 1000;
                                //    console.log(duration);
                                setTimeout(() => {
                                    swiper.autoplay.start();
                                    jQuery('.beam-slider .swiper-button-next').trigger('click');
                                }, duration);
                            });

                        } else {
                            swiper.autoplay.start();
                            jQuery('.beam-slider .swiper-slide video').each(function () {
                                jQuery(this).get(0).pause();
                                jQuery(this).get(0).currentTime = 0;

                            });
                        }

                    },
                    progress: function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;

                            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                                "translateX(" + innerTranslate + "px)";
                        }
                    },
                    setTransition: function (speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                                speed + "ms";
                        }
                    }
                }
            };

            let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

        }
        var swiperWhatWeDo = new Swiper(".what-we-do-thumb-slider", {
            loop: true,
            slidesPerView: 6,
            spaceBetween: 0,
            slideToClickedSlide: true,
            navigation: {
                nextEl: '.what-we-do-next',
                prevEl: '.what-we-do-prev',
            },
        });

        var _diagonalSliderSlidesPerView = 1.2;

        if (vw > 969 && vw < 1190) {
            _diagonalSliderSlidesPerView = 1.45;
        }
        if (vw < 1024) {
            _diagonalSliderSlidesPerView = 1.3;
        }

        var diagonalSlider = new Swiper(".diagonal-slider", {
            loop: true,
            loopAdditionalSlides: 5,
            speed: 2500,
            autoplay: {
                delay: 7000
            },
            spaceBetween: 0,
            slidesPerView: _diagonalSliderSlidesPerView,
            centeredSlides: false,
            touchRatio: 1,
            slideToClickedSlide: true,
            direction: 'vertical',
            grabCursor: true,
            watchSlidesProgress: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next-diagonal',
                prevEl: '.swiper-button-prev-diagonal',
            },
            on: {
                slideChangeTransitionEnd: function () {
                    let swiper = this,
                        captions = swiper.el.querySelectorAll('.content');
                    for (let i = 0; i < captions.length; ++i) {
                        TweenMax.to(swiper.slides[i].querySelectorAll('.content .year, .content .heading'), 0, { autoAlpha: 0, y: -30 });
                        TweenMax.to(swiper.slides[i].querySelectorAll('.content p'), 0, { autoAlpha: 0, y: 30 });
                        TweenMax.to(swiper.slides[i].querySelectorAll('.beam-bar'), 1, { x: "-120%" });
                    }
                    TweenMax.to(swiper.slides[swiper.activeIndex].querySelectorAll('.content .year, .content .heading, .content p'), 1, { autoAlpha: 1, y: 0 });
                    TweenMax.to(swiper.slides[swiper.activeIndex].querySelectorAll('.beam-bar'), 1, { x: "0%" });
                },
                slideChangeTransitionStart: function () {
                    let swiper = this,
                        captions = swiper.el.querySelectorAll('.content');
                    for (let i = 0; i < captions.length; ++i) {
                        TweenMax.to(swiper.slides[i].querySelectorAll('.content .year, .content .heading'), 0.6, { autoAlpha: 0, y: -30 });
                        TweenMax.to(swiper.slides[i].querySelectorAll('.content p'), 0.6, { autoAlpha: 0, y: 30 });
                    }
                },
                progress: function () {
                    let swiper = this;
                    TweenMax.to(swiper.slides[swiper.activeIndex].querySelectorAll('.beam-bar'), 1, { x: "150%" });
                },
            }
        });

    }, 50);






    jQuery('.tab-nav li a').click(function (ev) {
        ev.preventDefault();
        let id = jQuery(this).attr('href');
        if (vw < 768 && jQuery(this).closest('.section').hasClass('interested-in-contact')) {
            jQuery(this).parent().hide();
            jQuery(this).parent().siblings().hide();
            jQuery(id).slideToggle().addClass('show');
            jQuery(id).siblings().slideUp();
        } else {
            jQuery(this).addClass('active');
            jQuery(this).parent().siblings().find('a').removeClass('active');
            jQuery(id).addClass('active').addClass('show');
            jQuery(id).siblings().removeClass('show').removeClass('active');
            if (jQuery(id).find('.flickity-slider-wrap').length) {
                jQuery(id).find('.flickity-slider-wrap').flickity('resize')
            }
        }
        setTimeout(function () {
            AOS.refresh();
            // newsroom page story section
            jQuery('.tab-pane.active .newsroom-story-sec .slides:eq(1) .grid-box .image img').attr('src', jQuery('.tab-pane.active .newsroom-story-sec .slides:eq(1) .grid-box .image img').attr('data-img-big'));
            jQuery('.tab-pane.active .newsroom-story-sec .slides:eq(2) .grid-box .image img').attr('src', jQuery('.tab-pane.active .newsroom-story-sec .slides:eq(2) .grid-box .image img').attr('data-img-horizontal'));
        }, 100);
    });

    jQuery('.key-event-thumb-slider .slides').click(function (ev) {
        ev.preventDefault();
        let id = jQuery(this).data('href');
        jQuery(this).addClass('active');
        jQuery(this).siblings().removeClass('active');
        jQuery(id).addClass('active').addClass('show');
        jQuery(id).siblings().removeClass('show').removeClass('active');
        if (jQuery(id).find('.flickity-slider-wrap').length) {
            jQuery(id).find('.flickity-slider-wrap').flickity('resize')
        }
    });

    jQuery('.tab-content .back').click(function () {
        jQuery(this).closest('.tab-pane').slideUp();
        var _this = jQuery(this);
        setTimeout(function () {
            _this.closest('.tab-pane').parent('.tab-content').siblings().find('li').fadeIn();
        }, 400);
    })


    //nav trigger
    var navOpnFlg = 0;
    jQuery(".hamburger").on('click', function () {
        if (navOpnFlg == 0) {
            TweenMax.to(jQuery(this).find('li:eq(0)'), 0.3, { rotation: -45, y: 9 });
            TweenMax.to(jQuery(this).find('li:eq(1)'), 0.3, { opacity: 0 });
            TweenMax.to(jQuery(this).find('li:eq(2)'), 0.3, { rotation: 45, y: -9 });
            jQuery('.main-header').addClass('black');
            jQuery(".main-header .main-nav").addClass('active');
            navOpnFlg = 1;
        } else {
            TweenMax.to(jQuery(this).find('li:eq(0)'), 0.3, { rotation: 0, y: 0 });
            TweenMax.to(jQuery(this).find('li:eq(1)'), 0.3, { opacity: 1 });
            TweenMax.to(jQuery(this).find('li:eq(2)'), 0.3, { rotation: 0, y: 0 });
            jQuery('.main-header').removeClass('black');
            jQuery(".main-header .main-nav").removeClass('active');
            navOpnFlg = 0;
        }
        jQuery('html, body').toggleClass('lock-scroll');
        jQuery('.main-header .icon-nav .search > a').toggleClass('disable-action');
    });


    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = jQuery('.main-header').outerHeight();



    jQuery(window).scroll(function (event) {
        didScroll = true;

    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = jQuery(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > 50) {
            jQuery('.main-header').addClass('solid');
        } else {
            jQuery('.main-header').removeClass('solid');
        }

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            jQuery('.main-header').addClass('nav-up');
            // jQuery('.filter-wrap, .course-content-wrap .sub-nav-wrap, .filter-wrap-mobile').removeClass('push-down');
        } else {
            // Scroll Up
            if (st + jQuery(window).height() < jQuery(document).height()) {
                jQuery('.main-header').removeClass('nav-up');
                // jQuery('.filter-wrap, .course-content-wrap .sub-nav-wrap, .filter-wrap-mobile').addClass('push-down');
            }
        }

        lastScrollTop = st;
    }

    //Open search panel
    jQuery('.main-header .icon-nav .search > a').on('click', function () {
        jQuery(this).parent().toggleClass('active');
        jQuery('.main-nav > ul > li, .hamburger').toggleClass('disable-action');
        jQuery('html, body').toggleClass('lock-scroll');
    });

    //Mobile Menu script
    if (vw < 969) {
        jQuery(".main-nav .has-child > span").click(function () {
            jQuery(this).next(".mega-menu").slideToggle();
            jQuery(this).parent().siblings(".has-child").find(".mega-menu:visible").slideUp()
            jQuery(this).parent().toggleClass("active");
            jQuery(this).parent().siblings(".has-child").removeClass("active");
        });

        //Mobile menu script
        jQuery('.footer-menu .head.has-child').on('click', function () {
            jQuery(this).next(".content").slideToggle();
            jQuery(this).parent().siblings(".link-blocks").find(".content:visible").slideUp()
            jQuery(this).toggleClass("active");
            jQuery(this).parent().siblings(".link-blocks").find('.head.has-child').removeClass("active");
        });
    }

    //open contact Form
    // jQuery('.inquire-now').click(function (ev) {
    // ev.preventDefault();
    // jQuery('.contact-form .thank-you').hide();
    // jQuery('.contact-form, .contact-form-wrap').fadeIn();
    // });
    jQuery('.contact-form .close').click(function (ev) {
        jQuery('.contact-form').fadeOut();
    });
    jQuery('.submit-btn .btn').click(function () {
        jQuery(this).closest('.contact-form-wrap').hide();
        jQuery('.contact-form .thank-you').show();
    });

    //Filter Accordian
    let multiSelect = jQuery('.sidebar-filter').data('multi');
    if (multiSelect) {
        jQuery('.sidebar-filter li.submenu h6').click(function () {
            jQuery(this).toggleClass('active');
            jQuery(this).parent().find('.content').slideToggle();
        });
    } else {
        jQuery('.sidebar-filter li.submenu h6').click(function () {
            jQuery(this).toggleClass('active');
            jQuery(this).parent().siblings().find('h6').removeClass('active');
            jQuery(this).parent().find('.content').slideToggle();
            jQuery(this).parent().siblings().find('.content').slideUp();
        });
    }

    //Seacrh box
    jQuery('.search-component  .search-box input').on('keyup', function () {
        console.log(jQuery(this).val())
        if (jQuery(this).val().length > 1) {
            jQuery('.search-close').show();
        }
    });

    jQuery('.search-component  .search-box .search-close').on('click', function () {
        jQuery(this).parent().find('input').val('');
        jQuery(this).hide();
    });



    // MObile Filter
    jQuery('.mob-heading-filter').click(function () {
        jQuery('.sidebar-filter').slideToggle();
        jQuery('.date-range').slideUp();
    });

    jQuery('.mob-heading-sort').click(function () {
        jQuery('.date-range').slideToggle();
        jQuery('.sidebar-filter').slideUp();
    });

    //vertical Tab
    jQuery('.vertical-tab li a').click(function (ev) {
        ev.preventDefault();
        let id = jQuery(this).attr('href');
        jQuery(this).addClass('active');
        jQuery(this).parent().siblings().find('a').removeClass('active');
        jQuery(id).addClass('active');
        jQuery(id).siblings().removeClass('active');
    });

    //Accordian Institute
    jQuery('.intitute-sec .tab-content h5').click(function () {
        jQuery(this).toggleClass('active');
        jQuery(this).parent().siblings().find('h5').removeClass('active');
        jQuery(this).parent().find('.tab-pane-content').slideToggle();
        jQuery(this).parent().find('.tab-pane-content .content').toggleClass('active');
        jQuery(this).parent().siblings().find('.tab-pane-content').slideUp();
        jQuery(this).parent().siblings().find('.tab-pane-content .content').removeClass('active');
    });

    //Accordian Key Event
    jQuery('.accordion li h6').click(function () {
        jQuery(this).toggleClass('active');
        jQuery(this).parent().siblings().find('h6').removeClass('active');
        jQuery(this).parent().find('.accord-content').slideToggle();
        jQuery(this).parent().siblings().find('.accord-content').slideUp();
    });

    var jQuerycarousel = jQuery('.key-event-thumb-slider').flickity();
    var slideLength = jQuery('.key-event-thumb-slider .slides').length;

    // jQuery('.key-event-thumb-slider .slides').eq(slideVisible - 1).addClass('hide-line');
    jQuerycarousel.on('change.flickity', function (event, index) {
        if (event.namespace == 'flickity') {
            var lastElem = slideVisible - (slideLength - index);
            // jQuery('.key-event-thumb-slider .slides').removeClass('hide-line')
            // jQuery('.key-event-thumb-slider .slides').eq(lastElem - 1).addClass('hide-line')
        }
    });

    jQuery(".see-more-trigger").click(function () {
        jQuery(this).hide();
        jQuery(".gallery-list li").addClass("active")
    });


    if (jQuery('.start-date').length) {
        jQuery('.start-date').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd/mm/yyyy'
        });
    }

    if (jQuery('.end-date').length) {
        jQuery('.end-date').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd/mm/yyyy'
        });
    }


    //    jQuery('.women-leader .link-text').click(function(){
    //         let imgCLone = jQuery(this).closest('.discover-block').find('.discoverImg img').clone();
    //         let contentCLone = jQuery(this).closest('.discover-block').find('.discoverContent').clone();

    //         jQuery('.women-popup').find('.image').html(imgCLone)
    //         jQuery('.women-popup').find('.desc').html(contentCLone)
    //    })

    //Investor page financial report more report code
    jQuery('.report-table .show-more span').on('click', function () {
        jQuery(this).toggleClass('active');
        jQuery('.report-table ul').toggleClass('active');
    });

    //Our business countries slider
    var global_presence = new Swiper(".global-presence-slider", {
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });
    //Global swiper init
    var global_swiper = new Swiper(".global-swiper-slider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        thumbs: {
            swiper: video_thumb_swiper,
        },
    });
    var video_thumb_swiper = new Swiper(".video-thumb-slider", {
        slidesPerView: 2,
        watchSlidesProgress: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next-video",
            prevEl: ".swiper-button-prev-video",
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            767: {
                slidesPerView: 2
            }
        }
    });

    //Set footer parallax

    var _footer_height = jQuery('.footer-main').height();

    // if (jQuery('#block-footer').length > 0) {
    //     _main_Scroll = jQuery('#block-footer').prev().offset().top;
    // } else {
    //     _main_Scroll = jQuery('.layout__region div>section:last-child').offset().top;
    // }

    if (jQuery('#block-footer').length > 0 || jQuery('#block-innerfooter').length > 0) {
        jQuery('#block-footer,#block-innerfooter').prev().css({ "margin-bottom": _footer_height + "px" });
    } else {
        jQuery('.footer-main').prev().css({ "margin-bottom": _footer_height + "px" });
    }



    var back_to_top = jQuery('#back-to-top');

    jQuery(window).scroll(function () {
        var _document_height = jQuery(document).outerHeight();
        var _main_Scroll = _document_height - (jQuery(window).height() * 2);
        if (jQuery(window).scrollTop() > 800) {
            back_to_top.addClass('show');
        } else {
            back_to_top.removeClass('show');
        }



        if (jQuery(window).scrollTop() >= _main_Scroll) {
            jQuery('.footer-main').addClass('footer-visible');
        } else {
            jQuery('.footer-main').removeClass('footer-visible');
        }




        // var top_of_element = $(".beam-animation").offset().top;
        // var bottom_of_element = $(".beam-animation").offset().top + $(".beam-animation").outerHeight();
        // var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        // var top_of_screen = $(window).scrollTop();

        // $(".beam-animation").each(function () {
        //     // && (top_of_screen < bottom_of_element)

        //     if ((bottom_of_screen >= top_of_element) && (top_of_screen <= bottom_of_element)) {
        //         $(this).addClass('active');
        //     } else {
        //         $(this).removeClass('active');
        //     }
        // });


    });


    back_to_top.on('click', function (e) {
        e.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, '300');
    });

    // slider next prev btn click start here
    if (jQuery(window).width() > 767) {
        jQuery('.create-value-slider .next').on('click', function () {
            jQuery('.previous').attr('disabled', false);
            var index = jQuery(this).parents('.flickity-slider-wrap').find('.slides').length - 4;

            if (jQuery('.create-value-slider .slides:eq(' + index + ')').hasClass('is-selected')) {
                jQuery(this).attr('disabled', true);

            } else {
                jQuery(this).attr('disabled', false);
            }
        });

        jQuery('.create-value-slider .previous').on('click', function () {
            jQuery('.next').attr('disabled', false);
        });
    }
    // slider next prev btn click end here

    jQuery('.video-thumb-slider .swiper-slide').on('click', function () {
        var _currIndex = jQuery(this).index();
        global_swiper.slideTo(_currIndex)
    });

    jQuery(window).scroll(function () {
        AOS.refresh();
        if (jQuery(window).scrollTop() > 800) {
            jQuery('.beam-spotlight').addClass('hide');
        } else {
            jQuery('.beam-spotlight').removeClass('hide');
        }

    });

    //Fancybox
    if (jQuery('[data-fancybox="gallery"]').length > 0) {
        jQuery('[data-fancybox="gallery"]').fancybox({
            toolbar: false
        });
    }

    barGraphLiFunc = function (obj) {
        jQuery('.m-m-highlights .tab-content .tab-pane ul li').each(function () {
            var $max = jQuery(this).attr('data-max'),
                $amt = jQuery(this).attr('data-amt'),
                $total = 0;
            $total = ($amt / $max) * 100;
            console.log($total);

            jQuery(this).attr('data-width', $total);
        });

        setTimeout(function () {
            jQuery(obj + " li").each(function () {
                var _currWidth = jQuery(this).data('width');
                jQuery(this).width(_currWidth + "%");
            });
        }, 100);
    }
    barGraphLiFunc('#category_tab1');

    renderAnountAnfYearInBar = function (obj) {
        jQuery(obj + " li").each(function () {
            //enter year and revenue
            var _currYear = jQuery(this).data('year');
            jQuery(this).find('.year').html(_currYear);
            jQuery(this).find('.amount').html('');
            var _currAmountRs = jQuery(this).data('rs');
            jQuery(this).find('.amount').append("<span class='rs show'>" + _currAmountRs + "</span>");
            var _currAmountDoller = jQuery(this).data('doller');
            jQuery(this).find('.amount').append("<span class='doller'>" + _currAmountDoller + "</span>");
        });
    }
    renderAnountAnfYearInBar('.m-m-highlights .tab-content');

    //M&M highlights graph animation
    jQuery('.m-m-highlights .tab-head a').on('click', function (e) {
        e.preventDefault();
        jQuery('.m-m-highlights .tab-content li').removeAttr('style');
        var _currHref = jQuery(this).attr('href');
        jQuery('.m-m-highlights .tab-head a').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.m-m-highlights .tab-content .tab-pane').removeClass('show active');
        jQuery('.m-m-highlights .tab-content').find(_currHref).addClass('show active');
        barGraphLiFunc(_currHref);
    });

    jQuery('.radio-container .radio label').on('click', function () {
        var _currentCurrency = jQuery(this).data('amount');
        jQuery('.m-m-highlights .tab-content').find('.amount span').toggleClass('show');
        // jQuery('.m-m-highlights .tab-content').find('.amount .' + _currentCurrency).removeClass('hide').addClass('show');
        jQuery('.m-m-highlights .tab-content li').removeAttr('style');
        var _currHref = jQuery('.m-m-highlights .tab-head a.active').attr('href');
        barGraphLiFunc(_currHref);
        console.log(_currHref)
    });

    if (jQuery('.m-m-highlights').length) {
        const target = document.querySelector('.m-m-highlights .tab-content');
        function handleIntersection(entries) {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    jQuery('.m-m-highlights .tab-content .tab-pane.show li').each(function () {
                        var _currWidth = jQuery(this).data('width');
                        jQuery(this).width(_currWidth + "%");
                    });
                } else {
                    jQuery('.m-m-highlights .tab-content li').removeAttr('style');
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection);
        observer.observe(target);
    }
    jQuery('#graph-dropdown-mobile').on('change', function (e) {
        e.preventDefault();
        var _currHref = jQuery(this).val();
        jQuery('.m-m-highlights .tab-content .tab-pane').removeClass('show active');
        jQuery('.m-m-highlights .tab-content').find(_currHref).addClass('show active');
        barGraphLiFunc(_currHref);
    });

    // our-story key event multiple image start here
    jQuery('.key-event-wrap .key-event-main-slider .slides .key-moments-list ul li').on('click', function () {
        if (jQuery(this).attr('data-slide-img') != '' || jQuery(this).attr('data-slide-img') != undefined) {
            jQuery(this).parents('.align-items-center').find('img').attr('src', jQuery(this).attr('data-slide-img'));
        }
    })
    // our-story key event multiple image end here

    // filter add class active
    jQuery('.mr-section .media-left-nev ul li a').on('click', function () {
        jQuery(this).parents('ul').find('a').removeClass('active');
        jQuery(this).addClass('active');
    });


    // mob filter drop down
    // if (vw < 767) {
    //     jQuery('.mob-dropdown .mob-drop-span').on('click', function () {

    //         if (jQuery(this).hasClass('open-drop')) {
    //             jQuery(this).removeClass('open-drop');
    //             jQuery(this).parents('.mob-dropdown').find('.nav').slideUp();
    //         } else {
    //             jQuery(this).addClass('open-drop');
    //             jQuery(this).parents('.mob-dropdown').find('.nav').slideDown();
    //         }
    //     });

    //     jQuery('.mob-dropdown .nav li').on('click', function () {
    //         jQuery(this).parents('.mob-dropdown').find('.mob-drop-span').removeClass('open-drop');
    //         jQuery(this).parents('.mob-dropdown').find('.nav').slideUp();

    //         jQuery(this).parents('.mob-dropdown').find('.mob-drop-span').text(jQuery(this).text());
    //     });

    // }

    jQuery('.pagination li a').on('click', function () {
        AOS.refresh();
    })

    if (vw < 767) {
        jQuery('.mob-select-grp').on('change', function () {
            jQuery('#myTab a').attr('href', this.value).click();
        });
    }


});

var windowWidth = jQuery(window).width();
var slideVisible = 10;

jQuery(window).on('load', function () {
    resizeMethod();

    var winW = jQuery(window).width();
    //Remove loader onload
    setTimeout(function () {

        AOS.refresh();
        jQuery(".spotlight-home-wrap .swiper-slide-active .content").removeClass('active');
        TweenMax.to(jQuery('.spotlight-home-wrap .swiper-slide-active .content small'), 0, { autoAlpha: 0, y: 10 });
        TweenMax.to(jQuery('.spotlight-home-wrap .swiper-slide-active .content h2'), 0, { autoAlpha: 0, y: 20 });
        TweenMax.to(jQuery('.spotlight-home-wrap .swiper-slide-active .content p'), 0, { autoAlpha: 0, y: 40 });
        TweenMax.to(jQuery('.spotlight-home-wrap .swiper-slide-active .content .btn'), 0, { autoAlpha: 0, y: 60 });
        TweenMax.to(jQuery('.spotlight-home-wrap .swiper-slide-active .content .date'), 0, { autoAlpha: 0, y: 80 });

        TweenMax.to(jQuery(".site-loader .logo-wrap"), 1.3, { autoAlpha: 0, y: "-30%", ease: "power4.inOut" });
        TweenMax.to(jQuery(".site-loader"), 1.5, { height: 0, y: "-30%", ease: "power4.inOut" });
        TweenMax.to(jQuery(".home-spotlight-loader"), 1.5, {
            height: 0, ease: "expo.inOut", delay: 0.1, onComplete: function () {
                jQuery(".spotlight-home-wrap .swiper-slide-active .content").addClass('active');
            }
        });

        TweenMax.to(jQuery(".main-header.loader .bind"), 0.5, { autoAlpha: 1, y: 0, delay: 1.4 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-slide-active .content small"), 1, { autoAlpha: 1, y: 0, delay: 1.5 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-slide-active .content h2"), 1, { autoAlpha: 1, y: 0, delay: 1.7 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-slide-active .content p"), 1, { autoAlpha: 1, y: 0, delay: 1.75 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-slide-active .content .btn"), 1, { autoAlpha: 1, y: 0, delay: 1.8 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-slide-active .content .date"), 1, { autoAlpha: 1, y: 0, delay: 2 });

        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-pagination"), 1, { autoAlpha: 1, y: 0, delay: 2 });
        TweenMax.to(jQuery(".spotlight-home-wrap .swiper-button-prev, .spotlight-home-wrap .swiper-button-next"), 1, { autoAlpha: 1, y: 0, delay: 2.05 });

        // jQuery('.img-check img:eq(0)').attr('src', jQuery('.img-check img:eq(0)').attr('data-img-vertical'));
        // jQuery('.img-check img:eq(1)').attr('src', jQuery('.img-check img:eq(1)').attr('src'));
        // jQuery('.img-check img:eq(2)').attr('src', jQuery('.img-check img:eq(2)').attr(' data-img-horizontal'));

        // our story 
        if (winW > 767) {
            jQuery('.discoverSection.newsroomstories .discover-block:nth-child(1) .discoverImg img').attr('src', jQuery('.discoverSection.newsroomstories .discover-block:nth-child(1) .discoverImg img').attr('data-img-big'));
            jQuery('.discoverSection.newsroomstories .discover-block:nth-child(3) .discoverImg img').attr('src', jQuery('.discoverSection.newsroomstories .discover-block:nth-child(3) .discoverImg img').attr('data-img-vertical'));
            jQuery('.discoverSection.newsroomstories .discover-block:nth-child(4) .discoverImg img').attr('src', jQuery('.discoverSection.newsroomstories .discover-block:nth-child(4) .discoverImg img').attr('data-img-horizontal'));

            jQuery('.latest-stories .grid-layout .slides:eq(0) .wrap .image-wrap img').attr('src', jQuery('.latest-stories .grid-layout .slides:eq(0) .wrap .image-wrap img').attr('data-img-big'));
        }

        jQuery('.discoverSection.newsroomstories .discover-block:nth-child(2) .discoverLink .date .iconImg img').attr('src', jQuery('.discoverSection.newsroomstories .discover-block:nth-child(2) .discoverLink .date .iconImg img').attr('data-svg'));

        // newsroom page story section
        jQuery('.newsroom-story-sec .slides:eq(1) .grid-box .image img').attr('src', jQuery('.newsroom-story-sec .slides:eq(1) .grid-box .image img').attr('data-img-big'));
        jQuery('.newsroom-story-sec .slides:eq(2) .grid-box .image img').attr('src', jQuery('.newsroom-story-sec .slides:eq(2) .grid-box .image img').attr('data-img-horizontal'));

        // newsroom news
        jQuery('.press-release-search .discoverSection.newsroomnews .discover-block:nth-child(3) .discoverImg img').attr('src', jQuery('.press-release-search .discoverSection.newsroomnews .discover-block:nth-child(3) .discoverImg img').attr('data-img-horizontal'));


        jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(0)').attr('src', jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(0)').attr('data-img-vertical'));
        jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(3)').attr('src', jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(3)').attr('data-img-horizontal'));
        jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(6)').attr('src', jQuery('.press-release-search .search-list li .grid-box .thumb-img:eq(6)').attr('data-img-vertical'));

        jQuery('.press-release-search .search-list li .grid-box .wrap .image-wrap img').each(function () {
            if (((jQuery(this).attr('data-img-vertical') == undefined) || (jQuery(this).attr('data-img-vertical') == "")) && ((jQuery(this).attr('data-img-horizontal') == undefined) || (jQuery(this).attr('data-img-horizontal') == "")) && ((jQuery(this).attr('src') == undefined) || (jQuery(this).attr('src') == ""))) {
                jQuery(this).remove();
            }
        });

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];

        if (lastpart == 'regulatory-filings' || lastpart == 'policies-and-documents' || lastpart == 'sustainability') {
            // jQuery('html,body').animate({
            //     scrollTop: jQuery("section.section.search-component").offset().top
            // }, 200);
        }

        jQuery('img').attr('oncontextmenu', 'return false;');


    }, 500);


    // press release
    // jQuery('.press-release-search .search-list li .grid-box .wrap').each(function(){
    //     jQuery(this).parents('.grid-box').addClass(jQuery(this).attr('class'));
    //     jQuery(this).parents('.grid-box').removeClass('wrap');
    // });
    // // jQuery('.grid-box.information-technology:eq(2)').addClass('active');

    // jQuery('.press-release-search .search-list li .grid-box.information-technology').each(function () {
    //     var $catIndex = jQuery(this).index();
    //     console.log($catIndex);
    // });
    // var $catIndex = jQuery('.grid-box.information-technology').index();




    // var counted = 0;
    // $(window).scroll(function() {

    //     if (jQuery('.m-m-highlights .tab-content.aos-init').hasClass('aos-animate')) {

    //         jQuery('.m-m-highlights .tab-content .tab-pane ul li .year').each(function() {
    //         var $this = jQuery(this),
    //         // countTo = $this.attr('data-count');
    //         countTo = $this.text(); 
    //         console.assert;ongamepadconnected(countTo)
    //     jQuery({
    //         countNum: $this.text()
    //       }).animate({
    //           countNum: countTo
    //         },

    //         {

    //           duration: 20000,
    //           easing: 'swing',
    //           step: function() {
    //             $this.text(Math.floor(this.countNum));
    //           },
    //           complete: function() {
    //             $this.text(this.countNum);
    //             //alert('finished');
    //           }

    //         });
    //     });
    //     counted = 1;
    //   }

    // });




});
jQuery(window).on('resize', function () {
    resizeMethod();
    setTimeout(function () {
        AOS.refresh();
    }, 200);
});


function resizeMethod() {
    var tabWidth = 0;
    if (windowWidth < 992 && windowWidth > 767) {
        slideVisible = 6;
    }
    if (windowWidth < 768) {
        slideVisible = 3;
    }
    if (viewport().width < 960) {
        jQuery('.view-also-mob').html('');
        let clone = jQuery('.view-also').clone();
        jQuery('.view-also-mob').append(clone);

        jQuery('.tab-nav .nav li').each(function () {
            tabWidth += jQuery(this).outerWidth();
        });

        if (tabWidth > jQuery('.tab-nav .nav').width()) {
            jQuery('.tab-nav .nav ').addClass('justify-center')
        }
    }
    if (!jQuery('.banner-404 > h2').hasClass('desk-hide')) {
        let heading404 = jQuery('.banner-404 .section-header h2').clone().addClass('desk-hide');
        jQuery('.banner-404').append(heading404);
    }

    if (jQuery('.two-column-slider').length) {
        jQuery('.two-column-slider').each(function () {
            console.log(jQuery(this).find('.discover-block').length)
            if (jQuery(this).find('.discover-block').length < 3 && jQuery(this).find('.discover-block').length > 0) {
                jQuery(this).addClass('hide-nav-dots');
            } else {
                jQuery(this).removeClass('hide-nav-dots');
            }
        })
    }
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] };
}