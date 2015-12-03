function geolocation(lang, fn_Ok, fn_Error)
{
		navigator.geolocation.getCurrentPosition(loc_Ok, loc_Error);
		
		function loc_Ok(position) 
		{
        var cache = localStorage['weatherCache'] && JSON.parse(localStorage['weatherCache']);   // Check cache
        var currDate = new Date();
        if (cache && cache.timestamp && cache.timestamp > currDate.getTime() - 30*60*1000)     // If the cache is newer than 30 minutes, use the cache
				{     
            fn_Ok.call(this, cache.data);
        } else 
				{
            $.getJSON(
                'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +
                position.coords.longitude + '&cnt=16&units=metric&APPID=85dd9ac97b8b9d0cbc5f814a5b96ffa6' + '&lang=' + lang + '&callback=?',
                function (response) 
								{
                    localStorage.weatherCache = JSON.stringify(     // Store the cache
										{    
                        timestamp: (new Date()).getTime(),	       // getTime() returns milliseconds
                        data: response
                    });
                    loc_Ok(position);                             // Call the function again
                }
            );
        }
    }
		
		function loc_Error(error) 
		{
        var message = 'Location error. ';
        switch(error.code) 
				{
            case error.TIMEOUT:
                message += 'A timeout occured! Please try again!';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'We can\'t detect your location. Sorry!';
                break;
            case error.PERMISSION_DENIED:
                message += 'Please allow geolocation access for this to work.';
                break;
            case error.UNKNOWN_ERROR:
                message += 'An unknown error occured!';
                break;
        }
        fn_Error.call(this, message);
    }
		
		
		
		
		
}
