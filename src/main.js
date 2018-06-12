import Vue from 'vue'
import App from './App.vue'

export const eventEmitter = new Vue();

// Исходное поле
export const field = [
     "1",  "2",  "3",  "4",
     "5",  "6",  "7",  "8",
     "9", "10", "11", "12",
    "13", "14", "15",   ""
];

// Перемешивание поля
export function randomize() {
    for (let i = 0; i < field.length; i++) {
        let j = Math.trunc(Math.random() * field.length);
        let tmp = field[i];
        field[i] = field[j]
        field[j] = tmp;
    }
}

// Обработка хода игрока
export function move(cell) {
  let r;
  let c;
OUT:
  for (r = 0; r < 4; r++) {
    for (c = 0; c < 4; c++) {
      if (field[r*4 + c] == cell) break OUT;
    }
  }

  if ((c < 3) && (field[r*4 + c + 1] == "")) {
    field[r*4 + c + 1] = cell;
  } else if ((c > 0) && (field[r*4 + c - 1] == "")) {
    field[r*4 + c - 1] = cell;
  } else if ((r < 3) && (field[(r+1)*4 + c] == "")) {
    field[(r+1)*4 + c] = cell;
  } else if ((r > 0) && (field[(r-1)*4 + c] == "")) {
    field[(r-1)*4 + c] = cell;
  } else {
    return false;
  }

  field[r*4 + c] = "";
  return true;
}

// Проверка на победу
export function isWin() {
  let tmp = [
    "1", "2", "3", "4",
    "5", "6", "7", "8",
    "9", "10", "11", "12",
    "13", "14", "15", ""
  ];
  for (let i = 0; i < field.length; i++) {
    if (field[i] != tmp[i]) return false;
  }
  return true;
}

new Vue({
  el: '#app',
  render: h => h(App)
})
