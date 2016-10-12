var keys = require('./keys');
var fs = require('fs');
var date = require('date.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify');

// Setting up Twitter Client ////////////////////////
var client = new Twitter(keys.twitterKeys);

// Capture the user's command input //////////////////
var command = process.argv[2].toLowerCase();

// Logic for handling commands //////////////////////////////////////////

handleCommand(command);


// FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////


// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function getTweets(){

	var params = {screen_name: 'holdonbrucelee'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {
			// console.log(tweets)

			var output = [

				'\n',
				"==========================================================",
				'\n',
				'MY MOST RECENT TWEETS',
				'\n',
				"==========================================================",
				'\n',
				]


			for (tweet = 0; tweet < 20; tweet ++) {

				output.push(tweets[tweet].text);
				output.push('Created at: ' + tweets[tweet].created_at);
				output.push('\n');
				
			}
			
			output.push("==========================================================");
			output.push('\n');

			displayOutput(output);
			logOutput(output);
		}
	})
};

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
		//* Artist(s)
		//* The song's name
		//* A preview link of the song from Spotify
		//* The album that the song is from

// if no song is provided then your program will default to "The Sign" by Ace of Base

function spotifyThisSong(song) {

	console.log('\n');
	console.log('Loading song data...')

	Spotify.search({ type: 'track', query: song }, function(error, data){

		var result = data.tracks.items[0];

		// checks that the search was able to find a match
		if (data.tracks.items.length == 0){
			var output = ['\n', "Couldn't find that song!", '\n']

			displayOutput(output);
			logOutput(output);

		// found a result and didn't get an error
		} else if (!error) {

			var output = ['\n',
			"==========================================================",
			'\n',
			result.name,
			'\n',
			"==========================================================",
			'\n',
			"==========================================================",
			'Artist: ' + result.artists[0].name ,
			'Album: ' + result.album.name,
			'Spotify Link: ' + result.preview_url,
			"==========================================================",
			'\n']

			displayOutput(output);

			logOutput(output);

		// Error!
		}else {

			console.log('Error occurred: ' + error);
			return;
			
		}
	});
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
function movieThis(input) {

	var baseUrl = 'http://www.omdbapi.com/?type=movie&plot=short&tomatoes=true&t=';
	var movie = input;
	var url = baseUrl + movie

	console.log('\n')
	console.log("Loading Movie Data...");

	request(url, function(error, data, response) {

		var movie = JSON.parse(data.body);

		if (movie.Response == 'False'){

			var output = ['\n', "I couldn't find a movie with that title.", '\n']
			displayOutput(output);
			logOutput(output);

		}else if(!error) {

			var output =['\n',
			"==========================================================",
			'\n',
			movie.Title,
			'\n',
			"==========================================================",
			'\n',

			"==========================================================",
			'Starring: ' + movie.Actors,
			'Year: ' + movie.Year,
			'Summary: ' + movie.Plot,
			'IMDB Rating: ' + movie.imdbRating,
			'Rotten Tomatoes Rating: ' + movie.tomatoMeter,
			'Rotten Tomatoes Link: ' + movie.tomatoURL,
			'Language: ' + movie.Language,
			'Country: ' + movie.Country,
			"==========================================================",
			'\n']

			displayOutput(output);
			logOutput(output);

		}else {

			console.log("Error: " + error)
		}
	});
};	

// node liri.js do-what-it-says`
	// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// 	* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
	// 	* Feel free to change the text in that document to test out the feature for other commands.
function doWhatItSays() {

	console.log('\n' + 'Reading commands from random.txt...')

	fs.readFile('random.txt', 'utf8', function(error, data) {

		var dataArr = data.split(',');

		var command = dataArr[0];

		var passedArgument = dataArr[1];

		handleCommand(command, passedArgument);
	})
};

// handles user input
function handleCommand(command, passedArgument) {

	if (command == 'my-tweets') {

		getTweets();

	}else if (command == 'spotify-this-song') {

		// if an argument is passed in a manner other than the console (such as 'do-what-it-says')

		if (passedArgument) {

			spotifyThisSong(passedArgument);

		// if there is an argument following the command, search for the song on Spotify
		} else if (process.argv[3]) {

			spotifyThisSong(process.argv[3]);

		// if the user does not enter a song, search for "The Sign" by Ace of Base
		}else{

			console.log('\n');
			console.log("You didn't input a song! Here's the data for 'The Sign' by Ace of Base instead.")

			Spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE'}, function(error, data){

				if (!error) {

					console.log('\n');
					console.log("==========================================================");
					console.log('Song: ' + data.name);
					console.log('Artist: ' + data.artists[0].name );
					console.log('Album: ' + data.album.name);
					console.log('Spotify Link: ' + data.preview_url);
					console.log("==========================================================");
					console.log('\n');
					
				}else {

					console.log('Error occurred: ' + error);
					return;
				}
			})
		}

	}else if (command == 'movie-this') {
		// if an argument is passed in a manner other than the console (such as 'do-what-it-says')
		if (passedArgument) {

			movieThis(passedArgument);

		// if the user entered an argument for the movie title
		} else if (process.argv[3]) {

			movieThis(process.argv[3]);

		}else {

			console.log('\n');
			console.log("You didn't input a movie Title! Here's the data for 'Mr. Nobody' instead.");

			movieThis('Mr. Nobody');

		}
		
	}else if (command == 'do-what-it-says') {

		doWhatItSays();

	}else {

		console.log('\n');
		console.log("Sorry, but that's not a command I understand.")

	}
};


// displays output to console

function displayOutput(output) {

	for (i = 0 ; i < output.length ; i++) {

		console.log(output[i]);
	}

}

// logs function output to log.txt
function logOutput(output) {

	var timestamp = date('now');
	
	fs.appendFileSync('log.txt', '\n' + 'Created: ' + timestamp);

	for (i = 0 ; i < output.length ; i++) {

		fs.appendFileSync('log.txt', output[i] + '\n');
	
	}
};