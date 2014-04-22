# _Unnamed Card Game_

_Open source TCG engine made with node/canvas_
_You need node.js! http://nodejs.org/_

## Project Setup

_How do I, as a developer, start working on the project?_ 

1. _Check out the git `git clone https://github.com/LexTheGreat/Unnamed-Card-Game`_
2. _Enter the directory `cd Unnamed-Card-Game`_
3. _Setup npm `npm install`_
4. _Run node `node server`_

## Adding cards
1. _Open cards.json_
2. _Cards are formated in object change or add a new card in cards.json_
```json
 {
    "Level": 1, // Set the cards level
    "Name": "CardName", // Cards name
    "Desc": "Basic Desc.", // What the description is
    "Power": 1, // Attack power
    "Defence": 1, // Defence Power
    "Photo": "Monster.png" // IMPORTANT, card photo name on client!
 }
```
3. _"Photo": "Monster.png" reflects to `public/img/card/Monster.png`_

## Testing

1. _Enter the directory `node server`_
2. _Connect to `yourip:3232`_

### _How to setup the deployment environment_

- _Requireds Node and webrowser_

## Contributing changes

- _"Please open github issues"_
