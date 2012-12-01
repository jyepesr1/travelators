$(function() {
    
    $('#gallery a').lightBox({fixedNavigation:true});
    $(".collapse").collapse('toggle');
    $('#element').tooltip('destroy');
    $('#element').popover('show');
});