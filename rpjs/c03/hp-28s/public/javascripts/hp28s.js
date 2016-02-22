/**
 * http://usejsdoc.org/
 */
// (function() {
var game_over_timeout = 2000;
var game_over_timestamp = 0;
var height = 4;
var tick_started = false;
var width = 23;
var chance_clear;
var game_over;
var level;
var rows;
var score;
var position;
var row;
// })();

var start_game = function() {
	game_over = false;
	level = 1;
	position = 0;
	row = 1;
	score = 0;
	chance_clear = 5 / 6;
}
start_game();

var get_level = function() {
	level += 1;
	rows = [];
	chance_clear *= (9 / 10);
	for (var outer = 0; outer < height; ++outer) {
		rows.push([]);
		for (var inner = 0; inner < width; ++inner) {
			if (Math.random() > chance_clear) {
				rows[outer].push('a');
			} else {
				rows[outer].push(' ');
			}
		}
	}
	rows[1][0] = 's';
	rows[1][1] = ' ';
	return rows;
}

var board = {
	rows : get_level()
};
var keystrokes = [];

var DisplayGrid = React
		.createClass({
			componentDismount : function() {
				document.body.addEventListener("keypress", this.onKeyPress);
				document.body.addEventListener("keydown", this.onKeyDown);
			},
			getDefaultProps : function() {
				return null;
			},
			getInitialState : function() {
				return board;
			},
			onKeyDown : function(eventObject) {
				this.onKeyPress(eventObject);
			},
			onKeyPress : function(eventObject) {
				if (eventObject.which === 37 || eventObject.which === 38) {
					keystrokes.push('u');
				} else if (eventObject.which === 39 || eventObject.which === 40) {
					keystrokes.push('d');
				} else if (eventObject.which === 32) {
					keystrokes.push('s');
				}
			},
			render : function() {
				var children = [ 'div', {} ];
				for (var outer = 0; outer < this.state.rows.length; outer += 1) {
					var subchildren = [ 'div', null ];
					for (var inner = 0; inner < this.state.rows[outer].length; inner += 1) {
						var symbol = this.state.rows[outer][inner];
						var out_symbol;
						if (symbol === 'a') {
							out_symbol = '&#9632';
						} else if (symbol === 's') {
							out_symbol = '&#9658';
						} else if (symbol === ' ') {
							out_symbol = ' ';
						} else if (symbol === '-') {
							out_symbol = '-';
						} else if (symbol === '*') {
							out_symbol = '*';
						} else {
							console.log('Missed character: ' + symbol);
						}
						subchildren.push(React.createElement('span', {
							'style' : {
								'position' : 'absolute',
								'top' : 18 * outer - 20,
								'left' : (12 * inner - 75)
							}
						}, out_symbol));
					}
					children.push(React.createElement.apply(this, children));
				}
				return React.createElement.apply(this, children);
			}
		});

var tick = function() {
	if (game_over) {
		return;
	}
	React.render(React.createElement(DisplayGrid, {}),

	document.getElementById('display'));
};

function initReact() {
	tick();
}