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
		})

		return grid
	}
}

class Bomb {
	
	public coordinates: number[]

	get position(): any[] {
		return this.coordinates
	}

	constructor() {
		 this.coordinates = this.create_bomb()
	}

	create_bomb() {
		let position: number[] = [] 

		position = [Math.floor(Math.random() * (9 - 0)) + 0, 
								Math.floor(Math.random() * (9 - 0)) + 0]

		return position
	}
}

class Game {
	public grid

	constructor() {
		let new_grid = new Grid
		console.log(new_grid)
		this.grid = new_grid.create_grid()
		console.log(this.grid)
	}

	place_bombs() {
		console.log("in place_bombs")
		let bombs: number[] = []
		let i: number = 0
		let j: number = 0

		while (bombs.length <= 10) {
			
			let bomb: any = new Bomb

			bombs.push(bomb.position)
		}
		console.log(bombs)
		console.log("this.grid" + this.grid)
		for (i = 0; i < this.grid.length; i++ ) {
			for (j = 0; j < bombs.length; j++) {
				console.log("i: " + this.grid[i])
				console.log("j " + bombs[j])
				if (JSON.stringify(this.grid[i]) === JSON.stringify(bombs[j])) {
					$("#row-" + this.grid[i][0] + "-col-" + this.grid[i][1]).addClass("bomb")
				}
			}
		}
	}
}

$(function() {
	let grid: any = new Grid
	grid.render()
	let game: any = new Game
	game.place_bombs()

	// let grid: any = new Grid
	// console.log(grid.render())
})