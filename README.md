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

First seen [here](https://www.facebook.com/photo.php?fbid=2118859184833308&set=a.686195238099717&type=3&theater).  
![image](https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/45694381_2118859188166641_6168164372448280576_n.jpg?_nc_cat=100&_nc_ht=scontent-ams3-1.xx&oh=45463c3cc756462ce9dc067e1391566b&oe=5C7C4FDE)


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

Development: Roman Melnyk, https://melnyk.site  
Game idea: unknown; maybe [Igor Pertsiya](https://www.facebook.com/igor.pertsiya)
