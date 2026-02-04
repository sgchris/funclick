/**
 * Game Reducer - Manages all game state transitions
 * 
 * State shape:
 * - gameStatus: 'idle' | 'playing' | 'gameover'
 * - iteration: Current iteration number (1-indexed)
 * - boardSize: Current board dimensions (starts at 10)
 * - tiles: Array of tile objects { id, number, row, col, visible }
 * - nextExpectedNumber: The next number the player should click
 * - highestClicked: The highest number successfully clicked (score)
 * - timeLimit: Time allowed for current iteration
 * - timeRemaining: Time left in current iteration
 * - globalNextNumber: Next number to assign to a new tile
 */

export const initialState = {
  gameStatus: 'idle',
  iteration: 1,
  boardSize: 10,
  tiles: [],
  nextExpectedNumber: 1,
  highestClicked: 0,
  timeLimit: 4.0,
  timeRemaining: 4.0,
  globalNextNumber: 1,
}

export const gameActions = {
  START_GAME: 'START_GAME',
  SPAWN_TILES: 'SPAWN_TILES',
  CLICK_TILE: 'CLICK_TILE',
  TICK_TIMER: 'TICK_TIMER',
  NEXT_ITERATION: 'NEXT_ITERATION',
  GAME_OVER: 'GAME_OVER',
  RESET_GAME: 'RESET_GAME',
}

export function gameReducer(state, action) {
  switch (action.type) {
    case gameActions.START_GAME: {
      return {
        ...initialState,
        gameStatus: 'playing',
      }
    }

    case gameActions.SPAWN_TILES: {
      // action.payload: { tiles: [{ id, number, row, col }] }
      const newTiles = action.payload.tiles.map(tile => ({
        ...tile,
        visible: true,
      }))
      
      // Calculate the next global number after spawning
      const maxNumber = Math.max(...newTiles.map(t => t.number))
      
      return {
        ...state,
        tiles: newTiles,
        globalNextNumber: maxNumber + 1,
      }
    }

    case gameActions.CLICK_TILE: {
      // action.payload: { tileNumber }
      const { tileNumber } = action.payload

      // Check if this is the correct next number
      if (tileNumber !== state.nextExpectedNumber) {
        return state // Ignore incorrect clicks
      }

      // Mark tile as not visible (will animate out)
      const updatedTiles = state.tiles.map(tile =>
        tile.number === tileNumber
          ? { ...tile, visible: false }
          : tile
      )

      return {
        ...state,
        tiles: updatedTiles,
        nextExpectedNumber: state.nextExpectedNumber + 1,
        highestClicked: tileNumber,
      }
    }

    case gameActions.TICK_TIMER: {
      // action.payload: { delta } - time elapsed in seconds
      const newTimeRemaining = Math.max(0, state.timeRemaining - action.payload.delta)
      
      return {
        ...state,
        timeRemaining: newTimeRemaining,
      }
    }

    case gameActions.NEXT_ITERATION: {
      const nextIteration = state.iteration + 1
      
      // Calculate new board size (increases by 2 every 6 iterations)
      // Iterations 1-6: 10, Iterations 7-12: 12, etc.
      const newBoardSize = 10 + Math.floor((nextIteration - 1) / 6) * 2
      
      // Calculate new time limit (decreases by 0.1s each iteration, min 2.0s)
      const newTimeLimit = Math.max(2.0, 4.0 - (nextIteration - 1) * 0.1)

      return {
        ...state,
        iteration: nextIteration,
        boardSize: newBoardSize,
        tiles: [],
        timeLimit: newTimeLimit,
        timeRemaining: newTimeLimit,
      }
    }

    case gameActions.GAME_OVER: {
      return {
        ...state,
        gameStatus: 'gameover',
      }
    }

    case gameActions.RESET_GAME: {
      return {
        ...initialState,
      }
    }

    default:
      return state
  }
}
