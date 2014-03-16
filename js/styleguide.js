function popup(message, color, duration) {
    if (typeof(message) == 'undefined') message = 'ita senserit offendit cernantur reprehenderit sed varias voluptatibus';
    if (typeof(color) == 'undefined') color = 'blue';
    if (typeof(duration) == 'undefined') duration = 3000;

    $('<div class="' + color + '">' + message + '</div>').appendTo('#popup').hide().fadeIn().delay(duration).fadeOut();
};

$(document).on('ready', function() {
    // Generate Navigation
    $('.group').each(function(index) {
        var grouplink = $('<li><a href="#group-' + index + '">' + $(this).find('h2').html() + '</a><ul></ul></li>');
        $(this).attr('id', 'group-' + index);
        $(this).find('h3.underline').each(function(i) {
            grouplink.find('ul').append('<li><a href="#wrapper-' + index + '-' + i + '">' + $(this).html() + '</a></li>');
            $(this).attr('id', 'wrapper-' + index + '-' + i);
        });
        grouplink.appendTo('nav > ul');
    });

    // Generate code blocks
    $('.wrapper').each(function() {
        $('<pre data-language="html">' + _.escape($(this).html()) + '</pre>').appendTo($(this)).hide();
    });

    // Toggle sample code blocks and generated code blocks
    $('#codeToggle').on('click', function() {
        $('pre').toggle();
    });

    // Smooth Srolling
    $('nav').on('click', 'a', function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });
});

// Activate navigation during scroll
$(window).on('scroll', function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 123) {
        $('.group').each(function(i) {
            if ($(this).offset().top <= windscroll + 100) {
                $('nav > ul > li > a.active').removeClass('active');
                $('nav > ul > li > a').eq(i).addClass('active');
            }
        });
        $('.wrapper').each(function(i) {
            if ($(this).offset().top <= windscroll + 100) {
                $('nav > ul > li > ul > li > a.active').removeClass('active');
                $('nav > ul > li > ul > li > a').eq(i).addClass('active');
            }
        });
    } else {
        $('nav > ul > li > a.active').removeClass('active');
        $('nav > ul > li > ul > li > a.active').removeClass('active');
    }
});
