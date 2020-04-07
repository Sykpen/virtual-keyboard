const keyLayout = [
  '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'back',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
  'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '↑', 'shift',
  'cntrl', 'win', 'alt', 'space', 'alt', 'win', '←', '↓', '→', 'cntrl',
];

  let keyLayoutru = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'back',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
    'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'shift',
    'cntrl', 'win', 'alt', 'space', 'alt', 'win', '←', '↓', '→', 'cntrl',
];

//   const keyboard = [
//     192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
//     9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
//     20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
//     16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
//     17, 91, 18, 32, 18, 91, 37, 40, 39, 17,
// ];

const keyCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];

let chosen_language = 'en';

function do_the_magic(language) {
  console.log(language);
  if (language === 'en'){
    createmain(keyLayout)
  }
  else{
    createmain(keyLayoutru)
  }
}

function change_language() {
  if (chosen_language === 'ru'){
    do_the_magic(chosen_language)
    chosen_language = 'en';
    // localStorage.setItem('chosen_language', 'ru')
  }
  else if(chosen_language = 'en'){
    do_the_magic(chosen_language)
    chosen_language = 'ru';
    // localStorage.setItem('chosen_language', 'en')
  }
}

function createmain(arr) {
  document.body.innerText = '';

  const writingarea = document.createElement('textarea');
  writingarea.classList.add('writingarea');
  document.body.append(writingarea);

  const mainwrapper = document.createElement('div');
  mainwrapper.classList.add('mainback');
  document.body.append(mainwrapper);

  // let button = document.createElement('button');
  // button.innerText = 'Кликни на меня';
  // mainwrapper.append(button);
  
  // button.addEventListener('click', () => {
  //   createmain(keyLayoutru);
  // });

  const row = document.createElement('div');
  row.classList.add('row');
  mainwrapper.append(row);

  let usiblearr = arr;

  let i = 0;
  usiblearr.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.append(key);

    keyElement.classList.add(keyCode[i]);
    i += 1;
    keyElement.classList.add('cell');
    row.append(keyElement);

    // eslint-disable-next-line default-case
    switch (key) {
      case 'back':
        keyElement.classList.add('big');
        break;
      case 'tab':
        keyElement.classList.add('big');
        break;
      case 'caps':
        keyElement.classList.add('big');
        break;
      case 'enter':
        keyElement.classList.add('big');
        break;
      case 'shift':
        keyElement.classList.add('big');
        break;
      case 'space':
        keyElement.classList.add('space');
        break;
    }
  });

  row.addEventListener('mousedown', (event) => {
    const target = event.target.closest('div');
    if (target.className === 'row') return;

    target.classList.add('selected');

    if (target.innerText === 'back') {
      writingarea.value = writingarea.value.substring(0, writingarea.value.length - 1);
    } else if (target.innerText === 'space') {
      writingarea.value += ' ';
    } else if (target.innerText === 'enter') {
      writingarea.value += '\n';
    } else if (target.innerText === 'tab') {
      event.preventDefault();
      writingarea.value += '\t';
    } else if (target.innerText !== 'caps'
    && target.innerText !== 'cntrl'
    && target.innerText !== 'win'
    && target.innerText !== 'alt'
    && target.innerText !== 'shift') {
      writingarea.value += target.innerText;
    }
  });
  row.addEventListener('mouseup', (event) => {
    const target = event.target.closest('div');
    if (target.className === 'row') return;
    target.classList.remove('selected');
    writingarea.focus();
  });

  document.addEventListener('keydown', (event) => {
    writingarea.focus();
    const { code } = event;
    const codeClass = document.querySelector(`.${code}`);
    codeClass.classList.add('selected');

    writingarea.append(event.key);
  });

  document.addEventListener('keyup', (event) => {
    const { code } = event;
    const codeClass = document.querySelector(`.${code}`);
    codeClass.classList.remove('selected');
  });
}

function runOnKeys( ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    change_language();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

runOnKeys(
  "ShiftLeft",
  "ControlLeft"
);
// let language_from_local = localStorage.getItem('chosen_language');
do_the_magic(chosen_language);