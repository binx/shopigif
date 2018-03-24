$(document).ready(function(){

var
	win = $(window),
	nav = $('#main-nav'),
	logo = $('#logo'),
	resizeHeight = $('.resize-height'),
	spriteBg = $('.sprite-bg'),
	containerContent = $('.home-container > .content'),
	gifContainers = $('.sprite-bg'),
	scrollButtons = $('.cta > .scroll-button');

var
	rHeight = 0,
	vertY = 0,
	parent,
	isWide,
	size;

var
	spriteCols = 5,
	spriteRows = 5,
	widePercent = 100 * spriteCols,
	tallPercent = 100 * spriteRows,
	maxFrames = spriteCols * spriteRows,
	spriteSize = 480,
	row = 0,
	col = 0,
	xOff = 0,
	yOff = 0;


function doResize() {

	//Resize Section containers
	resizeHeight.each(function(){
		rHeight = win.height() * ($(this).attr('data-height')/100);
		$(this).css('min-height', rHeight);
	});

	//Resize background image in each
	spriteBg.each(function(){
		parent = $(this).parent();
		isWide = (parent.width() > parent.height())
		size = isWide ? parent.width() : parent.height();

		$(this).width(size).height(size).css({
			'top' : 'calc(50% - '+(size/2)+'px)',
			'left' : 'calc(50% - '+(size/2)+'px)'
		})

		$(this).children('img').each(function(){
			$(this).attr('width', widePercent+'%').attr('height', tallPercent+'%')
		})
	})

	if ($("body").hasClass("index")) $("#content").height($(document).height());

	// Do vertical centering of content
	containerContent.each(function(){
		if ($(this).hasClass('vertical-center')) {
			vertY = ($(this).parent().height() - $(this).height())/2;
			$(this).css({'margin-top': vertY+'px'});
		}
	})
}



function setBgSpriteFrame(element, frame, doLog) {
	row = frame % spriteRows;
	col = Math.floor(frame / spriteCols);

	element.children('img').each(function(){

		parent = $(this).parent();
		isWide = (parent.width() > parent.height());
		size = isWide ? parent.width() : parent.height();

		xOff = 0 - (col * size);
		yOff = 0 - (row * size);

		$(this).css({
			'left' : xOff + 'px',
			'top' : yOff + 'px'
		})
	})
}


var
	elTop = 0,
	rel = 0,
	pos = 0,
	mod = 4,
	count = 0,
	navScroll = 10
;

//Modulus for negatives
Number.prototype.doMod = function(n) {
    return ((this%n)+n)%n;
};

//Scroll Handlers

function onScrollHandler(e) {
	// stepFrames(e);
	// stepButtonColors(e);

	// Not doing background scrolling, just tucking the header for now
	doNavigationTuck();
}

function onScrollStartHandler(e) {
	buttonReset();
}

function onScrollEndHandler(e) {
	//Remove Button Color Classes
	buttonBounce();
    // myScroll.refresh();
}

// Navigation tucker

function doNavigationTuck() {
	if (win.scrollTop() > navScroll) {
		nav.addClass('tucked');
	} else {
		nav.removeClass('tucked');
	}
}


// Step through Sections with BG Sprites
// assess frame position
// call helper function to do positioning

function stepFrames(e) {

	gifContainers.each(function(index){
		if ($(this).attr('data-speed') > 0) {
			mod = $(this).attr('data-speed');
		} else {
			mod = 4;
		}
		pos = ($(this).offset().top - win.scrollTop()) / (win.height() / mod);
		count = $(this).attr('data-frames');
		if (pos <= mod && pos >= (0-mod)) {
			rel = 1 - pos.doMod(1);
			setBgSpriteFrame($(this), Math.floor(rel*count)%count, (index === 0));
		}
	})

	doNavigationTuck();

}

/////////
//INIT
/////////

// Do Image Loading
// Uses Echo.js
// https://github.com/toddmotto/echo
echo.init({
	offsetVertical: 250,
	throttle: 100,
	debounce: false,
	unload: true
})


// Setup Window Resizing for the first time
doResize();
win.on('resize', doResize);

// Run the navigation tuck check
doNavigationTuck();

//Get rid of shade, ensures element resizing has happened before displaying container
$('.preload').removeClass('preload');

//Setup and Run Scroll handling
var isTouch = false;

if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	isTouch = true;
}

// If you want to disable the scroll handler with touch just change the if statement
// Currently only renders on iOS after scroll ends
//if (isTouch)
if (true) {
	onScrollHandler();
	win.on('scroll', onScrollHandler);
}



})