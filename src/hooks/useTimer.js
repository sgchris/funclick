import { useEffect, useRef, useCallback } from 'react'
import { useGame } from '../context/GameContext'

/**
 * useTimer Hook - Manages the countdown timer using requestAnimationFrame
 * 
 * Uses requestAnimationFrame for smooth, accurate timing that pauses
 * when the tab is not visible (saves resources).
 */
export function useTimer() {
  const { state, actions } = useGame()
  const { gameStatus, timeRemaining } = state
  const { tickTimer, gameOver } = actions

  const lastTimeRef = useRef(null)
  const animationFrameRef = useRef(null)

  const tick = useCallback((timestamp) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp
    }

    // Calculate time delta in seconds
    const delta = (timestamp - lastTimeRef.current) / 1000
    lastTimeRef.current = timestamp

    // Update timer
    tickTimer(delta)

    // Continue the animation loop
    animationFrameRef.current = requestAnimationFrame(tick)
  }, [tickTimer])

  useEffect(() => {
    // Only run timer when game is playing and time remaining
    if (gameStatus !== 'playing') {
      return
    }

    // Check if time has run out
    if (timeRemaining <= 0) {
      gameOver()
      return
    }

    // Start the animation frame loop
    lastTimeRef.current = null
    animationFrameRef.current = requestAnimationFrame(tick)

    // Cleanup on unmount or when dependencies change
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameStatus, timeRemaining, tick, gameOver])

  return {
    timeRemaining,
    isRunning: gameStatus === 'playing' && timeRemaining > 0,
  }
}
