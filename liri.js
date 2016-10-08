var keys = require('./keys');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify');

// Setting up Twitter Client ////////////////////////
var client = new Twitter(keys.twitterKeys);


// Capture the user's command input //////////////////
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

	// if there is an argument following the command, search for the song on Spotify
	if (process.argv[3]) {

		// allows for dash input if user does no input a string
		var song = process.argv[3].replace('-', ' ');

		Spotify.search({ type: 'track', query: song }, function(error, data){

			if (error) {

				console.log('Error occurred: ' + error);
				return;


			}else {

				// console.log(data.tracks.items[0]);
				console.log('Song: ' + data.tracks.items[0].name);
				console.log('Artist: ' + data.tracks.items[0].artists[0].name );
				console.log('Album: ' + data.tracks.items[0].album.name);
				console.log('Spotify Link: ' + data.tracks.items[0].preview_url);

			}

		})


	// if the user does not enter a song, search for "The Sign" by Ace of Base
	}else {

		console.log("You didn't enter a song title! Enjoy this song instead.")

		Spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE'}, function(error, data){

			if (error) {

				console.log('Error occurred: ' + error);
				return;


			}else {

				// console.log(data);
				console.log('Song: ' + data.name);
				console.log('Artist: ' + data.artists[0].name );
				console.log('Album: ' + data.album.name);
				console.log('Spotify Link: ' + data.preview_url);

			}

		})

	}

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




// Logic for handling commands //////////////////////////////////////////
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