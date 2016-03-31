var stickyenabled = true;
var $sidebar   = $(".sidebar-wrap"), 
    $window    = $(window),
    offset     = $sidebar.offset(),
    topPadding = 15;

$( document ).ready(function() {

    $window.scroll(function() {
        if( $(window).width() > 920){
            if ($window.scrollTop() > offset.top) {
                // $sidebar.stop().animate({
                //     marginTop: $window.scrollTop() - offset.top + topPadding
                // });
                if(stickyenabled){
                    $sidebar.css('margin-top',$window.scrollTop() - offset.top + topPadding-50);
                }
            } else {
                // $sidebar.stop().animate({
                //     marginTop: 0
                // });
                $sidebar.css('margin-top','0');
            }
        }
    });
    
});

$(window).resize(function() {
    if($(window).height() > $sidebar.height()){
        stickyenabled=true;
    }else{
        stickyenabled=false;
        $sidebar.css('margin-top','0');
    }
});