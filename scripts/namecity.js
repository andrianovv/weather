function name_city(lang, fn_Ok, fn_Error, city_name)
{
	$.getJSON(
    'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
     + city_name + '&cnt=16&units=metric&APPID=85dd9ac97b8b9d0cbc5f814a5b96ffa6' + '&lang=' + lang + '&callback=?',
    function (data) 
		{
      fn_Ok.call(this, data);
    });
}
