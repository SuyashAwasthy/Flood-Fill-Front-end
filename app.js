document.getElementById('reset-button').addEventListener('click',() => {
    window.location.reload();
})

let startCell = null;
		let endCell = null;
		const walls = new Set();

		// Get all cells in the grid
		const cells = document.querySelectorAll('.cell');

		// Add event listeners to cells
		cells.forEach(cell => {
			cell.addEventListener('click', () => {
				if (startCell === null) {
					startCell = cell;
					cell.classList.add('start');
				} else if (endCell === null) {
					endCell = cell;
					cell.classList.add('end');
				} else {
					if (walls.has(cell)) {
						walls.delete(cell);
						cell.classList.remove('wall');
					} else {
						walls.add(cell);
						cell.classList.add('wall');
					}
				}
			});
		});

		// Add event listener to solve button
		document.getElementById('solve-button').addEventListener('click', () => {
			if (startCell === null || endCell === null) {
				alert('Please select start and end cells');
				return;
			}

			// Create set of visited cells
			const visited = new Set();
			visited.add(startCell);

			// Create queue for BFS algorithm
			const queue = [[startCell, [startCell]]];

			// Perform BFS algorithm
			while (queue.length > 0) {
				const [cell, path] = queue.shift();

				if (cell === endCell) {
					path.forEach(cell => cell.classList.add('path'));
					return;
				}

				const neighbors = getNeighbors(cell);
				neighbors.forEach(neighbor => {
					if (!visited.has(neighbor) && !walls.has(neighbor)) {
						visited.add(neighbor);
						queue.push([neighbor, [...path, neighbor]]);
						neighbor.classList.add('visited');
					}
				});
			}

			alert('No path found');
		});

		// Function to get neighboring cells
		function getNeighbors(cell) {
			const index = Array.from(cells).indexOf(cell);
			const neighbors = [];

			if (index % 8 !== 0) {
				// Cell is not on the left edge
				const left = cells[index - 1];
				neighbors.push(left);
			}

			if (index % 8 !== 7) {
				// Cell is not on the right edge
				const right = cells[index + 1];
				neighbors.push(right);
			}

			if (index >= 8) {
				// Cell is not on the top edge
				const top = cells[index - 8];
				neighbors.push(top);
			}

			if (index < 56) {
				// Cell is not on the bottom edge
				const bottom = cells[index + 8];
				neighbors.push(bottom);
			}

			return neighbors;
		}