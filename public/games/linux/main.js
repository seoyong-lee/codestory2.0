(() => {
  const canvas = document.createElement('canvas');
  canvas.style = 'all: unset;';
  const gameContainer = document.querySelector('#game_container');
  gameContainer.append(canvas);
  const ctx = canvas.getContext('2d');
  const homeDir = { name: '~', children: { '.': null, Desktop: null } };
  const desktop = { name: 'Desktop', children: { '.': null, '..': homeDir } };
  homeDir.children['.'] = homeDir;
  homeDir.children.Desktop = desktop;
  desktop.children['.'] = desktop;
  let wd = desktop;
  let leftfolder = ['Recent', 'Desktop', 'Document', 'Download'];
  const firstFolder = new Image();
  const secondFolder = new Image();
  firstFolder.src = 'folder_icon.png';
  secondFolder.src = 'folder_icon.png';
  const textArr = [`Last login: ${new Date().toUTCString()}`, `${wd.name} $ `];
  const lengthLimit = 43;
  const lineLimit = 10;
  const fontSize = 16;
  document.addEventListener('keydown', keyDownHandler);
  function keyDownHandler(e) {
    switch (e.keyCode) {
    case 8:
      if (textArr[textArr.length - 1].length > wd.name.length + 3) {
        textArr[textArr.length - 1] = textArr[textArr.length - 1].slice(0, -1);
      } break;
    case 13:
      const commandArr = textArr[textArr.length - 1].slice(wd.name.length + 3).match(/\S+/g) || [];
      switch (commandArr[0]) {
      case undefined:
        break;
      case 'cd':
        if (!commandArr[1] || commandArr[1] === '~') {
          wd = homeDir;
        } else {
          const path = commandArr[1].replace(/\/$/g, '');
          const pathArr = path.split('/');
          let newWd = wd;
          let isDirectoryChanged = true;
          for (let folder of pathArr) {
            if (!newWd.children[folder] || !newWd.children[folder].children) {
              textArr.push(`cd: no such file or directory: ${commandArr[1]}`);
              isDirectoryChanged = false;
              break;
            } else {
              newWd = newWd.children[folder];
            }
          }
          if (isDirectoryChanged) {
            wd = newWd;
          }
        } break;
      case 'mkdir':
        for (let i = 1; i < commandArr.length; ++i) {
          if (Object.keys(wd.children).includes(commandArr[i])) {
            textArr.push(`mkdir: ${commandArr[i]}: File exists`);
          } else {
            const newDir = { name: commandArr[i], children: { '.': null, '..': wd } };
            newDir.children['.'] = newDir;
            wd.children[commandArr[i]] = newDir;
          }
        } break;
      case 'rm':
        const options = [];
        for (let i = 1; i < commandArr.length; ++i) {
          if (commandArr[i][0] === '-' && commandArr[i].length > 1) {
            options.push(...commandArr[i].slice(1).split(''));
          }
        }
        if (options.includes('-')) {
          textArr.push('rm: illegal option -- -');
          break;
        }
        for (let i = 1; i < commandArr.length; ++i) {
          if (commandArr[i][0] !== '-' || commandArr[i].length === 1) {
            if (!Object.keys(wd.children).includes(commandArr[i])) {
              textArr.push(`rm: ${commandArr[i]}: No such file or directry`);
            } else if (wd.children[commandArr[i]].children && !options.includes('r')) {
              textArr.push(`rm: ${commandArr[i]}: is a directory`);
            } else if (commandArr[i] === '.' || commandArr[i] === '..') {

            } else {
              delete wd.children[`${commandArr[i]}`];
            }
          }
        } break;
      default:
        textArr.push(`bash: command not found: ${commandArr[0]}`);
      }
      textArr.push(`${wd.name} $ `); break;
    case 16:
    case 20:
      break;
    default:
      textArr[textArr.length - 1] += e.key === 'Unidentified' ? '' : e.key;
    }
  }
  function drawBackGround() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(leftfolder[0], 0.05 * canvas.width, 0.12 * canvas.height);
    ctx.fillText(leftfolder[1], 0.05 * canvas.width, 0.2 * canvas.height);
    ctx.fillText(leftfolder[2], 0.05 * canvas.width, 0.28 * canvas.height);
    ctx.fillText(leftfolder[3], 0.05 * canvas.width, 0.36 * canvas.height);
    ctx.closePath();
  }
  function drawBar() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 0.05 * canvas.height);
    ctx.fillStyle = 'rgb(63,63,63)';
    ctx.fill();
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(wd.name, 0.05 * canvas.width, 0.035 * canvas.height);
    ctx.closePath();
  }
  function drawCLI() {
    ctx.beginPath();
    ctx.rect(0, 0.75 * canvas.height, canvas.width, 0.25 * canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
  }
  function drawGUI() {
    ctx.beginPath();
    ctx.rect(0.25 * canvas.width, 0.05 * canvas.height, 0.75 * canvas.width, 0.7 * canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
    const fWidth = 0.2 * canvas.width;
    const fHeight = 0.2 * canvas.width;
    const toDisplay = Object.keys(wd.children).filter((f) => f[0] !== '.');
    let fPosition = 1;
    let gap = 65;
    for (let f of toDisplay) {
      ctx.beginPath();
      let lineX = gap + fPosition * fWidth;
      let lineY = 0.08 * canvas.height;
      ctx.drawImage(firstFolder, lineX, lineY, fWidth, fHeight);
      ctx.fill();
      ctx.closePath();
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      ctx.fillText(f, gap + 55.5 - (f.length) * 3.3 + fPosition * fWidth, 0.3 * canvas.height);
      ++fPosition;
      gap += 20;
    }
  }
  function drawText() {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    let linePosition = 1;
    for (let i = Math.max(textArr.length - lineLimit, 0); i < textArr.length; ++i) {
      for (let j = 0; j < textArr[i].length; j += lengthLimit) {
        ctx.fillText(textArr[i].slice(j, j + lengthLimit), 0.02 * canvas.width, 0.77 * canvas.height + linePosition * fontSize);
        ++linePosition;
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = Number(gameContainer.style.width.match(/\d+/)[0]);
    canvas.height = Number(gameContainer.style.height.match(/\d+/)[0]);
    drawBackGround();
    drawBar();
    drawCLI();
    drawGUI();
    drawText();
  }
  setInterval(draw, 10);
})();