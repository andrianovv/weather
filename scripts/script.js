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
		var offset = (new Date()).getTimezoneOffset()*60; // Відхилення години в форматі UTC і значення години компа в секундах
		var city=data.city.name, country=data.city.country;
		$('#city_weather').html(city+' <b> '+country+'</b>');
		
		for(var i=0;i<3;i++)
		{
			var picture=data.list[i].weather[0].icon, description=data.list[i].weather[0].description;
			var weekDate, month, clock=new Date((data.list[i].dt-offset)*1000), clockComp=new Date();
			var days=['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
			weekDate=clock.getDate();
			
			if(weekDate<10) weekDate='0'+weekDate;
			month=clock.getMonth()+1;
			if(month<10) month='0'+month;
			$('#day_'+i+' '+'.image_weather').html('<img src="images/icons/'+picture+'.png" />');
		
			if(clockComp.getHours()>5&&clockComp.getHours()<11){
				temp=data.list[i].temp.morn;
				$('#day_'+i+' '+'.temperature_weather').html(Math.round(temp)+'&deg;C');
			} 
			if(clockComp.getHours()>10&&clockComp.getHours()<18){
				temp=data.list[i].temp.day;
				$('#day_'+i+' '+'.temperature_weather').html(Math.round(temp)+'&deg;C');
			}
			if(clockComp.getHours()>17&&clockComp.getHours()<23){
				temp=data.list[i].temp.eve;
				$('#day_'+i+' '+'.temperature_weather').html(Math.round(temp)+'&deg;C');
			}
			if((clockComp.getHours()>22&&clockComp.getHours()<24)||(clockComp.getHours()>=0&&clockComp.getHours()<6)){
				temp=data.list[i].temp.night;
				$('#day_'+i+' '+'.temperature_weather').html(Math.round(temp)+'&deg;C');
			}	
			
			$('#day_'+i+' '+'.description').html(description);		
			if(i==0) $('#day_'+i+' '+'.date_weather').html('Сьогодні'+'<br>'+days[clock.getDay()]+' '+weekDate+'\.'+month);
			if(i==1) $('#day_'+i+' '+'.date_weather').html('Завтра'+'<br>'+days[clock.getDay()]+' '+weekDate+'\.'+month);
			if(i==2) $('#day_'+i+' '+'.date_weather').html(days[clock.getDay()]+' '+weekDate+'\.'+month);
		}
	}

	function show_error(msg)
	{
    $('#error').html('Сталася помилка: ' + msg);
  }
	
});