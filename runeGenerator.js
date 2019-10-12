const runeGenerator = () => {

  let attempts = 0;

  // const gridChars = [' ','│','┤','┐','└','┴','┬','├','─','┼','┘','┌']
  const gridChars = [' ','│','┤','┐','└','┴','┬','├','─','┘','┌']

  const path = {
    v: '│',
    du: '│',
    ud: '│',
    h: '─',
    lr: '─',
    rl: '─',
    ul: '┘',
    lu: '┘',
    ur: '└',
    ru: '└',
    dl: '┐',
    ld: '┐',
    dr: '┌',
    rd: '┌',
    nu: '┬',
    nd: '┴',
    nl: '├',
    nr: '┤',
  }

  const rune = [
    ['X','X','X','X','X','X','X'],
    ['X','0','0','0','X','X','X'],
    ['X','0','0','0','0','0','X'],
    ['X','0','0','0','0','0','X'],
    ['X','0','0','0','0','0','X'],
    ['X','0','0','0','0','0','X'],
    ['X','0','0','0','0','0','X'],
    ['X','X','X','0','0','0','X'],
    ['X','X','X','X','X','X','X'],
  ];

  const origin = {
    y: 1 + Math.floor(Math.random() * 7),
    x: 1 + Math.floor(Math.random() * 5)
  }

  const countSurroundingXs = (y, x) => {
    let xs = 0;
    if (rune[y - 1][x] === 'X') xs++
    if (rune[y + 1][x] === 'X') xs++
    if (rune[y][x - 1] === 'X') xs++
    if (rune[y][x + 1] === 'X') xs++
    return xs;
  }

  const chooseRandomDirection = (y, x) => {
    let possibleDirs = [];

    if (rune[y - 1][x] === '0') possibleDirs.push('u')
    if (rune[y + 1][x] === '0') possibleDirs.push('d')
    if (rune[y][x - 1] === '0') possibleDirs.push('l')
    if (rune[y][x + 1] === '0') possibleDirs.push('r')
    
    return possibleDirs[Math.floor(Math.random() * possibleDirs.length)]

  }

  while (
    rune[origin.y][origin.x] === 'X' ||
    countSurroundingXs(origin.y, origin.x) > 1
  ) {
    attempts++;
    origin.y = 1 + Math.floor(Math.random() * 7);
    origin.x = 1 + Math.floor(Math.random() * 5);
  }

  if (countSurroundingXs(origin.y, origin.x) === 1) {
    if (rune[origin.y - 1][origin.x] === 'X') rune[origin.y][origin.x] = path.nu
    else if (rune[origin.y + 1][origin.x] === 'X') rune[origin.y][origin.x] = path.nd
    else if (rune[origin.y][origin.x - 1] === 'X') rune[origin.y][origin.x] = path.nl
    else if (rune[origin.y][origin.x + 1] === 'X') rune[origin.y][origin.x] = path.nr
  } else {
    const missingDirection = Math.floor(Math.random() * 4);
    if (missingDirection === 0) rune[origin.y][origin.x] = path.nu
    else if (missingDirection === 1) rune[origin.y][origin.x] = path.nd
    else if (missingDirection === 2) rune[origin.y][origin.x] = path.nl
    else if (missingDirection === 3) rune[origin.y][origin.x] = path.nr
  }

  const lengths = [
    '358',
    '385',
    '538',
    '583',
    '835',
    '853',
  ]

  const lengthRandomizer = Math.floor(Math.random() * 6);

  const generatePath = (targetLength) => {

    // let targetLength = parseInt(lengths[lengthRandomizer], 10)
    // let targetLength = 8
    let y = origin.y;
    let x = origin.x;
    let length = 0;
    let lastDir;
    let nextDir;

    if (rune[origin.y][origin.x] !== path.nu && rune[origin.y - 1][origin.x] === '0') {
      y--;
      lastDir = 'd';
    } else if (rune[origin.y][origin.x] !== path.nd && rune[origin.y + 1][origin.x] === '0') {
      y++;
      lastDir = 'u';
    } else if (rune[origin.y][origin.x] !== path.nr && rune[origin.y][origin.x + 1] === '0') {
      x++;
      lastDir = 'l';
    } else if (rune[origin.y][origin.x] !== path.nl && rune[origin.y][origin.x - 1] === '0') {
      x--;
      lastDir = 'r';
    }
    else {
      return 'fail'
    }

    nextDir = chooseRandomDirection(y, x);
    while (length < targetLength - 1 && nextDir) {
      rune[y][x] = path[lastDir + nextDir];
      if (nextDir === 'u') {y--, lastDir = 'd'}
      else if (nextDir === 'd') {y++, lastDir = 'u'}
      else if (nextDir === 'l') {x--, lastDir = 'r'}
      else if (nextDir === 'r') {x++, lastDir = 'l'}
      length++
      nextDir = chooseRandomDirection(y, x);
    }
    
    if (length < targetLength - 1) return 'fail'
    rune[y][x] = /[lr]/.test(lastDir) ? path.h : path.v;
  }

  if (generatePath(lengths[lengthRandomizer][0]) || generatePath(lengths[lengthRandomizer][1]) || generatePath(lengths[lengthRandomizer][2])) return {fullRune: 'FAIL'}

  const fullRune = rune.reduce((acc, row) => {
    return acc + '\n' + row.join('');
  }, '');

  return {
    origin,
    originPoint: rune[origin.y][origin.x],
    fullRune,
    attempts,
    surroundingXs: countSurroundingXs(origin.y, origin.x)
  };

}

module.exports = runeGenerator;