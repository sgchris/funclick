import { PlayIcon } from '@heroicons/react/24/solid'
import { useGame } from '../context/GameContext'
import Button from '../components/Button'

/**
 * StartScreen Component - Initial game screen with start button
 */
function StartScreen() {
  const { actions } = useGame()
  const { startGame } = actions

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Logo / Title */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          FunClicker
        </h1>
        <p className="text-xl text-slate-400">
          Click the numbers in ascending order!
        </p>
      </div>

      {/* Animated demo tiles */}
      <div className="flex gap-4 mb-12">
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 
                       flex items-center justify-center text-2xl font-bold text-white
                       shadow-lg shadow-indigo-500/30 animate-pop-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* How to play */}
      <div className="max-w-md text-center mb-12 space-y-4">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">How to Play</h2>
          <ul className="text-slate-400 text-sm space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span>Tiles with numbers appear on the board</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span>Click them in ascending order (1, 2, 3...)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              <span>Clear all tiles before the timer runs out</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">4.</span>
              <span>Each round gets faster and the board grows!</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start button */}
      <Button
        onClick={startGame}
        variant="success"
        size="xl"
        className="group"
      >
        <PlayIcon className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
        Start Game
      </Button>

      {/* Footer */}
      <div className="mt-12 text-slate-600 text-sm">
        Desktop only • Click fast, think faster!
      </div>
    </div>
  )
}

export default StartScreen
