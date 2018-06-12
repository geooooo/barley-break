<template>

<div class="app">
    <field class="app__field"></field>
    <control
      @onClickReset="clickReset"
      @onClickStart="clickStart"
      @onChangeDelay="changeDelay"
      class="app__control"
    ></control>
</div>

</template>



<script>

import Field from "./Field";
import Control from "./Control";

import {
    eventEmitter,
    field,
    randomize,
    resetAI,
    startAI,
    stepAI
} from "./main";

export default {
    components: {
        field: Field,
        control: Control
    },
    data() {
        return {
            delay: 0
        };
    },
    methods: {
      clickReset() {
          resetAI();
          randomize();
          this.setField();
      },
      clickStart() {
          startAI((cell1, cell2) => {
              this.swap(this.delay, cell1, cell2);
          });
      },
      changeDelay(delay) {
          this.delay = delay;
      },
      swap(delay, cell1, cell2) {
          eventEmitter.$emit("onSwap", delay, cell1, cell2);
      },
      setField() {
          eventEmitter.$emit("onSetField", field);
      }
    },
    created() {
        eventEmitter.$on("onSwapped", () => {
            stepAI();
        })
    }
};

</script>



<style scope>

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

.app__field {
  margin-bottom: 10px;
}

</style>
