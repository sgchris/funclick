import { TrophyIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { useGame } from '../context/GameContext'
import Modal from '../components/Modal'
import Button from '../components/Button'

/**
 * GameOverModal Component - Displayed when the game ends
 * 
 * Shows final score and restart button
 */
function GameOverModal() {
  const { state, actions } = useGame()
  const { highestClicked, iteration } = state
  const { resetGame, startGame } = actions

  const handleRestart = () => {
    resetGame()
    startGame()
  }

  // Determine score tier for different messages
  const getScoreMessage = () => {
    if (highestClicked >= 50) return { text: 'Legendary!', emoji: '🏆' }
    if (highestClicked >= 30) return { text: 'Amazing!', emoji: '🌟' }
    if (highestClicked >= 20) return { text: 'Great job!', emoji: '🎉' }
    if (highestClicked >= 10) return { text: 'Nice try!', emoji: '👍' }
    return { text: 'Keep practicing!', emoji: '💪' }
  }

  const scoreMessage = getScoreMessage()

  return (
    <Modal>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 shadow-2xl max-w-md w-full mx-4">
        {/* Game Over header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
          <p className="text-xl text-slate-400">{scoreMessage.text}</p>
        </div>

        {/* Score display */}
        <div className="bg-slate-700/30 rounded-xl p-6 mb-6 border border-slate-600/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrophyIcon className="w-8 h-8 text-amber-400" />
            <span className="text-slate-400 text-lg">Final Score</span>
          </div>
          <div className="text-6xl font-black text-center bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {highestClicked}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-200">{iteration}</div>
            <div className="text-sm text-slate-500">Rounds</div>
          </div>
          <div className="w-px bg-slate-700" />
          <div>
            <div className="text-2xl font-bold text-slate-200">
              {highestClicked > 0 ? (highestClicked / iteration).toFixed(1) : 0}
            </div>
            <div className="text-sm text-slate-500">Avg/Round</div>
          </div>
        </div>

        {/* Restart button */}
        <Button
          onClick={handleRestart}
          variant="success"
          size="lg"
          className="w-full group"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Play Again
        </Button>

        {/* Back to menu option */}
        <button
          onClick={resetGame}
          className="w-full mt-3 py-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
        >
          Back to Menu
        </button>
      </div>
    </Modal>
  )
}

export default GameOverModal
