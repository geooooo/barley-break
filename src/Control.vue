<template>

<div class="control">
    <button @click="clickReset" class="control__element">Сброс</button>
    <button @click="clickStart" class="control__element">Старт</button>
    <label>
        Задержка:
        <input @keyup.enter="changeDelay($event)" :value="delay" class="control__element" type="text">
    </label>
</div>

</template>



<script>

export default {
    data() {
        return {
            delay: 1000
        };
    },
    methods: {
        clickReset() {
            this.$emit("onClickReset");
        },
        clickStart() {
            this.$emit("onClickStart");
        },
        changeDelay($event) {
            this.delay = Number($event.target.value);
            this.$emit("onChangeDelay", this.delay);
        }
    },
    created() {
        this.$emit("onChangeDelay", this.delay);
    },
};

</script>



<style scope>

.control {
    display: flex;
    justify-content: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #eee;
}

.control > * {
    margin-right: 10px;
}
.control > *:last-child {
    margin-right: 0;
}

.control__element {
    padding: 5px;
}
button.control__element {
    cursor: pointer;
}

</style>
