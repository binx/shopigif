/*==========================*/
/* customStyle plugin */
/* By Adam Coulombe */
/* Modified version of https://github.com/adamcoulombe/jquery.customSelect */
/* Lightweight, unobtrusive, custom style select boxes with jQuery */
/*==========================*/

(function($){
$.fn.extend({
customStyle : function(options) {
  if(!$.browser.msie || ($.browser.msie&&$.browser.version>7)){
    return this.each(function() {
      var currentSelected = $(this).find(':selected');
      var html = currentSelected.html();
      if(!html){ html=(options && options.empty ? options.empty : '&nbsp;'); }
      $(this).after('<span class="custom-style-select-box"><span class="custom-style-select-box-inner">'+html+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
      var selectBoxSpan = $(this).next();
      var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) -parseInt(selectBoxSpan.css('padding-right'));
      var selectBoxSpanInner = selectBoxSpan.find(':first-child');
      selectBoxSpan.css({display:'inline-block'});
      selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
      var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
      $(this).width(selectBoxWidth+30).height(selectBoxHeight).change(function(){
      // selectBoxSpanInner.text($(this).val()).parent().addClass('changed');  This was not ideal
      selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
      // Thanks to Juarez Filho & PaddyMurphy
      });
    });
  }
}
});
})(jQuery);

/*==========================*/
/* imagesLoaded plugin */
/*==========================*/

/*
 * jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);

/*!
 * jQuery Smooth Scroll Plugin v1.4.5
 *
 * Date: Sun Mar 11 18:17:42 2012 EDT
 * Requires: jQuery v1.3+
 *
 * Copyright 2012, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
*/
(function(b){function m(c){return c.replace(/(:|\.)/g,"\\$1")}var n=function(c){var e=[],a=false,d=c.dir&&c.dir=="left"?"scrollLeft":"scrollTop";this.each(function(){if(!(this==document||this==window)){var g=b(this);if(g[d]()>0)e.push(this);else{g[d](1);a=g[d]()>0;g[d](0);a&&e.push(this)}}});if(c.el==="first"&&e.length)e=[e.shift()];return e},o="ontouchend"in document;b.fn.extend({scrollable:function(c){return this.pushStack(n.call(this,{dir:c}))},firstScrollable:function(c){return this.pushStack(n.call(this,
{el:"first",dir:c}))},smoothScroll:function(c){c=c||{};var e=b.extend({},b.fn.smoothScroll.defaults,c),a=b.smoothScroll.filterPath(location.pathname);this.die("click.smoothscroll").live("click.smoothscroll",function(d){var g={},i=b(this),f=location.hostname===this.hostname||!this.hostname,h=e.scrollTarget||(b.smoothScroll.filterPath(this.pathname)||a)===a,k=m(this.hash),j=true;if(!e.scrollTarget&&(!f||!h||!k))j=false;else{f=e.exclude;h=0;for(var l=f.length;j&&h<l;)if(i.is(m(f[h++])))j=false;f=e.excludeWithin;
h=0;for(l=f.length;j&&h<l;)if(i.closest(f[h++]).length)j=false}if(j){d.preventDefault();b.extend(g,e,{scrollTarget:e.scrollTarget||k,link:this});b.smoothScroll(g)}});return this}});b.smoothScroll=function(c,e){var a,d,g,i;i=0;d="offset";var f="scrollTop",h={},k=false;g=[];if(typeof c==="number"){a=b.fn.smoothScroll.defaults;g=c}else{a=b.extend({},b.fn.smoothScroll.defaults,c||{});if(a.scrollElement){d="position";a.scrollElement.css("position")=="static"&&a.scrollElement.css("position","relative")}g=
e||b(a.scrollTarget)[d]()&&b(a.scrollTarget)[d]()[a.direction]||0}a=b.extend({link:null},a);f=a.direction=="left"?"scrollLeft":f;if(a.scrollElement){d=a.scrollElement;i=d[f]()}else{d=b("html, body").firstScrollable();k=o&&"scrollTo"in window}h[f]=g+i+a.offset;a.beforeScroll.call(d,a);if(k){g=a.direction=="left"?[h[f],0]:[0,h[f]];window.scrollTo.apply(window,g);a.afterScroll.call(a.link,a)}else{i=a.speed;if(i==="auto"){i=h[f]||d.scrollTop();i/=a.autoCoefficent}d.animate(h,{duration:i,easing:a.easing,
complete:function(){a.afterScroll.call(a.link,a)}})}};b.smoothScroll.version="1.4.4";b.smoothScroll.filterPath=function(c){return c.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")};b.fn.smoothScroll.defaults={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2}})(jQuery);

$(function(){

/*==========================*/
/* Global Variables */
/*==========================*/

var   THE_BODY              = $('body'),
      HEADER                = $('#header'),
      FOOTER                = $('#footer'),
      IS_INDEX              = (THE_BODY.hasClass('template-index')) ? true : false,
      IS_COLLECTION         = (THE_BODY.hasClass('template-collection')) ? true : false,
      IS_COLLECTION_LISTING = ($('#collection-list').length > 0) ? true : false,
      IS_PRODUCT            = (THE_BODY.hasClass('template-product')) ? true : false,
      IS_BLOG               = (THE_BODY.hasClass('template-blog')) ? true : false,
      IS_ARTICLE            = (THE_BODY.hasClass('template-article')) ? true : false,
      IS_SEARCH             = (THE_BODY.hasClass('template-search')) ? true : false,
      IS_CART               = (THE_BODY.hasClass('template-cart')) ? true : false,
      HAS_LOGO              = (HEADER.hasClass('use-logo')) ? true : false,
      BE_WIDE               = (HEADER.hasClass('wide')) ? true : false,
      HAS_CURRENCIES        = (HEADER.hasClass('currencies')) ? true : false,
      HAS_TWITTER           = (FOOTER.hasClass('has-twitter')) ? true : false,
      IS_IE                 = ($.browser.msie) ? true : false,
      PRODUCT_IMAGE_W_TO_H_RATIO = product_image_w_to_h_ratio || 1,
      THREE_PER_ROW_W       = 268,
      FOUR_PER_ROW_W        = 191,
      THREE_PER_ROW_H       = parseInt(THREE_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,  10),
      FOUR_PER_ROW_H        = parseInt(FOUR_PER_ROW_W/PRODUCT_IMAGE_W_TO_H_RATIO,   10);

$('html').removeClass('no-js');

/* Global JS */
/*==========================*/

/* loadImages function */
/* elems are the images, and ch is the container height */
/* Sizes image appropriately to fill as much of the container as possible
   without cropping it, and making sure the image is vertically aligned */
var loadImages = function(elems, ch) {

    $(elems).each(function(){
        $(this).imagesLoaded( function() {
            var i_w = $(this).width();  // image width
            var i_h = $(this).height(); // image height
            var c_h = ch;               // container height
            var v_o = (c_h - i_h) / 2;  // vertical offset            
            if ( i_h > c_h ) {
                $(this).css('height',ch).css('width','auto');
            } else {
                $(this).css('margin-top',v_o);
            }   
            $(this).fadeTo(200,1); // reveals image with a 200 ms-lomg fade-in.
        });
    });
}

/* Custom Select Styling */
/*==========================*/
$('select').not('#product-select, .single-option-selector').addClass('special-select').customStyle();

/* Snippet JS */
/*==========================*/

/* Additional Products */
loadImages('.related-products-list img',FOUR_PER_ROW_H);

/* Layout JS */
/*==========================*/

/* Handle footer */
$('#footer-modules li:last-child').css('margin-right', 0)

/* Handle Cart Total */
var char_elem = $('#cart-price');
var char_count = char_elem.text().length;

if (char_count <= 5) { char_elem.css('opacity',1); }
if (char_count >= 6) { char_elem.css('font-size', '18px').css('opacity',1) }
if (char_count >= 7) { char_elem.css('font-size', '15px').css('opacity',1) }
if (char_count >= 8) { char_elem.css('font-size', '13px').css('opacity',1) }
if (char_count >= 9) { char_elem.css('font-size', '11px').css('opacity',1) }

/* Format Navigation */
/* Will the nav bar be on the right of the logo or site title,
   or will it be below and full width */
   
var logo_title = $('#logo,#title');
var nav_width = 0;
var max_nav_width = 592;
var site_width = 884;
var nav_elem = $('#nav');
var nav_item = $('#nav .nav-item');
var hidden_header_items = $('#nav, #title, #logo');

// Calculating the width of all the links.
nav_item.each(function(){
    nav_width += $(this).outerWidth();
});

// If we have enough links, then we will have the logo or title
// above the menu. End of story.
if ( BE_WIDE || (nav_width >= max_nav_width) ) {
    HEADER.addClass('wide');
    hidden_header_items.css('visibility','visible');
}
// If we need to know the width of the logo or site title.
else {
    // If we have a logo.
    if (HAS_LOGO) {
        // The logo image,
        var logo = $('#logo img');
        // Its width.
        var logo_width = logo.width();
        var logo_height = logo.height();
        // If the logo was cached, yay!
        if (logo_width > 0) {
            if ((nav_width + logo_width) >= site_width) {
                HEADER.addClass('wide');
            }
            else {
                $('#nav').css('marginTop', logo_height*0.45 +20);
            }
            hidden_header_items.css('visibility','visible');
        }
        // If not, we need to wait till it is loaded...
        else {
            // Waiting...
            logo.load(function() {
                var logo_width = $(this).width();
                var logo_height = $(this).height();
                if ((nav_width + logo_width) >= site_width) {
                    HEADER.addClass('wide');
                }
                else {
                    $('#nav').css('marginTop', logo_height*0.45 +20);
                }
                hidden_header_items.css('visibility','visible');
            });
        }
    }
    // If we have a site title.
    else {
        var title_width = logo_title.width();
        if ((nav_width + title_width) >= site_width) {
            HEADER.addClass('wide');
        }
        hidden_header_items.css('visibility','visible');    
    }
}

/* Twitter Formatting Functions */
function linkifyTweet(tweetText) {
    return tweetText
    .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&?!\-\/]))?)/gi,'<a href="$1">$1</a>')
    .replace(/(^|\s)#(\w+)/g,'$1<a href="http://search.twitter.com/search?q=$2">#$2</a>')
    .replace(/(^|\s)@(\w+)/g,'$1<a href="http://twitter.com/$2">@$2</a>');
}

function relativeTime(time_value) {
    var parsed_date = parseDate(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    if(delta < 60) {
        return 'less than a minute ago';
    } else if(delta < 120) {
        return 'about a minute ago';
    } else if(delta < (45*60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if(delta < (90*60)) {
        return 'about an hour ago';
    } else if(delta < (24*60*60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}

function parseDate(str) {
    var v=str.split(' '), year, time;
    // date string from tumblr's tweet data is slightly different from twitter timeline data
    if (/\+0000/.test(v[5])) {
        year = v[3];
        time = v[4]
    } else {
        year = v[5]
        time = v[3]
    }
    return new Date(Date.parse(v[1]+" "+v[2]+", "+year+" "+time+" UTC"));
}

/* Grab Twitter Feed */ 
function init_twitter() {

    $.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?screen_name='+ twitterID +'&count=1&callback=?&include_rts=true', function(data){
        var tweet = data[0];
        var tweetID = tweet.id_str;
        var tweetText = linkifyTweet(tweet.text);
        var timeago = relativeTime(tweet.created_at);
        var permalink = 'http://twitter.com/pixelunion/status/' + tweetID;
        var fullname = tweet.user.screen_name;
        var output  = $('<p class="tweet">' + tweetText + '</p>');
        var timestamp = $('<a class="timestamp accent-text" href="' + permalink + '" time="' + tweet.created_at + '" target="_blank">' + timeago + '</a>');
        var user = $('<a href="http://www.twitter.com/'+ twitterID +'" class="twitter-name">'+ fullname +'</a>');
        var twitter_avatar = $('<img src="'+ tweet.user.profile_image_url_https +'">');
        
        output.appendTo('.tweet-area');
        user.appendTo('.twitter-names');
        timestamp.appendTo('.twitter-names');
        twitter_avatar.appendTo('.twitter-avatar');
        
    });
}

/* Initialize Twitter */
if ( HAS_TWITTER ) {
    init_twitter();
}


/* Index JS */
/*==========================*/

if (IS_INDEX) {

    if (slideshow) {
        /* Slideshow */

        var container_width = 884;
        var main_slider = $('#slides');
        var slide_count = $('.slide').length;
        var main_slider_width = slide_count * container_width;

        main_slider.css('width', main_slider_width);
        
        if (slide_count > 1) {
            for (i=1;i<=slide_count;i++) {
                $('<li>', {
                    id:'slide-control-' + i,
                    'class':'slide-control'
                    }).appendTo('#slideshow-controls').html('&#8226;');
            }
        } else {
            $('#slideshow-controls').remove();
        }


        if (slideshow_auto && slide_count > 1 ) {
            /* Auto Slide */
            function autoSlide() {
                var current_slide = $('.slide-control.active');
                var current_slide_index = current_slide.index();

                if (current_slide_index != (slide_count - 1)) {
                    var elem = current_slide.next();
                    var slider_distance = (elem.index() * container_width) * -1;
                    $('#slides').animate({
                        marginLeft: slider_distance
                    });
                    $('.slide-control').removeClass('active');
                    elem.addClass('active');
                } else {
                    var elem = $('.slide-control').eq(0);
                    var slider_distance = (elem.index() * container_width) * -1;
                    $('#slides').animate({
                        marginLeft: slider_distance
                    });
                    $('.slide-control').removeClass('active');
                    elem.addClass('active');
                }
            }

            function init_auto_slide() {
                startAutoSlide = setInterval(autoSlide,slideshow_speed);
            };
            init_auto_slide();

        }

        $('.slide-control').click(function(){

            if (slideshow_auto == true) {
                clearInterval(startAutoSlide);
            }

            var elem = $(this);
            var slider_distance = (elem.index() * container_width) * -1;
            $('#slides').animate({
                marginLeft: slider_distance
            });
            $('.slide-control').removeClass('active');
            elem.addClass('active');
        });

        $('#slide-control-1').addClass('active');

        /* Resize Video */
        var $allVideos = $("#slides iframe[src^='http://www.youtube.com'], #slides iframe[src^='http://player.vimeo.com']");
        var newHeight = 490;
        $allVideos.each(function(){
            var aspect_ratio = this.width / this.height;
            $(this)
            .removeAttr('height')
            .removeAttr('width')
            .height(newHeight)
            .width(newHeight * aspect_ratio);
        });
            
    } // END of if (slideshow)

    /* Product Slider */

    /*
    Pay careful attention to the difference between "mini_slider" 
    which is the entire slider, and "mini_slide" which denotes 
    an individual slide
    */

    var mini_slider = $('#mini-slides');
    var mini_slide_count = $('#mini-slides > li').length;
    var mini_slide_width = THREE_PER_ROW_W;
    var mini_slide_margin = 40;
    var mini_slide_total_width = mini_slide_width + mini_slide_margin;
    var mini_slider_distance = mini_slide_total_width * 3;
    var mini_slider_width = mini_slide_count * mini_slide_total_width;
    var current_position = 0;

    /* Set Slider Width */
    mini_slider.css('width', mini_slider_width);

    /* Preload and Format Images */
    loadImages('#mini-slides .three-per-row img',THREE_PER_ROW_H);
    loadImages('#mini-slides .four-per-row img',FOUR_PER_ROW_H);

    /* Next / Prev Function */

    var mini_slide_action = function(direction) {
        var animating = ($(mini_slider).filter(':animated').length) ? true : false;
        current_position = parseFloat(mini_slider.css('margin-left'));
        var more_to_load = ( (mini_slider_width - (current_position * -1)) > mini_slider_distance ) ? true : false;

        if (!animating && direction == 'next' && more_to_load) {
            mini_slider.animate({
                marginLeft: '-=' + mini_slider_distance
            },400, 'swing',function(){
                current_position = parseFloat(mini_slider.css('margin-left'));
                more_to_load = ( (mini_slider_width - (current_position * -1)) > mini_slider_distance ) ? true : false;

                $('#mini-slider-prev').fadeIn(200);
                if (more_to_load == false) {
                    $('#mini-slider-next').fadeOut(200);
                }
            });

        }
        if (!animating && direction == 'prev' && current_position != 0 ) {
            mini_slider.animate({
                marginLeft: '+=' + mini_slider_distance
            },400,'swing',function(){

                current_position = parseFloat(mini_slider.css('margin-left'));

                $('#mini-slider-next').fadeIn(200);
                if (current_position == 0) {
                    $('#mini-slider-prev').fadeOut(200);
                }
            });

        }
    }
    
    if ( mini_slide_count <= 3 ) {
        $('#mini-slider-next').hide();
    }
    
    /* Auto hide prev */
    $('#mini-slider-prev').hide();

    /* Next */
    $('#mini-slider-next').click(function(){
        mini_slide_action('next');
        return false;
    });

    /* Prev */
    $('#mini-slider-prev').click(function(){
        mini_slide_action('prev');
        return false;
    });


    /* Front Page Product List */

    /* Preload and Format Images */
    loadImages('#fp-product-list .four-per-row img', FOUR_PER_ROW_H);
    loadImages('#fp-product-list .three-per-row img', THREE_PER_ROW_H);

    /* Set equal row heights */
    var golden_height = 0;
    $('#fp-product-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    // TAKING OUT HEIGHT FOR INDEX PRODUCTS
    
    // $('#fp-product-list li').css('height',golden_height);

} // END of IS_INDEX

 /* Collection JS */
/*==========================*/
if (IS_COLLECTION) {

    /* Preload and Format Images */
    loadImages('#coll-product-list .four-per-row img',FOUR_PER_ROW_H);
    loadImages('#coll-product-list .three-per-row img',THREE_PER_ROW_H);

    var golden_height = 0;
    $('#coll-product-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    $('#coll-product-list li').css('height',golden_height);

} // END of IS_COLLECTION

/* Collection Listing JS */
/*==========================*/
if (IS_COLLECTION_LISTING) {

    /* Preload and Format Images */
    loadImages('#collection-list .four-per-row img',FOUR_PER_ROW_H);
    loadImages('#collection-list .three-per-row img',THREE_PER_ROW_H);

    var golden_height = 0;
    $('#collection-list li').each(function(i){
        if ($(this).height() > golden_height) {
            golden_height = $(this).height();
        }
    });

    $('#collection-list li').css('height',golden_height);

} // END of IS_COLLECTION_LISTING



/* Product JS */
/*==========================*/
if (IS_PRODUCT) {

    // Activate "Add Medallion"
    $('#product-add-medallion').click(function(){
        $('#add').click();
    });

    // PRODUCT VIEWER

    // Format Thumbnails
    loadImages('.product-photo-thumb img',114);

    // Activate Colorbox
    $('a.gallery').colorbox( {
        rel:'gallery',
        maxWidth:"95%",
        maxHeight:"95%",
        scalePhotos:true} );

    var product_container = $('#product-photo-container');      

    // Initialize first photo
    product_container.find('img:first').imagesLoaded(function(){
        var elem = $(this);
        elem.addClass('active').fadeIn(100);
        product_container.css('height',elem.height());
        elem.parent().css( {'height':elem.height(), 'width':elem.width()} );
    });

    // Display new photo
    $('.product-photo-thumb').click(function(){

        var active_index = $(this).index();
        var photo_to_show = product_container.find('img').eq(active_index);
        var photo_to_hide = product_container.find('.active');

        photo_to_hide.fadeOut(100, function(){
            photo_to_hide.removeClass('active');
            photo_to_hide.parent().css( {'height':0, 'width':0} );
            var photo_to_show = product_container.find('img').eq(active_index);
            photo_to_show.imagesLoaded(function(){
                product_container.animate({height:photo_to_show.height()},200,function(){
                    photo_to_show.fadeIn(100, function(){
                        $(this).addClass('active');
                        $(this).parent().css( {'height':$(this).height(), 'width':$(this).width()} );
                    });
                });
            });
        });

    }); 

} // END of IS_PRODUCT

                    
/* Placeholder JS */
/*==========================*/

$('[placeholder]').each(function(){
    if ($(this).val() === '') {
        var hint = $(this).attr('placeholder');
        $(this).val(hint).addClass('hint');
    }
});

$('[placeholder]').focus(function() {
    if ($(this).val() === $(this).attr('placeholder')) {
        $(this).val('').removeClass('hint');
    }
}).blur(function() {
    if ($(this).val() === '') {
        $(this).val($(this).attr('placeholder')).addClass('hint');
    }
});                    

/* Form validation JS */
/*==========================*/

$('input.error, textarea.error').focus(function() {
    $(this).removeClass('error');
});

$('form :submit').click(function() {
    $(this).parents('form').find('input.hint, textarea.hint').each(function() {
        $(this).val('').removeClass('hint');
    });
    return true;
});

/* Cart.liquid */
/*==========================*/
                    
if (IS_CART) {
    
    /* This auto-saves cart attribute and cart note.
       This will save quantity edits too.
       See this: http://wiki.shopify.com/Ask_customer_for_additional_information#My_clients_fill_up_the_cart_attributes.2C_but_they_are_not_saved._When_they_leave_the_cart_page_and_come_back.2C_the_boxes_previously_filled-up_are_empty._How_can_I_fix_this.3F */
    $(window).unload(function() {
        var params = {
            type: 'POST',
            url: '/cart/update.js',
            data: $('form[action="/cart"]').serialize(),
            dataType: 'json',
            async: false
        };
        $.ajax(params);
    });

}

/* IE JS */
/*==========================*/
if (IS_IE) {
    $('#widgets li:last-child').css('border-bottom','none');
    $('#product-details li:last-child').css('border-bottom','none');
}

/* Multiple currencies */
/*==========================*/

if (HAS_CURRENCIES) {
    
    $('#currency-picker-toggle a').click(function() {
        $('#currency-picker-toggle').hide();
        $('#currencies-picker').fadeIn();
        return false;
    });

    $('#currencies-picker select').change(function() {
        $('#currencies-picker').hide();
        $('#currency-picker-toggle').fadeIn();
        return true;
    }).blur(function() {
        $('#currencies-picker').hide();
        $('#currency-picker-toggle').fadeIn();
        return true;
    });

}

/* Social sharing stats */
/*==========================*/

$('.share-stats').each(function(){
    var wrapper = $(this);
    var stats = '';
    var url = $(this).attr('data-url');
    $.when(
        $.getJSON('http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=' + url),
        $.getJSON("https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='" + url + "'&format=json")
    ).then(function(dataTwitter, dataFacebook) {
        var times = ' times ';
        var tweetCount = dataTwitter[0].count;
        var facebookCount = dataFacebook[0][0].total_count;
        if (tweetCount > 0) {
            times = ( tweetCount == 1 ) ? ' time ' : ' times ';
            stats += 'Retweeted '+tweetCount+times;
        }
        if (tweetCount > 0 && facebookCount > 0) {
            stats += ' and shared ';
        }
        else if (facebookCount > 0) {
            stats += ' Shared ';
        }
        if (facebookCount > 0) {
            times = ( facebookCount == 1 ) ? ' time ' : ' times ';
            stats += facebookCount + times + 'on Facebook';
        }
        wrapper.html(stats);
    });  
});

/* Lightbox ALL THE THINGS (images) in RTE-generated content */

if ($.isFunction($.fn.colorbox)) {
  // For all images added with the RTE that aren't linking to a page.
  $('.rte img').not('a > img').each(function() {
    // Matching images that aren't already shown in their original size.
    var re = /(_small)|(_compact)|(_medium)|(_large)|(_grande)/;
    var src = $(this).attr('src');
    if (re.test(src)) {
      // Determining the URL to the original image.
      var href = src.replace(re, '');
      // Activating lightbox.
      $(this).wrap('<a></a>')
        .parent()
        .attr('href', href)
        .addClass('lightbox')
        .colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            scalePhotos:true} );
    }
  });
  $('.lightbox').colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            scalePhotos:true} );
  $('.inline').colorbox( {
            maxWidth:"95%",
            maxHeight:"95%",
            inline:true} );
}

/* Smooth scrolling */
$('a').smoothScroll();

/* Follow along table of content */
/* http://css-tricks.com/scrollfollow-sidebar */

var $sidebar   = $(".follow-along"), 
    $window    = $(window),
    offset     = $sidebar.offset(),
    topPadding = 15;
    
    if ($sidebar.length) {
        $window.scroll(function() {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });    
    }
    
/* Open all external + PDF download links in a new browser tab */

$('a[href^="http"]')
  .not('a[href^="' + shop_url + '"]')
  .not('a[href^="' + Shopify.shop + '"]')
  .not('a[href^="http://static.shopify.com"]')
  .not('a[href^="http://cdn.shopify.com"]')
  .not('.lightbox')
  .attr('target', '_blank');

});
