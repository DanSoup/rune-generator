// const gridChars = [' ','│','┤','┐','└','┴','┬','├','─','┼','┘','┌']
const gridChars = [' ','│','┤','┐','└','┴','┬','├','─','┘','┌']

const rune = [

];

for (let y = 0; y < 13; y++) {
  
  rune[y] = [];
  
  for (let x = 0; x < 9; x++) {

    rune[y][x] = (y + x) % 2 === 0
      ? ' '
    : Math.random() < 0.5
      ? ' '
    : y % 2 === 0
      ? '─'
      : '│';

  }

}

for (let y = 0; y < 13; y += 2) {
  for (let x = 0; x < 9; x += 2) {
    
      if (!rune[y][x - 1] || rune[y][x - 1] === ' ') {
        rune[y][x] = 'L';
      }

  }
}

const fullRune = rune.reduce((acc, row) => {
  return acc + '\n' + row.join('');
}, '')

console.log(fullRune)