# Rectamble

A board game.


## Game rules

There are two players with different color pens, a sheet of paper and 2 dices.

Each turn the player drops dices and draws the rectangle of their own color with sizes provided by dices (e.g., 1x4 or 5x6).

The rectangle

- **should not exceed** the play field,
- **should not overlap** existing rectangles,
- **should touch** at least one rectangle of "own" color ("point touch" does not count).

If it's impossible to draw the rectangle, user skips the turn.

Whoever occupies more space wins.


## Technologies

- TypeScript;
- backend: NodeJS/Express;
- frontend: TS + SCSS (compiled by Webpack); no frameworks.

Drawing is done on canvas2D.


## Development and production

- `npm run client:dev`
- `npm run client:prod` to compile minified production code.
- `npm run server` starts the server on `:8080`.



## Credits

Roman Melnyk, https://melnyk.site
