$(function() {
    // ユーザーエージェント
    var _ua = (function(u){
        return {
            Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
                || u.indexOf("ipad") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
                || u.indexOf("kindle") != -1
                || u.indexOf("silk") != -1
                || u.indexOf("playbook") != -1,
            Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
                || u.indexOf("iphone") != -1
                || u.indexOf("ipod") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
                || u.indexOf("blackberry") != -1
        }
    })(window.navigator.userAgent.toLowerCase());

    // wow.js
    new WOW({
        mobile: false
    }).init();

    // nav header固定
    var hTop = $('main').offset().top - 100;
    $(window).scroll(function () {
        if ($(this).scrollTop() >= hTop) {
            $('.header').addClass('show')
        } else {
            $('.header').removeClass('show')
        }
    });

    // 年齢のセット
    $('#age').text(calAge('1990-07-21'));

    // #で始まるアンカーをクリックした場合に処理
    $('a[href^="#"]').on('click', function() {
        // スクロールの速度
        var speed = 2000;
        // 移動先を取得
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'easeInOutExpo');
        return false;
    });

    // スキルの円
    // 発火するタイミングを設定
    var topSkill = $('#skill').offset().top - 30;
    var scFlag = false;

    // そこまでスクロールしたら実行
    $(window).scroll(function() {
        if ($(this).scrollTop() > topSkill &&
            scFlag === false) {
            $("#php-circle").circliful({
                animationStep: 2,
                foregroundBorderWidth: 15,
                backgroundBorderWidth: 15,
                percent: 75
            });
            $("#ruby-circle").circliful({
                foregroundColor: 'tomato',
                animationStep: 2,
                foregroundBorderWidth: 15,
                backgroundBorderWidth: 15,
                percent: 40
            });
            $("#html-circle").circliful({
                foregroundColor: 'limegreen',
                animationStep: 2,
                foregroundBorderWidth: 15,
                backgroundBorderWidth: 15,
                percent: 60
            });
            $("#js-circle").circliful({
                foregroundColor: 'purple',
                animationStep: 2,
                foregroundBorderWidth: 15,
                backgroundBorderWidth: 15,
                percent: 30
            });

            scFlag = true;
        }
    });

    // navのactive（もうちょいどうにかしたい）
    $(window).scroll(function() {
        add_active($('#about').offset().top, $('a[href="#about"]'));
        add_active($('#portfolio').offset().top, $('a[href="#portfolio"]'));
        add_active($('#works').offset().top, $('a[href="#works"]'));
        add_active($('#skill').offset().top, $('a[href="#skill"]'));
        add_active($('#story').offset().top, $('a[href="#story"]'));
        add_active($('#service').offset().top, $('a[href="#service"]'));
        add_active($('#comment').offset().top, $('a[href="#comment"]'));
        add_active($('#contact').offset().top, $('a[href="#contact"]'));
    });

    // TOP画像パララックス
    if (!_ua.Mobile && !_ua.Tablet) {
        $(window).scroll(function () {
            var dy = $(this).scrollTop();
            $('.intr').css('background-position', '0 ' + (-dy / 4) + 'px');
        });
    }

    // メール送信 ajax
    $('form').on('submit', function(e) {
        e.preventDefault();
        if (!$('input[name="name"]').val() ||
            !$('input[name="email"]').val() ||
            !$('input[name="subject"]').val() ||
            !$('textarea[name="content"]').val()) {
            swal({
                title: '(; > <)',
                text: '必須項目を入力してください！',
                confirmButtonText: "閉じる",
                confirmButtonColor: "orange",
                type: 'error',
            });
            return false;
        }

        $('#submit').attr('disabled', true);

        $('.send-msg').html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>').fadeIn("slow");

        setTimeout(function() {
            $.ajax({
                type: 'post',
                url: "/sendMail",
                data: $('form').serialize(),
                content_type: 'application/json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }).done(function(returnData){
                $('.send-msg').text('メールを送信しました！').fadeIn("slow");
                $('form').find("textarea, input").val("").end();
                $('#submit').attr('disabled', false);
            }, 300).fail(function(returnData){
                $('.send-msg').text('送信に失敗しました。時間をおいて再送信してください。');
                $('#submit').attr('disabled', false);
            });
        }, 1000);
    });
});

// functions

// 年齢の計算
function calAge(birthday) {
    birthday = birthday.replace(/[/-]/g, "");
    var today = new Date();
    targetdate = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    return (Math.floor((targetdate - birthday) / 10000));
}

// sweet alert
function myAlert(title, text, imageUrl) {
    swal({
        title: title,
        text: text,
        imageUrl: imageUrl,
        imageSize: "400x260",
        confirmButtonText: "閉じる",
        confirmButtonColor: "orange",
        animation: false,
        html: true
    });
    $(".sweet-alert").scrollTop(0);
}

// navのactive
function add_active(top, e) {
    if ($(this).scrollTop() < (top + 50) &&
        $(this).scrollTop() > (top - 50)) {
        $('ul.nav li').removeClass('active');
        e.parent().addClass('active');
    }
}
