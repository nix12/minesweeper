import * as $ from "jquery";

class Grid {

	create_grid() {
		let grid: any[] = [];
		let row: number = 0;
		let column: number = 0;
		
		for (row = 0; row <= 8; row++) {
			for (column = 0; column <= 8; column++) {
				grid.push([row, column]);
			}
		}

		return grid;
	}

	render(): void {
		let grid: number[] = this.create_grid();

		$.map(grid, function(variable, index) {
			$(".container").append("<div class='square' id='row-" + grid[index][0] + 
														 "-col-" + grid[index][1] + "'</div>");
			$(".square").addClass("cover")
		})
	}
}

class Mine {
	
	public coordinates: number[]

	get position(): any[] {
		return this.coordinates
	}

	constructor() {
		 this.coordinates = this.create_mine()
	}

	create_mine() {
		let position: number[] = [] 

		position = [Math.floor(Math.random() * (8 - 0)) + 0, 
								Math.floor(Math.random() * (8 - 0)) + 0]

		return position
	}
}

class Game {
	public grid: any

	constructor() {
		let new_grid: Grid = new Grid
		this.grid = new_grid.create_grid()
	}

	place_mines(): void {
		let mines: number[] = []
		let i: number = 0
		let j: number = 0

		while (mines.length <= 9) {
			
			let mine: any = new Mine

			mines.push(mine.position)
		}

		for (i = 0; i < this.grid.length; i++ ) {
			for (j = 0; j < mines.length; j++) {
				if (JSON.stringify(this.grid[i]) === JSON.stringify(mines[j])) {
					$("#row-" + this.grid[i][0] + "-col-" + this.grid[i][1]).addClass("mine")
					$("#row-" + this.grid[i][0] + "-col-" + this.grid[i][1]).html("x")
				}
			}
		}
	}

	add_points(): void {
		let i: number = 0

		for (i = 0; i < this.grid.length; i++){

			let $location: any = $("#row-" + this.grid[i][0] + "-col-" + 
										this.grid[i][1])

			if ($location.hasClass("mine")) {
				let mine_count: number = 1

				if ($("#row-" + (this.grid[i][0] + 1) + "-col-" + 
					this.grid[i][1]).hasClass("mine")) {
					$("#row-" + (this.grid[i][0] + 1) + "-col-" + 
					this.grid[i][1]).html("x")
					mine_count++
				} else {
					$("#row-" + (this.grid[i][0] + 1) + "-col-" + 
					this.grid[i][1]).html(JSON.stringify(mine_count)).addClass("points")
				}

				if ($("#row-" + (this.grid[i][0] - 1) + "-col-" + 
					this.grid[i][1]).hasClass("mine")) {
					$("#row-" + (this.grid[i][0] - 1) + "-col-" + 
					this.grid[i][1]).html("x")
					mine_count++
				} else {
					$("#row-" + (this.grid[i][0] - 1) + "-col-" + 
					this.grid[i][1]).html(JSON.stringify(mine_count)).addClass("points")
				}

				if ($("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] + 1)).hasClass("mine")) {
					$("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] + 1)).html("x")
					mine_count++
				} else {
					$("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] + 1)).html(JSON.stringify(mine_count)).addClass("points")
				}

				if ($("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] - 1)).hasClass("mine")) {
					$("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] - 1)).html("x") 
					mine_count++ 
				} else  {
					$("#row-" + this.grid[i][0] + "-col-" + 
					(this.grid[i][1] - 1)).html(JSON.stringify(mine_count)).addClass("points")
				}
			}
		}
	}

	flood_fill(x: number, y: number) {
		let i: number = 0
		let n: number = 0
		let adjacent: any[] = [[1, 0], [-1, 0], [0, 1], [0, -1],
													[1, 1], [-1, -1], [-1, 1], [1, -1]]
		let neighbors: number[] = []

		for (i = 0; i < adjacent.length; i++) {
			
			for (n = 0; n < this.grid.length; n++) {
				let row: any = adjacent[i][0] + this.grid[n][0]
				let column: any = adjacent[i][1] + this.grid[n][1]

				neighbors.push([row, column])
			}

		}
		return neighbors
	}

	uncover(x: number, y: number) {
		let neighbors: any = this.flood_fill(x, y)
		let j: number = 0
		console.log("in uncover")
		for (j = 0; j < neighbors.length; j++) {
			let row: number = neighbors[j][0]
			let column: number = neighbors[j][1]
			console.log("in uncover for")

			if (neighbors[j][0]  >= 0 && neighbors[j][0]  <= 8 &&
					neighbors[j][1]  >= 0 && neighbors[j][1]  <= 8) {	

				// if (this.check_neighbor(x, y) === false) {
					// console.log("x1: " + x1)
					// console.log("y1: " + y1)
				
					// if ($("#row-" + row + "-col-" + column).html() === 0) {
					// 	mines++
						$("#row-" + row + "-col-" + column).removeClass("cover")
						this.flood_fill(row, column)
					// }
				// }
			}
		}
	}

	// check_neighbor(x, y) {
	// 	let adjacent: any[] = [[1, 0], [-1, 0], [0, 1], [0, -1],
	// 												[1, 1], [-1, -1], [-1, 1], [1, -1]]
	// 	let j: number = 0
			
	// 	for (j = 0; j < adjacent.length; j++) {
	// 		let x1: number = x + adjacent[j][0]
	// 		let y1: number = y + adjacent[j][1]

	// 		if ($("#row-" + x1 + "-col-" + y1).hasClass("mine")) {
	// 			return true
	// 		} else {
	// 			return false
	// 		}
	// 	}
	// }
}

$(function() {

	$(document).on("contextmenu", ".square", function(e) {
		e.preventDefault()
		$(this).addClass("flag")
	})

	$(".container").on("click", ".square", function() {
		let current: number[] = [parseInt(this.id[4]), parseInt(this.id[10])]
		game.uncover(current[0], current[1])
		console.log("click")
		// $(this).removeClass("cover")
		// if ($(this).hasClass("mine")) {
		// 	alert("You lose the game")
		// }
	})

	$("div").attr('unselectable','on')
     .css({'-moz-user-select':'-moz-none',
           '-moz-user-select':'none',
           '-o-user-select':'none',
           '-khtml-user-select':'none', /* you could also put this in a class */
           '-webkit-user-select':'none',/* and add the CSS class here instead */
           '-ms-user-select':'none',
           'user-select':'none'
     }).bind('selectstart', function(){ return false; });

	let grid: Grid = new Grid
	let game: Game = new Game
	grid.render()
	game.place_mines()
	game.add_points()
})