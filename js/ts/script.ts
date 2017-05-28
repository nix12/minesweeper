import * as $ from "jquery";

class Grid {

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

		position = [Math.floor(Math.random() * (9 - 0)) + 0, 
								Math.floor(Math.random() * (9 - 0)) + 0]

		return position
	}
}

class Game {
	public grid: any

	constructor() {
		let new_grid = new Grid
		this.grid = new_grid.create_grid()
	}

	place_mines() {
		let mines: number[] = []
		let i: number = 0
		let j: number = 0

		while (mines.length <= 10) {
			
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

	check_neighbors() {
		let i: number = 0
		console.log("grid-outside: " + this.grid)
		// $.map(this.grid, function(variable, index) 
		for (i = 0; i < this.grid.length; i++){
			console.log("grid-inside: " + this.grid)
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
}

$(function() {
	$(document).on("contextmenu", ".square", function(e) {
		e.preventDefault()
		$(this).addClass("flag")
	})

	$(".square").on("click" ,function() {
		$(this).removeClass("cover")
		if ($(this).hasClass("mine")) {
			alert("You lose the game")
		}
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

	let grid: any = new Grid
	grid.render()
	let game: any = new Game
	game.place_mines()
	game.check_neighbors()
})