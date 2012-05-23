(function( $ ) {
	
	//keep track of which results list item is selected
	//TODO change term to "results list"
	var resultsListIndex = 0;
	var resultsListActive = false;
	var opts;
	var lastEntered = "";
	var data;
	var resultsList;
	var resultsListID = ""
	
	$.fn.fs_suggest = function(options) {
		
		var defaults = {
			url	: 'https://api.foursquare.com/v2/venues/suggestCompletion?', // i suppose you could change this...
			ll : '37.787920,-122.407458', //default to SF since it's well known
			v : '20120515', //the date of the foursquare api version
			limit : 10, //perhaps an option to ignore limits
			client_id : "YOUR_FS_CLIENT_ID", //get this from foursquare.com
			client_secret : "YOUR_FS_CLIENT_SECRET", //same
			style_results: true //set to false if the way i control the position of results, you can do it yourse
								//the default is to be right under the input and match the width of the input
								//and hopefully to adjust in a responsive way
		}
		//TODO would be cool to include a "schema : 'something.something.minivenues" in case your results had a different json structure
		
		opts = $.extend(defaults, options);
		
		
		this.keydown(function(event) {
			
			var code = event.keyCode || event.which;
			
			if (code == 13) {	//enter key is pressed
				onEnterKey();
			}
		});
		
		//TODO make this flexible enough to deal with other key events
		//wait for keyup to get total entered text
		this.keyup(function(event) {
			
			console.log("key up");
			var code = event.keyCode || event.which;
			
			//enter keys and and arrow keys should be caught by keydown
			if(code == 13) {
				//console.log("13 cancelling");
		    	return false;
		    }
		
			//only listen for up and down
			if(code == 38 || code == 40) {
				//onArrowKeyPressed(event.keyCode);
				return false
			}
		
			//console.log("keyup");
			//console.log($(this).val());
			justEntered = $(this).val();
			
			//since foursquare will only return minivenues on 3 characters
			//check if the value entered is 3 or more characters
			if(justEntered.length >= 3) {
			
				//figure out if it's a character or not
				var c = String.fromCharCode(code);
				var isWordcharacter = c.match(/\w/);

				if(isWordcharacter && lastEntered != justEntered) {
					//send it off to foursquare
					console.log("call foursquare");
					callFoursquareSuggestion();
				} else {
					//clear what was entered before
					$("#fs_search_results").empty();
				}

				lastEntered = justEntered;
			}
		});
		
		
		
		//add global keyup on document
		this.keydown(function(event) {
			console.log("window key up");
			var code = event.keyCode || event.which;
			
			if(code == 13) {
				//console.log("13 cancelling");
				enterKey();
		    	event.preventDefault();
		    	return false;
		    }
		
			//only listen for up and down
			if(code == 38 || code == 40) {
				onArrowKeyPressed(event.keyCode);
			}
		});
		
		//listen for clicks or mouse moves away from the results list and hide it?
		
		//add the results ul (empty for now)
		//TODO probably should be able to customize id name or even class name
		//that way results could be populated to an already existing container
		addResultsList(this);
	};
	
	function onEnterKey() {
		//figure out if anything is selected
		if(resultsListActive) {
			console.log("resulstListActive true: click " + "#" + resultsList.attr("id") + " .selected a");
			//there must be a selected item in the list so trigger it's click event
			
			window.location = $("#" + resultsList.attr("id") + " .selected a").attr("href");
			//return false; //stop default
		}
	}
	
	function addResultsList(el) {
		el.after("<ul id='fs_search_results'></ul>");
		//now add up and down listener to toggle and select results
		
		resultsList = $("#fs_search_results");
	}
	
	function callFoursquareSuggestion() {
		//TODO check for options and set up some error checking
		url = opts.url 
				+ "query=" + justEntered
				+ "&ll=" + opts.ll 
				+ "&v=" + opts.v 
				+ "&limit=" + opts.limit
				+ "&client_id=" + opts.client_id
				+ "&client_secret=" + opts.client_secret;
				 
		$.getJSON(url, function() { 
			console.log("get search results ajax called");
		})
		.success(function(_data, status, xhr) {
			console.log("success");
	        console.log(_data);
			data = _data;
			showResults();
	    })
		.error(function() {
	        //TODO show some kind of error message
			//"this application doesn't MAKE errors"
	    });
	}
	
	// private methods?
	function showResults() {
		html = buildResultsList();
		//add or re-add 
		//reset selection
		resultsListIndex = 0;
		resultsList.empty();
		resultsList.html(html);
	}
	
	function buildResultsList() {
		minivenues = data.response.minivenues;

		if(minivenues && minivenues.length > 0) {
			results = "";
			for (var i = 0; i < minivenues.length; i++) {
				v = minivenues[i]
				//TODO this should be customizable, at least for urls
				results += "<li><a href='/places/" + v.id + "'>" + v.name + "</a></li>";
			}
		} else {
			results = "<ul><li>no results</li></ul>";
		}
		
		return results;
	}
	
	function onArrowKeyPressed(code) {
		//TODO maybe add a check to be sure focus in on input, since it would be annoying
		//to activate this list if you were focused elsewhere
		
		//check for down or up key
		
		liLength = $("#" + resultsList.attr("id") + " li").size();
		
		//up
		if (code == 38) { 
		   	upArrowPressed();
	       	return false;
	    }
		
		//down
		if (code == 40) { 
		   	downArrowPressed();
			return false;
	    }
	}
	
	function downArrowPressed() {
		console.log( "down pressed" );	
		if(resultsListActive) {
			console.log("active");
			//if active and last item in list
			if(resultsListIndex == liLength - 1) {
				//do nothing or return to top?
				//return to top
				console.log("reached the end");
				setSelected(0);
			} else {
				//console.log("down arrow " + (resultsListSelectedIndex + 1));
				//console.log("results list selected index " + resultsListSelectedIndex);
				setSelected(resultsListSelectedIndex + 1);
			}
			
		} else {
			console.log("not active, activate");
			//activate the list
			resultsListActive = true;
			setSelected(0);
		}
	}
	
	function upArrowPressed() {
		console.log( "up pressed" );
		
		if(resultsListActive) {
			//get selected index
			if(resultsListSelectedIndex == 0) {
				//
				deactivateResultsList();
			} else {
				setSelected(resultsListSelectedIndex - 1);
			}
			
		} //else: they pressed up while cursor focus on input so ignore it
	}
	
	function deactivateResultsList() {
		resultsListSelectedIndex = 0;
		resultsListActive = false;
		$("#" + resultsList.attr("id") + " li").removeClass("selected");
	}
	
	function setSelected(index) {
		console.log("set selected: " + index);
		resultsListSelectedIndex = index;
		$("#" + resultsList.attr("id") + " li").removeClass("selected");
		$("#" + resultsList.attr("id") + " li").eq(index).addClass("selected");
	}
	
	
})( jQuery );
