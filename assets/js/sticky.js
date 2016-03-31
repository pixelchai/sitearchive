var stickyenabled = false;
var $sidebar = $(".sidebar-wrap");
var $window = $(window);
var offset = $sidebar.offset();
var topPadding = 15;

$(document).ready(function()
{
    stickyenabled = true;
    $sidebar = $(".sidebar-wrap");
    $window = $(window);
    offset = $sidebar.offset();
    topPadding = 15;
});

$window.scroll(function()
{
    if ($(window).width() > 1080)
    {
        if ($window.scrollTop() > offset.top)
        {
            if (stickyenabled)
            {
                $sidebar.css('margin-top', $window.scrollTop() - offset.top + topPadding - 50);
            }
        }
        else
        {
            $sidebar.css('margin-top', '0');
        }
    }
});
$(window).resize(function()
{
    if ($(window).height() > $sidebar.height())
    {
        stickyenabled = true;
    }
    else
    {
        stickyenabled = false;
        $sidebar.css('margin-top', '0');
    }
});