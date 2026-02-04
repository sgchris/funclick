import { memo, useState, useCallback } from 'react'
import { useGame } from '../context/GameContext'

/**
 * Tile Component - Individual clickable number tile
 * 
 * Memoized to prevent unnecessary re-renders during timer ticks.
 * Handles click events and animations.
 */
const Tile = memo(function Tile({ tile, cellSize }) {
  const { actions, state } = useGame()
  const { clickTile } = actions
  const { nextExpectedNumber } = state
  
  const [isClicking, setIsClicking] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const { number, visible } = tile
  const isCorrectNext = number === nextExpectedNumber

  const handleClick = useCallback(() => {
    if (!visible || isExiting) return

    if (isCorrectNext) {
      // Correct click - animate out then register click
      setIsClicking(true)
      setIsExiting(true)
      
      // Small delay for animation, then update state
      setTimeout(() => {
        clickTile(number)
      }, 100)
    }
    // Incorrect click - do nothing (ignored)
  }, [visible, isExiting, isCorrectNext, clickTile, number])

  // Don't render if not visible and exit animation is complete
  if (!visible && !isExiting) {
    return null
  }

  // Calculate font size based on cell size and number digits
  const digits = number.toString().length
  const baseFontSize = Math.max(12, cellSize * 0.4)
  const fontSize = digits > 2 ? baseFontSize * 0.8 : baseFontSize

  return (
    <button
      onClick={handleClick}
      className={`
        absolute inset-1 rounded-xl
        flex items-center justify-center
        font-bold text-white
        transition-all duration-100
        select-none cursor-pointer
        ${isExiting 
          ? 'animate-pop-out' 
          : 'animate-pop-in'
        }
        ${isCorrectNext && visible
          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-emerald-500/50'
          : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:to-purple-500'
        }
        ${isClicking ? 'scale-90' : ''}
        active:scale-95
      `}
      style={{ fontSize: `${fontSize}px` }}
      disabled={!visible || isExiting}
      aria-label={`Tile number ${number}${isCorrectNext ? ' - click me!' : ''}`}
    >
      {number}
    </button>
  )
})

export default Tile
