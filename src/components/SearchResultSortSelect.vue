<template>
  <div class="input-group">
    <label 
      class="input-group-text" 
      for="inputGroupSelect"
    >
      Sorter etter
    </label>
    <select 
      id="inputGroupSelect"
      v-model="selectedOption"
      class="form-select" 
      aria-label="Sort results"
      @change="onSelectChange"
    >
      <option 
        v-for="sortOption in sortOptions"
        :key="sortOption"
        :value="sortOption.value"
      >
        {{ sortOption.text }}
      </option>
    </select>
    <button 
      class="btn border border-gray" 
      type="button"
      :disabled="selected === 'random'"
      @click="toggleSortMode"
    >
      <BIconSortAlphaDown 
        v-if="sortModeState === 1" 
        class="fs-4" 
      />
      <BIconSortAlphaUpAlt 
        v-else 
        class="fs-4" 
      />
    </button>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { BIconSortAlphaDown, BIconSortAlphaUpAlt } from 'bootstrap-icons-vue'

export default {
  components: {
    BIconSortAlphaDown,
    BIconSortAlphaUpAlt,
  },
  props: {
    sortOptions: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      requried: true,
      default: "",
    },
    sortMode: {
      type: Number,
      required: true
    }
  },
  emits: ["update:selected", "update:sortMode"],
  setup(props, { emit }) {
    const { sortMode, selected } = toRefs(props)
    const sortModeState = ref(sortMode.value)
    const selectedOption = ref(selected.value)

    const toggleSortMode = () => {
      sortModeState.value *= -1
      emit("update:sortMode", sortModeState.value)
    }

    const onSelectChange = (event) => {
      const { value } = event.target
      emit("update:selected", value)
    }

    return {
      selectedOption,
      sortModeState,
      toggleSortMode,
      onSelectChange,
    }
  },
}
</script>
