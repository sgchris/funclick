# FunClicker

## Game Overview

FunClicker is a browser-based, single-player reaction board game. The player must click numbered tiles in **strict ascending order** before a countdown timer expires. As the game progresses, the board grows larger, more tiles appear per round, and the available time per round decreases.

The game continues until the player fails to click **all required tiles within the time limit**.

---

## Core Gameplay Loop

The game progresses in **iterations (rounds)**.

Each iteration follows this sequence:

1. A set of numbered tiles appears **simultaneously** at random empty positions on the board.
2. The player must click the tiles in **ascending numerical order**, starting from the lowest number.
3. A countdown timer runs for the duration of the iteration.
4. When the player clicks a tile:
   - If it is the **correct next number**, the tile disappears with a **smooth, quick animation**.
   - If it is **not the correct next number**, the click is **ignored** (no penalty).
5. If all tiles are clicked in the correct order before the timer expires:
   - The iteration is successful.
   - The timer resets.
   - The next iteration begins immediately.
6. If the timer expires before all tiles are clicked:
   - The game ends.
   - A **Game Over** popup is displayed.

---

## Numbering Rules

- Tile numbers are **globally increasing** throughout the entire game.
- The first tile is numbered **1**.
- Each new tile uses the next consecutive number.
- Numbers never reset during a game session.

Example progression:
- Iteration 1: tile **1**
- Iteration 2: tiles **2, 3**
- Iteration 3: tiles **4, 5, 6** (or more)

The player’s **score** is the **highest number successfully clicked**.

---

## Tile Spawn Rules

- **Iteration 1**
  - Exactly **1 tile** appears (number 1).
- **Iteration 2**
  - Exactly **2 tiles** appear (numbers 2 and 3).
- **Iteration 3 and onward**
  - A random number of tiles appears.
  - The amount is determined by the **current board size**:
    - Minimum tiles per iteration: `ceil(⅓ × board side length)`
    - Maximum tiles per iteration: `ceil(⅔ × board side length)`

### Examples

- 12×12 board → between **4 and 8 tiles**
- 18×18 board → between **6 and 12 tiles**

All tiles:
- Spawn **simultaneously**
- Appear only in **empty board cells**
- Disappear when clicked correctly
- Are cleared automatically when the iteration ends (success or failure)

---

## Board Size Progression

- Initial board size: **10 × 10**
- Every **6 successful iterations**, the board increases by **2 tiles** in both width and height.

### Example Progression

- Iterations 1–6 → 10×10
- Iterations 7–12 → 12×12
- Iterations 13–18 → 14×14
- And so on

---

## Timer & Difficulty Scaling

- Initial time per iteration: **3.0 seconds**
- After each successful iteration, the time limit is reduced by **0.1 seconds**
- Minimum possible time per iteration: **2.0 seconds**

### Timer Characteristics

- Displays seconds with **one decimal place**
- Includes a **visual countdown slider**
- Resets at the start of every iteration

---

## User Interface

- **Platform**: Desktop browsers only (PC)
- **Main area**: Game board
- **Left sidebar**:
  - Last correctly clicked number
  - Countdown timer (numeric display + slider)

---

## Game Over

- Trigger condition: Timer expires before all tiles are clicked.
- Display a modal or popup containing:
  - **Game Over** message
  - Final score (highest number reached)
  - **Start Again** button

Clicking **Start Again** resets:
- Board size
- Iteration count
- Timer
- Score
- Tile numbering

---

## Visual & Interaction Details

- Clicking a correct tile:
  - Triggers a **smooth, fast disappearance animation**
  - Feels responsive and satisfying
- Clicking an incorrect tile:
  - Is ignored (no animation, no penalty)

---

## Technology Stack

- Browser-based game
- JavaScript (no TypeScript)
- React
- Vite
- NPM / NPX
- Tailwind CSS
- Heroicons
- Google Fonts
