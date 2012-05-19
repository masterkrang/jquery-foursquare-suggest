# jQuery Foursquare Suggest Completion Plugin

A simple way to get Foursquare Venues Suggestion Completion into your site's html input fields. Type something in the input field (like "ham", "hambur", or "hamburger") and get a list of matching Foursquare Venues (in this case, Minivenues). For more information on Foursquare Suggest Completion, go [here](https://developer.foursquare.com/docs/venues/suggestcompletion "Foursquare Suggest Completion")

![alt text](http://www.flickr.com/photos/kurtyboy/7225529098/ "Hamburger Search")


The idea is to create something that is simple and lightweight, with no styling, so you can style it yourself (instead of figuring out how somebody else styled it first so you can delete those styles and add your own).


##Simple Sample Usage

* Download and include foursquare_suggest.js

* Call the fs_suggest() method as in the following example

	```javascript
	$("#my_input").fs_suggest({
		'client_id'		: 'YOUR_CLIENT_ID',
		'client_secret'	: 'YOUR_CLIENT_SECRET',
		'll' : '37.787920,-122.407458', 
		'limit' : 10, 
	});
	```
In the above sample, we took an html input element with the id of '_my____input_' and called the fs_suggest() method to activate the plugin. We also passed some parameters into the plugin, 'client_id', 'client_secret', 'll' (latitude, longitude), and 'limit'. See below for an explanation of supported parameters.

##Supported Parameters:

* client_id -
* client_secret -
* ll - 
* limit -
*