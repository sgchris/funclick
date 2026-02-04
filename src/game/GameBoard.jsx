import { useMemo } from 'react'
import { useGame } from '../context/GameContext'
import { useGameLoop } from '../hooks/useGameLoop'
import Tile from './Tile'

/**
 * GameBoard Component - Main game grid
 * 
 * Renders a dynamic grid that scales based on the current board size.
 * Positions tiles absolutely within their grid cells.
 */
function GameBoard() {
  const { state } = useGame()
  const { boardSize, tiles } = state
  
  // Initialize game loop (handles tile spawning and iteration transitions)
  useGameLoop()

  // Calculate optimal cell size based on viewport
  const cellSize = useMemo(() => {
    // Target max board size of 500px on desktop
    const maxBoardSize = Math.min(500, window.innerWidth - 300, window.innerHeight - 200)
    return Math.floor(maxBoardSize / boardSize)
  }, [boardSize])

  // Create grid cells
  const gridCells = useMemo(() => {
    const cells = []
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        cells.push({ row, col, key: `${row}-${col}` })
      }
    }
    return cells
  }, [boardSize])

  // Map tiles to their positions
  const tileMap = useMemo(() => {
    const map = new Map()
    tiles.forEach(tile => {
      map.set(`${tile.row}-${tile.col}`, tile)
    })
    return map
  }, [tiles])

  const boardPixelSize = cellSize * boardSize

  return (
    <div 
      className="relative bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50 shadow-2xl"
    >
      {/* Grid container */}
      <div
        className="grid gap-0"
        style={{
          width: `${boardPixelSize}px`,
          height: `${boardPixelSize}px`,
          gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
        }}
      >
        {gridCells.map(({ row, col, key }) => {
          const tile = tileMap.get(key)
          
          return (
            <div
              key={key}
              className="relative bg-slate-700/30 border border-slate-600/20 rounded-lg"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            >
              {tile && <Tile tile={tile} cellSize={cellSize} />}
            </div>
          )
        })}
      </div>

      {/* Board size indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs">
        {boardSize} × {boardSize}
      </div>
    </div>
  )
}

export default GameBoard
