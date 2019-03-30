/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var direction = 1;

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

})(jQuery);


var games = [];

$.getJSON("https://nrchmielewski.com/assets/js/data.json", function(json) {
    for(var i = 0; i < json.length; i++) {
    	games.push(json[i]);
	}
});


function submitParams() {
	if (direction == -1) {
		games.reverse();
		direction = 1;
	}
	appendCards();
}

function appendCards() {
	$("#cards").empty();
	$("#cards").append('<div class="row b_submit"><div class="col-12"><input id="card-direction" type="button" onclick="changeDirection()" value="Increasing"/></div></div><br><p id="total-games" style="padding-top: 1em;">Test</p><br>');
	
	if (direction == 1) {
		document.getElementById("card-direction").value = "Increasing";
	}
	else {
		document.getElementById("card-direction").value = "Decreasing";
	}

	
	var num_players = document.getElementById("num-players").value;
	var wild_card = false;

	if (num_players == "") {
		num_players = 0;
		wild_card = true;
	}
	else if (!isNaN(num_players)) {
		num_players = parseInt(num_players);
	}
	else {
		num_players = 0;
	}
	
	var counter = 0;
	$.each(games, function(i,f) {
		// player check
		var valid_players = num_players >= f.min_players && num_players <= f.max_players;
		
		// outputs the card if it is valid
        if (valid_players || wild_card) {
			var card = '<div class="card col-6" id="' + i + '" onclick="openModal(event)">' + '<img src="images/' + f.img + '" onerror="this.src=' + "'images/placeholder.jpg'" + ';" alt="' + f.title + '">'
			+ '<div class="card-container"><h4><b>' + f.title + '</b></h4><div><p class="icon fa-user" style="float: left;"> '
			+ f.min_players;
			
			if (f.min_players != f.max_players) {
				card += '-' + f.max_players;
			}
			
			card += '</p><p class="icon fa-clock-o" style="float: right;"> ' + f.min_length;
			
			if (f.min_length != f.max_length) {
				card += '-' + f.max_length;
			}
			
			card += '</p></div></div></div>';
			
            $("#cards").append(card);
			counter += 1;
		}
    });
	
	document.getElementById("total-games").innerHTML = "Showing " + counter + " games";
}

// Get the modal and its elements
var modal = document.getElementById('card-modal');
var modal_img = document.getElementById("modal-image");
var modal_title = document.getElementById("modal-title");
var modal_players = document.getElementById("modal-players");
var modal_length = document.getElementById("modal-length");
var modal_desc = document.getElementById("modal-desc");

function openModal(event){
	$("body").addClass("modal-open");
	
	var game_object = games[parseInt(event.currentTarget.getAttribute("id"))];
    modal.style.display = "block";
    modal_img.src = "images/" + game_object.img;
	modal_title.innerHTML = game_object.title;
	modal_desc.innerHTML = game_object.description;
	
	modal_players.innerHTML = " " + game_object.min_players;		
	if (game_object.min_players != game_object.max_players) {
		modal_players.innerHTML += '-' + game_object.max_players;
	}
			
	modal_length.innerHTML = " " + game_object.min_length;		
	if (game_object.min_length != game_object.max_length) {
		modal_length.innerHTML += '-' + game_object.max_length;
	}
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
$("body").removeClass("modal-open");
}


function changeDirection() {	
	direction *= -1;
	games.reverse();
	appendCards();
}

$(function() {
    $('#filter-form').submit(function( jqEvt ) {
        jqEvt.preventDefault();
        submitParams();
    });
});