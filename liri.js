var keys = require('./keys');
var request = require('request');
var Twitter = require('twitter');

// Setting up Twitter Client ////////////////////////
var client = new Twitter(keys.twitterKeys);


var command = process.argv[2].toLowerCase();
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function getTweets(){

	var params = {screen_name: 'holdonbrucelee'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {
			// console.log(tweets)

			for (i = 0; i < tweets.length; i ++) {

				console.log(tweets[i].text);

			}


		}

	})

};

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
		//* Artist(s)
		//* The song's name
		//* A preview link of the song from Spotify
		//* The album that the song is from

//if no song is provided then your program will default to "The Sign" by Ace of Base

function spotifyThisSong() {

};

// node liri.js movie-this '<movie name here>
// This will output the following information to your terminal/bash window:

	// 	* Title of the movie.
	// 	* Year the movie came out.
	// 	* IMDB Rating of the movie.
	// 	* Country where the movie was produced.
	// 	* Language of the movie.
	// 	* Plot of the movie.
	// 	* Actors in the movie.
	// 	* Rotten Tomatoes Rating.
	// 	* Rotten Tomatoes URL.

	// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	// 	* If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
	// 	* It's on Netflix!
function movieThis() {

};	

// node liri.js do-what-it-says`
	// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// 	* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
	// 	* Feel free to change the text in that document to test out the feature for other commands.
function doWhatItSays() {

};	


if (command == 'my-tweets') {
		getTweets();

}else if (command == 'spotify-this-song') {

	spotifyThisSong();

}else if (command == 'movie-this') {

	movieThis();

}else if (command == 'do-what-it-says') {

	doWhatItSays();

}else {

	console.log("Sorry, but that's not a command that I understand.")

}