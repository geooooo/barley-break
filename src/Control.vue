<template>

<div class="control">
    <button @click="clickReset" class="control__element">Начать заново</button>
</div>

</template>



<script>

export default {
    data() {
        return {};
    },
    methods: {
        clickReset() {
            this.$emit("onClickReset");
        }
    }
};

</script>



<style scope>

.control {}

.control__element {
    padding: 10px;
}
button.control__element {
    cursor: pointer;
}

</style>
