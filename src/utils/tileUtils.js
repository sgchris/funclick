/**
 * Tile Utilities - Functions for tile spawning and calculations
 */

import { getEmptyPositions } from './boardUtils'

/**
 * Calculate the number of tiles to spawn for a given iteration
 * 
 * Rules:
 * - Iteration 1: 1 tile
 * - Iteration 2: 2 tiles
 * - Iteration 3+: Random between ceil(boardSize/3) and ceil(2*boardSize/3)
 * 
 * @param {number} iteration - Current iteration (1-indexed)
 * @param {number} boardSize - Current board size
 * @returns {number} Number of tiles to spawn
 */
export function calculateTileCount(iteration, boardSize) {
  if (iteration === 1) return 1
  if (iteration === 2) return 2
  
  // Iteration 3+: Random between ceil(boardSize/3) and ceil(2*boardSize/3)
  const min = Math.ceil(boardSize / 3)
  const max = Math.ceil((2 * boardSize) / 3)
  
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Fisher-Yates shuffle algorithm
 * 
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array (new array, original not modified)
 */
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Generate random positions for tiles
 * 
 * @param {number} count - Number of positions needed
 * @param {number} boardSize - Size of the board
 * @param {Array<{row: number, col: number}>} occupiedPositions - Already occupied positions
 * @returns {Array<{row: number, col: number}>} Random positions for new tiles
 */
export function getRandomPositions(count, boardSize, occupiedPositions = []) {
  const emptyPositions = getEmptyPositions(boardSize, occupiedPositions)
  const shuffled = shuffleArray(emptyPositions)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Generate tiles for a new iteration
 * 
 * @param {number} iteration - Current iteration
 * @param {number} boardSize - Current board size
 * @param {number} startNumber - First number for the tiles
 * @returns {Array<{id: string, number: number, row: number, col: number}>} Array of tile objects
 */
export function generateTiles(iteration, boardSize, startNumber) {
  const tileCount = calculateTileCount(iteration, boardSize)
  const positions = getRandomPositions(tileCount, boardSize)
  
  return positions.map((pos, index) => ({
    id: `tile-${startNumber + index}`,
    number: startNumber + index,
    row: pos.row,
    col: pos.col,
  }))
}

/**
 * Check if all tiles have been clicked (iteration complete)
 * 
 * @param {Array<{visible: boolean}>} tiles - Array of tile objects
 * @returns {boolean} True if all tiles are hidden (clicked)
 */
export function allTilesClicked(tiles) {
  return tiles.length > 0 && tiles.every(tile => !tile.visible)
}
