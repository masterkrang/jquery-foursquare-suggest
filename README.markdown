# jQuery Foursquare Suggest Plugin

###A simple way to get Foursquare Venues Suggestion Completion into your site's html input field. Type something in the input field, like "ham", "hambur", or "hamburger" and get a list of results.

![alt text](http://www.flickr.com/photos/kurtyboy/7225529098/ "Hamburger Search")


The idea is to create something that is lightweight, with no styling, so you can style it yourself instead of figuring out how some clunky technology like jQuery UI is styling it.


##Simple Sample Usage

* Be sure to download and include foursquare_suggest.js

* Call the fs_suggest() method as in the following example

	$("#my_input").fs_suggest({
		'client_id'		: 'YOUR_CLIENT_ID',
		'client_secret'	: 'YOUR_CLIENT_SECRET',
		ll : '37.787920,-122.407458', 
		limit : 10, 
	});

In the above sample, we took an html input element with the id of '_my____input_' and called the fs_suggest() method to activate the plugin. We also passed some parameters into the plugin, 'client_id', 'client_secret', 'll' (latitude, longitude), and 'limit'. See below for an explanation of supported parameters.

##Supported Parameters:

* client_id -
* client_secret -
* ll - 
* limit -
*