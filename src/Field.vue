<template>

<div class="field">
    <div v-for="row in field" class="field__row">
        <div v-for="cell in row" :class="getFieldCellStyle(cell.isActive)">{{ cell.value }}</div>
    </div>
</div>

</template>



<script>

import {eventEmitter} from "./main";

export default {
    data() {
        return {
            field: [
                [
                    {
                        value: "1",
                        isActive: false
                    },
                    {
                        value: "2",
                        isActive: false
                    },
                    {
                        value: "3",
                        isActive: false
                    },
                    {
                        value: "4",
                        isActive: false
                    },
                ],
                [
                    {
                        value: "5",
                        isActive: false
                    },
                    {
                        value: "6",
                        isActive: false
                    },
                    {
                        value: "7",
                        isActive: false
                    },
                    {
                        value: "8",
                        isActive: false
                    },
                ],
                [
                    {
                        value: "9",
                        isActive: false
                    },
                    {
                        value: "10",
                        isActive: false
                    },
                    {
                        value: "11",
                        isActive: false
                    },
                    {
                        value: "12",
                        isActive: false
                    },
                ],
                [
                    {
                        value: "13",
                        isActive: false
                    },
                    {
                        value: "14",
                        isActive: false
                    },
                    {
                        value: "15",
                        isActive: false
                    },
                    {
                        value: "",
                        isActive: false
                    },
                ],
            ]
        };
    },
    methods: {
        getFieldCellStyle(isActive) {
            return {
                "field__cell": true,
                "field__cell_active": isActive
            };
        },
        onSwap(delay, cell1, cell2) {
            this.field[cell1.y][cell1.x].isActive = true;
            this.field[cell2.y][cell2.x].isActive = true;
            new Promise((resolve, reject) => {
                window.setTimeout(() => resolve(), delay / 2);
            }).then(() => {
                let tmp = this.field[cell1.y][cell1.x].value;
                this.field[cell1.y][cell1.x].value = this.field[cell2.y][cell2.x].value;
                this.field[cell2.y][cell2.x].value = tmp;
            }).then(() => {
                this.field[cell1.y][cell1.x].isActive = false;
                this.field[cell2.y][cell2.x].isActive = false;
                eventEmitter.$emit("onSwapped");
            });
        },
        onSetField(field) {
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    this.field[r][c].value = field[4*r + c];
                    this.field[r][c].isActive = false;
                }
            }
        },
    },
    created() {
        eventEmitter.$on("onSwap", this.onSwap);
        eventEmitter.$on("onSetField", this.onSetField);
    }
};

</script>



<style scope>

.field {
    display: table;
    border-collapse: collapse;
}

.field__row {
    display: table-row;
}

.field__cell {
    display: table-cell;
    border: 1px solid black;
    padding: 40px;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    background-color: rgb(119, 95, 44);
}

.field__cell_active {
    background-color: rgb(187, 153, 118);
    color: black;
}

</style>
