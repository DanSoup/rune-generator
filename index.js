const fs = require('fs');

const runeGenerator = require('./runeGenerator.js');

const runeRow = [
  '', '', '', '', '', '', '', '', ''
]

for (let i = 0; i < 25; i++) {
  let rune = runeGenerator().fullRune
  while (rune === 'FAIL') {
    rune = runeGenerator().fullRune
  }

  for (let j = 0; j < 9; j++) {

    runeRow[j] += rune.split('\n')[j]
  
  }

}




// fs.writeFileSync('runes.txt', rune.replace(/[0X]/g, ' '), 'utf8')
// fs.writeFileSync('runes.txt', runeRow.join('\n').replace(/[0X]/g, ' '), 'utf8')
fs.appendFileSync('runes.txt', runeRow.join('\n').replace(/[0X]/g, ' '), 'utf8')