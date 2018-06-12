<template>

<div @click="onClick($event)" class="field">
    <div v-for="row in 4" class="field__row">
        <div v-for="(_, index) in 4" class="field__cell">
            {{ field[(row-1)*4 + (index)].value }}
        </div>
    </div>
</div>

</template>



<script>

import {eventEmitter, isWin} from "./main";

export default {
    data() {
        return {
            field: [
                {value:  "1"}, {value: " 2"}, {value:  "3"}, {value:  "4"},
                {value:  "5"}, {value:  "6"}, {value:  "7"}, {value:  "8"},
                {value:  "9"}, {value: "10"}, {value: "11"}, {value: "12"},
                {value: "13"}, {value: "14"}, {value: "15"}, {value:   ""}
            ]
        };
    },
    methods: {
        onClick($event) {
            this.$emit("onClick", $event.target.innerHTML.trim());
        }
    },
    created() {
        eventEmitter.$on("onSetField", (field) => {
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    this.field[4*r + c].value = field[4*r + c];
                }
            }
            if (isWin()) {
                window.alert("Победа ! :)");
            }
        });
    }
};

</script>



<style scope>

.field {
    display: table;
    border-collapse: collapse;
    cursor: pointer;
}

.field__row {
    display: table-row;
}

.field__cell {
    display: table-cell;
    border: 1px solid black;
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    text-align: center;
    background-color: rgb(119, 95, 44);
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-property: color, background-color;
}
.field__cell:hover,
.field__cell:active {
    background-color: rgb(187, 153, 118);
    color: black;
}

</style>
