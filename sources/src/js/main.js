$(function () {
    $('.menu-toggle').on('click', function () {
        $(this).toggleClass('active')
        $('.menu-list').slideToggle(250);
    })

    $('input[name="tel"]').mask("+7 (999) 999-99-99", {placeholder: '+7 (xxx) xxx-xx-xx'})

    $('.section-calculate__area-range').rangeslider({
        polyfill: false,
        rangeClass: 'section-calculate__area-range',
        disabledClass: 'rangeslider--disabled',
        horizontalClass: 'rangeslider--horizontal',
        verticalClass: 'rangeslider--vertical',
        fillClass: 'section-calculate__area-range-fill',
        handleClass: 'section-calculate__area-range-circle',

        onInit: function () {
            this.output = $('<div class="range-output" />').insertAfter(this.$range).html(this.$element.val());
        },
        onSlide: function (position, value) {
            this.output.html(value);
            $('#range-1').val(value);
            $('.range-output').css({
                left: position
            })
        }
    });

    $('.section-calculate__service-col-minus').on('click', function () {
        if (+$(this).prev('input[type="number"]').val() > 0) {
            $(this).next('input[type="number"]').val(+$(this).next('input[type="number"]').val() - 1);
        }
    })

    $('.section-calculate__service-col-plus').on('click', function () {
        $(this).prev('input[type="number"]').val(+$(this).prev('input[type="number"]').val() + 1);
    })

    $('.langs-block__active').on('click', function () {
        $('.lang-toggle').toggleClass('active')
        $(this).toggleClass('active')
    })

    $("#reviews__slider").slick({
        dots: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: $("button.section-reviews__arrow.arrow-prev"),
        nextArrow: $("button.section-reviews__arrow.arrow-next"),
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            }
        ]
    });

    $('.section-portfolio__slider').slick({
        centerMode: true,
        centerPadding: '39rem',
        prevArrow: $("button.section-portfolio__arrow.arrow-prev"),
        nextArrow: $("button.section-portfolio__arrow.arrow-next"),
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    centerPadding: '0rem',
                },
            },
            {
                breakpoint: 900,
                settings: {
                    centerPadding: '0rem',
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            }
        ]
    })

    $('.set-attr-popup').on('click', function (){
       let str = $(this).attr('data-set-attr-popup');
       $('.set-attr-val').attr('value', str);
       $('.popup-open-form').addClass('active');
    });


    $('.section-services-more__slider').slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        adaptiveHeight: false,
        prevArrow: $('button.section-services-more__arrow.arrow-prev'),
        nextArrow: $('button.section-services-more__arrow.arrow-next'),
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    centerPadding: "13.3rem"
                }
            },
            {
                breakpoint: 900,
                settings: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    centerPadding: "8rem"
                }
            }
        ]
    })
    $('.section-questions__item-header').on('click', function (){
        if($(this).hasClass('active')){
            $('.section-questions__item-header').removeClass('active');
            $('.section-questions__item-body').slideUp(250);
        }else{
            $('.section-questions__item-header').removeClass('active');
            $('.section-questions__item-body').slideUp(250);

            $(this).toggleClass('active');
            $(this).next('.section-questions__item-body').slideToggle(250);
        }
    })

    $('.section-questions__item-header').eq(0).click();


    $('[data-href]').on('click', function (event) {
        event.preventDefault()
        var getLink = $(this).attr("data-href");
        var positionElemY = $(getLink)[0].offsetTop;
        $('html').animate({scrollTop: positionElemY - 150}, 1100);
    })

    $('[data-popup]').on('click', function () {
        let str = $(this).attr('data-popup');

        $(`#${str}`).addClass('active');
    });


    $('.popup-close').on('click', function () {
        $('.popup').removeClass('active');
    });

    $('.open-popup-form').on('click', function () {
        $('.popup-open-form').addClass('active');
        $('.set-attr-val').attr('value', 'Форма из "заказать звонок"');
    });

    // if($(window))
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > $('#first-section').innerHeight()) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
            $('.menu-toggle').removeClass('active')
            $('.menu-list').slideUp(250);
        }
    })

    if($(window).innerWidth() < 767){
        $('.section-team__data').slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            prevArrow: $('button.section-team__arrow.arrow-prev'),
            nextArrow: $('button.section-team__arrow.arrow-next'),
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        autoplay: true,
                        autoplaySpeed: 2000,
                    }
                },
            ]
        })

        $('.section-equipment__data').slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            adaptiveHeight: true,
            prevArrow: $('button.section-equipment__arrow.arrow-prev'),
            nextArrow: $('button.section-equipment__arrow.arrow-next'),
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        autoplay: true,
                        autoplaySpeed: 2000,
                    }
                },
            ]
        })
    }

    function clickNotElement(elem, callback, e) {
        if (!elem.is(e.target) && elem.has(e.target).length === 0) {
            callback();
        }
    }

    $(document).mouseup(function (e) {
        clickNotElement($('.popup-services-0__inner'), function () {
            $('.popup-services-0').removeClass('active');
        }, e);
    });

})


var utms;

// Отправка формы
$(".ajax-submit").click(function (e) {
    var $form = $(this).closest('form');
    var $requireds = $form.find(':required');
    var formValid = true;

// проверяем объязательные (required) поля этой формы
    $requireds.each(function () {
        $elem = $(this);

// если поле пусто, то ему добавляем класс error
        if (!$elem.val() || !checkInput($elem)) {
            $elem.addClass('error');
            formValid = false;
        }
    });

    if (formValid) {
        // создаем скрытые поля для utm внутрии формы
        if (Object.keys(utms).length === 0) {
            utms['utm_source'] = "https://clean.dstrade.kz/ru/";
        }
    } else {
        e.preventDefault();
    }
});

$(".form-submit").on("submit", function (event) {
    event.preventDefault();

    const form = new FormData($(this)[0]);

    var valid = true;

    $('.no-valid').removeClass('no-valid')
    $('.yes-valid').removeClass('yes-valid')

    var noChars = ["!", "@", "№", "$", ";", "%", "^", ":", "&", "?", "*", "(", ")",
        "_", "-", "+", "=", "<", ">", "'", ",", "/", "|", "]", "[", "{", "}", "`", "~", "'",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "#"];

    if (form.has("tel")) {
        var str = form.get("tel")
        str = str.split("-").join("");
        str = str.split("(").join("");
        str = str.split(")").join("");
        str = str.split("+").join("");
        str = str.split(" ").join("");

        if (str.length != 11 && str.length != 1) {
            if (str.length != 11 && str.length != 1) {
                $(this).find("input[name='tel']").removeClass("yes-valid")
                $(this).find("input[name='tel']").next('.input-text-p').removeClass('yes-valid')
                $(this).find("input[name='tel']").addClass("no-valid");
                $(this).find("input[name='tel']").next('.input-text-p').addClass('no-valid')
                valid = false;
            } else {
                $(this).find("input[name='tel']").removeClass("no-valid")
                $(this).find("input[name='tel']").next('.input-text-p').removeClass('no-valid')
                $(this).find("input[name='tel']").addClass("yes-valid");
                $(this).find("input[name='tel']").next('.input-text-p').addClass('yes-valid')
            }

        }
    }


    if (form.has("email")) {
        var str = form.get("email");

        if (str) {
            if (str.indexOf('@') !== -1) {
                $(this).find("input[name='email']").addClass("yes-valid");
                $(this).find("input[name='email']").next('.input-text-p').addClass('yes-valid')
            } else {
                valid = false;
                $(this).find("input[name='email']").addClass("no-valid");
                $(this).find("input[name='email']").next('.input-text-p').addClass('no-valid')
            }
        } else {
            valid = false;
            $(this).find("input[name='email']").addClass("no-valid");
            $(this).find("input[name='email']").next('.input-text-p').addClass('no-valid')
        }
    }

    if (form.has("name")) {

        if (!form.get("name")) {
            $(this).find("input[name='name']").addClass("no-valid");
            $(this).find("input[name='name']").next('.input-text-p').addClass('no-valid')
            valid = false;
        }

        var str = form.get("name").split("");
        for (var i = 0; i < str.length; i++) {
            for (var i1 = 0; i1 < noChars.length; i1++) {
                if (str[i] === noChars[i1]) {
                    $(this).find("input[name='name']").removeClass("yes-valid");
                    $(this).find("input[name='name']").next('.input-text-p').removeClass('yes-valid')
                    $(this).find("input[name='name']").addClass("no-valid");
                    $(this).find("input[name='name']").next('.input-text-p').addClass('no-valid')
                    valid = false;
                } else {
                    $(this).find("input[name='name']").removeClass("no-valid");
                    $(this).find("input[name='name']").next('.input-text-p').removeClass('no-valid')
                    $(this).find("input[name='name']").addClass("yes-valid");
                    $(this).find("input[name='name']").next('.input-text-p').addClass('yes-valid')
                }
            }
        }
    }

    if (valid) {
        if (utms) {
            var outUtms = '';
            for (var key in utms) {
                outUtms += (key + " - " + utms[key] + "\n");
            }
            form.append("utms", outUtms);
        }


        const xml = new XMLHttpRequest();
        xml.open("POST", "../ru/php/form.php");
        xml.send(form);

        xml.onload = () => {
            if (xml.status != 200) {
                $('#popup-error').addClass('active');
            } else {
                window.open('../ru/thanks.html');
                $(this).find("input[type='text']").val("");
            }
        }
    }
})


setTimeout(function(){
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src = '//api-maps.yandex.ru/2.1/?load=package.standard&lang=ru-RU&onload=getYaMap';
    document.getElementsByTagName('body')[0].appendChild(elem);
}, 2000);

function getYaMap(){
    var myMap = new ymaps.Map("map",{center: [43.285063, 76.923313],zoom: 17});
    myMap.geoObjects.add(new ymaps.Placemark([43.285063, 76.923313], {
        }, {
            // preset: 'islands#greenDotIconWithCaption',
            // iconColor: '#1EAFCF',
            iconImageHref: '../images/content/icon/map-icon.svg', // Адрес до картинки
            iconImageSize: [140, 140],
            iconImageOffset: [-5, -38]
        }))

}