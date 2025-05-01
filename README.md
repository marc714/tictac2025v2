First ODIN version in v1:
Non-ODIN goals in v2:

Updates:
Could update Factories into Classes
Could also pull out functions into es6 modules

OLD Outline:
click new/start game

1. initgame
   a) running = true;
   b) cells get event listener with Onclick = cellClicked
2. once a cell is clicked, cellClicked runs:
   a) updateCell
   b) checkWinner
   bi) checkWinner updates running true/false
   bii) if running = false, then remove cell eventlisteners
   c) changePlayer

this in DOM event handlers https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#this_in_dom_event_handlers
https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe
https://www.youtube.com/watch?v=AnmwHjpEhtA&t=523s&ab_channel=BroCode

1. Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.  
   ---my notes: i mean we can refactor to put into IIFEs but we're gonna put them into es6 modules anyway.

2. In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

Oftentimes, you do not need a factory to produce multiple objects - instead, you are using it to wrap sections of code together, hiding the variables and functions that you do not need elsewhere as private. This is easily achievable by wrapping your factory function in parentheses and immediately calling (invoking) it.

Nice styling: https://youtu.be/n6gzxTsbHLc?si=W8SJHE5N_A2cGYvZ
