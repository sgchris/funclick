import { createContext, useContext, useReducer, useCallback } from 'react'
import { gameReducer, initialState, gameActions } from './gameReducer'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Action dispatchers with useCallback for performance
  const startGame = useCallback(() => {
    dispatch({ type: gameActions.START_GAME })
  }, [])

  const spawnTiles = useCallback((tiles) => {
    dispatch({ type: gameActions.SPAWN_TILES, payload: { tiles } })
  }, [])

  const clickTile = useCallback((tileNumber) => {
    dispatch({ type: gameActions.CLICK_TILE, payload: { tileNumber } })
  }, [])

  const tickTimer = useCallback((delta) => {
    dispatch({ type: gameActions.TICK_TIMER, payload: { delta } })
  }, [])

  const nextIteration = useCallback(() => {
    dispatch({ type: gameActions.NEXT_ITERATION })
  }, [])

  const gameOver = useCallback(() => {
    dispatch({ type: gameActions.GAME_OVER })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: gameActions.RESET_GAME })
  }, [])

  const value = {
    state,
    actions: {
      startGame,
      spawnTiles,
      clickTile,
      tickTimer,
      nextIteration,
      gameOver,
      resetGame,
    },
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
