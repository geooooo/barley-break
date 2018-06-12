<template>

<div class="app">
    <field
      @onClick="clickCell"
      class="app__field"
    ></field>
    <control
      @onClickReset="clickReset"
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
    move
} from "./main";

export default {
    components: {
        field: Field,
        control: Control
    },
    data() {
        return {};
    },
    methods: {
      clickCell(cell) {
          if (!move(cell)) return;
          eventEmitter.$emit("onSetField", field);
      },
      clickReset() {
          randomize();
          eventEmitter.$emit("onSetField", field);
      }
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
  margin-bottom: 20px;
}

</style>
