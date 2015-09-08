$(function()
{
	$('#btn_get').click(function()
	{
		name_city('ua', data_received, show_error, $('#input_city_name').val());
	});
	$('#input_city_name').keypress(function(e) 
	{  
    var ENTER_KEY_CODE = 13;
    if ( e.which === ENTER_KEY_CODE ) 
    {
      $('#btn_get').trigger('click');
       return false;
    }
  });	
	geolocation('ua', data_received, show_error);

	function data_received(data)
	{
		var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
		var city=data.city.name, country=data.city.country;
		$('#city_weather').html(city+' <b> '+country+'</b>');
		
			
		for(var i=1;i<4;i++)
		{ 
			var picture=data.list[i].weather[0].icon, temp=data.list[i].temp.day, clock=new Date(data.list[i].dt*1000 - offset);
			$('#day_'+i+' '+'.image_weather').html('<img src="images/icons/'+picture+'.png" />');
			$('#day_'+i+' '+'.temperature_weather').html(Math.round(temp)+'&deg;C');
			if(i==1){$('#day_'+i+' '+'.date_weather').html('Today')};
			if(i==2){$('#day_'+i+' '+'.date_weather').html('Tomorrow')};
			if(i==3){$('#day_'+i+' '+'.date_weather').html('Overmorrow')};
		}
	}

	function show_error(msg)
	{
    $('#error').html('Сталася помилка: ' + msg);
  }
	
});
