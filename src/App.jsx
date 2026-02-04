import { GameProvider } from './context/GameContext'
import { useGame } from './context/GameContext'
import GameBoard from './game/GameBoard'
import Sidebar from './game/Sidebar'
import StartScreen from './game/StartScreen'
import GameOverModal from './game/GameOverModal'

function GameLayout() {
  const { state } = useGame()
  const { gameStatus } = state

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Start Screen */}
      {gameStatus === 'idle' && <StartScreen />}

      {/* Game View */}
      {gameStatus !== 'idle' && (
        <div className="h-screen flex flex-col">
          {/* Header */}
          <header className="flex-shrink-0 px-6 py-4 border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                FunClicker
              </h1>
              <div className="text-slate-400 text-sm">
                Click tiles in ascending order!
              </div>
            </div>
          </header>

          {/* Main Game Area */}
          <main className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Game Board Container */}
            <div className="flex-1 flex items-center justify-center p-6">
              <GameBoard />
            </div>
          </main>

          {/* Footer */}
          <footer className="flex-shrink-0 px-6 py-3 border-t border-slate-700/50">
            <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
              Press the numbers in order before time runs out!
            </div>
          </footer>
        </div>
      )}

      {/* Game Over Modal */}
      {gameStatus === 'gameover' && <GameOverModal />}
    </div>
  )
}

function App() {
  return (
    <GameProvider>
      <GameLayout />
    </GameProvider>
  )
}

export default App
