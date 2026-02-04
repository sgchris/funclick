/**
 * Board Utilities - Functions for board size calculations
 */

/**
 * Calculate the board size for a given iteration
 * Board starts at 10x10 and increases by 2 every 6 iterations
 * 
 * @param {number} iteration - Current iteration (1-indexed)
 * @returns {number} Board size (width and height are equal)
 */
export function calculateBoardSize(iteration) {
  // Iterations 1-6: 10, Iterations 7-12: 12, etc.
  return 10 + Math.floor((iteration - 1) / 6) * 2
}

/**
 * Calculate the time limit for a given iteration
 * Starts at 3.0 seconds, decreases by 0.1s each iteration, minimum 2.0s
 * 
 * @param {number} iteration - Current iteration (1-indexed)
 * @returns {number} Time limit in seconds
 */
export function calculateTimeLimit(iteration) {
  return Math.max(2.0, 3.0 - (iteration - 1) * 0.1)
}

/**
 * Get all cell positions on the board
 * 
 * @param {number} boardSize - Size of the board
 * @returns {Array<{row: number, col: number}>} Array of all positions
 */
export function getAllPositions(boardSize) {
  const positions = []
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      positions.push({ row, col })
    }
  }
  return positions
}

/**
 * Get empty positions on the board (positions without tiles)
 * 
 * @param {number} boardSize - Size of the board
 * @param {Array<{row: number, col: number}>} occupiedPositions - Currently occupied positions
 * @returns {Array<{row: number, col: number}>} Array of empty positions
 */
export function getEmptyPositions(boardSize, occupiedPositions) {
  const occupied = new Set(
    occupiedPositions.map(pos => `${pos.row},${pos.col}`)
  )
  
  return getAllPositions(boardSize).filter(
    pos => !occupied.has(`${pos.row},${pos.col}`)
  )
}
