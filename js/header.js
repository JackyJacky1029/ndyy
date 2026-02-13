$(document).ready(function() {

    const $navItems = $('.nav-item');

    $navItems.hover(
        function() {
            $navItems.not(this).addClass('inactive');
            if(!$(this).hasClass('search-btn')) {
                $('.search-box').addClass('inactive');
            }
        },
        function() {
            $navItems.removeClass('inactive');
            $('.search-box').removeClass('inactive');
        }
    )

    $('.X').click(function() {
        $('.menu').fadeOut('middle');
        $('.menu-btn').animate({
            opacity: 1
           }, 'fast');
        $(this).fadeOut('middle');
    })

    $('.menu-btn').click(function() {
        $('.menu').fadeIn('middle').css({
            display: 'flex',
        });
        $(this).animate({
            opacity: 0
        }, 'fast');
        $('.X').fadeIn('middle')
        $(this).addClass('active')
    })
})