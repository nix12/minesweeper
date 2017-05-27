import * as $ from "jquery";

class Game {
	constructor(){}

	create_grid() {
		let grid: any[] = [];
		let row: number = 0;
		let column: number = 0;
		
		for (row = 0; row <= 9; row++) {
			for (column = 0; column <= 9; column++) {
				grid.push([row, column]);
			}
		}

		return grid;
	}

	render() {
		let grid: any[] = this.create_grid();

		$.map(grid, function(variable, index) {
			$(".container").append("<div class='square' id='row-" + grid[index][0] + 
														 "-col-" + grid[index][1] + "'</div>");
		})
	}
}


$(function() {
	let game = new Game()
	game.render()
})