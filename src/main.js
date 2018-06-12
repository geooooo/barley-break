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

let callback;
let i;
let isStoped;

// Сброс AI
export function resetAI() {
  isStoped = true;
  i = 0;
}

// Запуск AI
export function startAI(_callback) {
    resetAI();
    isStoped = false;
    callback = _callback;
    stepAI()
}

// Ход AI
export function stepAI() {
    if (isStoped || (i == 2)) return;
    callback({x:i,y:i}, {x:3-i,y:3-i});
    i++;
}

new Vue({
  el: '#app',
  render: h => h(App)
})
