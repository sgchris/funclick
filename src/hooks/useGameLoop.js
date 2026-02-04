import { useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'
import { generateTiles, allTilesClicked } from '../utils/tileUtils'

/**
 * useGameLoop Hook - Manages game iteration logic
 * 
 * Handles:
 * - Spawning tiles when a new iteration starts
 * - Detecting when all tiles are clicked (iteration complete)
 * - Transitioning to the next iteration
 */
export function useGameLoop() {
  const { state, actions } = useGame()
  const { gameStatus, iteration, boardSize, tiles, globalNextNumber } = state
  const { spawnTiles, nextIteration } = actions

  // Track if we've spawned tiles for the current iteration
  const hasSpawnedRef = useRef(false)
  const iterationRef = useRef(iteration)

  // Reset spawn flag when iteration changes
  useEffect(() => {
    if (iterationRef.current !== iteration) {
      hasSpawnedRef.current = false
      iterationRef.current = iteration
    }
  }, [iteration])

  // Spawn tiles when game starts or new iteration begins
  useEffect(() => {
    if (gameStatus !== 'playing') {
      hasSpawnedRef.current = false
      return
    }

    // Only spawn if we haven't already for this iteration
    if (hasSpawnedRef.current) {
      return
    }

    // Generate and spawn new tiles
    const newTiles = generateTiles(iteration, boardSize, globalNextNumber)
    spawnTiles(newTiles)
    hasSpawnedRef.current = true
  }, [gameStatus, iteration, boardSize, globalNextNumber, spawnTiles])

  // Check if all tiles are clicked (iteration complete)
  useEffect(() => {
    if (gameStatus !== 'playing') {
      return
    }

    // Check if all tiles have been clicked
    if (allTilesClicked(tiles)) {
      // Small delay before next iteration for visual feedback
      const timer = setTimeout(() => {
        nextIteration()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [gameStatus, tiles, nextIteration])

  return {
    iteration,
    boardSize,
    tiles,
  }
}
