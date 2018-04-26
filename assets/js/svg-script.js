/*
   Setup and Paint your lazyline!
 */

var strokeColor = '#FA7874';
var dy = 100;

// 発火するタイミングを設定
var topAbout = $('#about').offset().top - dy;
var aboutFlag = false;
// そこまでスクロールしたら実行
$(window).scroll(function() {
    if ($(this).scrollTop() >= topAbout &&
        aboutFlag === false) {
        about_animation();
        aboutFlag = true;
    }
});

var topPortfolio = $('#portfolio').offset().top - dy;
var portfolioFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topPortfolio &&
        portfolioFlag === false) {
        portfolio_animation();
        portfolioFlag = true;
    }
});

var topWork = $('#works').offset().top - dy;
var workFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topWork &&
        workFlag === false) {
        work_animation();
        workFlag = true;
    }
});

var topSkill = $('#skill').offset().top - dy;
var skillFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topSkill &&
        skillFlag === false) {
        skill_animation();
        skillFlag = true;
    }
});

var topStory = $('#story').offset().top - dy;
var storyFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topStory &&
        storyFlag === false) {
        story_animation();
        storyFlag = true;
    }
});

var topService = $('#service').offset().top - dy;
var serviceFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topService &&
        serviceFlag === false) {
        service_animation();
        serviceFlag = true;
    }
});

var topComment = $('#comment').offset().top - dy;
var commentFlag = false;
$(window).scroll(function() {
    if ($(this).scrollTop() > topComment &&
        commentFlag === false) {
        comment_animation();
        commentFlag = true;
    }
});


function about_animation()
{
    $('#svg-about').lazylinepainter(
        {
            "svgData": aboutObj,
            "strokeWidth": 3,
            "strokeColor": strokeColor,
            "speedMultiplier": 0.3
        }).lazylinepainter('paint');
}

function portfolio_animation()
{
    $('#svg-portfolio').lazylinepainter(
        {
            "svgData": pfObj,
            "strokeWidth": 2,
            "strokeColor": strokeColor
        }).lazylinepainter('paint');
}

function work_animation()
{
    $('#svg-works').lazylinepainter(
        {
            "svgData": workObj,
            "strokeWidth": 3,
            "strokeColor": strokeColor,
            "speedMultiplier": 0.4
        }).lazylinepainter('paint');
}

function skill_animation()
{
    $('#svg-skill').lazylinepainter({
        "svgData": skillObj,
        "strokeWidth": 3,
        "strokeColor": strokeColor,
        "speedMultiplier": 0.4
    }).lazylinepainter('paint');
}

function story_animation()
{
    $('#svg-story').lazylinepainter(
        {
            "svgData": storyObj,
            "strokeWidth": 3,
            "strokeColor": strokeColor,
            "speedMultiplier": 0.3
        }).lazylinepainter('paint');
}

function service_animation()
{
  $('#svg-service').lazylinepainter(
    {
      "svgData": serviceObj,
      "strokeWidth": 3,
      "strokeColor": strokeColor,
      "speedMultiplier": 0.8
    }).lazylinepainter('paint');
}

function comment_animation()
{
    $('#svg-comment').lazylinepainter(
        {
            "svgData": cmtObj,
            "strokeWidth": 3,
            "strokeColor": strokeColor,
            "speedMultiplier": 1.2
        }).lazylinepainter('paint');
}
