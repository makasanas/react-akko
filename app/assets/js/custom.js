$(document).ready(function(){
    $('body').on('click','.popupOpen',function(){
    	var id = $(this).attr('data-id');
    	$('.blur').addClass('active');
    	$('#'+id).addClass('active');
    });

    $('body').on('click','.popupClose',function(){
    	$('.blur').removeClass('active');
    	$(this).parents('.popup').removeClass('active');
    })
});


