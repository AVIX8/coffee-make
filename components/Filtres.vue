<template>
  <div id="search-filtres-box">
    <div id="filtresBox">
      <FilterOptions
        v-for="(filter, i) in filtres"
        :key="i"
        class="filter"
        :filter="filter"
        :selected="selected[filter.title]"
        @addFilter="addSelected"
        @removeFilter="removeSelected"
      ></FilterOptions>
    </div>
    <div id="selectedFiltresBox">
      <transition name="rolled">
        <button v-if="isSelectedEmpty" id="clearButton" @click="removeAll">
          Очистить всё
        </button>
      </transition>
      <transition-group name="rolled">
        <button
          v-for="(value, title) in notEmptySelected"
          :key="title"
          class="selectedFilter"
          @click="removeCategory(title)"
        >
          {{ title }}: {{ value.join('; ') }}
          <v-icon small>mdi-close</v-icon>
        </button>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {
        Купаж: [],
        Обжарка: [],
        Сорт: [],
        Кислотность: [],
        География: [],
      },
      filtres: [
        {
          title: 'Сорт',
          values: [
            '100% Арабика',
            'Арабика + Робуста',
            'Моносорт',
            'Смесь моносортов',
          ],
        },
        {
          title: 'Купаж',
          values: [
            'Арабика 100%',
            'Арабика 50%, Робуста 50%',
            'Арабика 60%, Робуста 40%',
            'Арабика 70%, Робуста 30%',
            'Арабика 80%, Робуста 20%',
            'Смесь',
          ],
        },
        {
          title: 'Обжарка',
          values: ['Очень тёмная', 'Средняя', 'Тёмная'],
        },
        {
          title: 'Кислотность',
          values: ['Без кислотности', 'Низкая', 'Средняя'],
        },
        {
          title: 'География',
          values: [
            'Бразилия',
            'Бразилия Моджиана, Колумбия Супремо',
            'Бразилия, Вьетнам',
            'Бразилия, Гватемала, Индонезия',
            'Бразилия, Колумбия',
            'Бразилия, Колумбия, Гватемала',
            'Бразилия, Уганда',
            'Вьетнам Тай Нгуен',
            'Колумбия, Гватемала, Уганда, Вьетнам',
            'Мексика, Чьяпас',
            'Респ. Гондурас Сан Маркос',
          ],
        },
      ],
    }
  },
  computed: {
    notEmptySelected() {
      const obj = {}
      for (const key in this.selected)
        if (this.selected[key].length > 0) obj[key] = this.selected[key]
      return obj
    },
    isSelectedEmpty() {
      for (const key in this.selected)
        if (this.selected[key].length > 0) return true
      return false
    },
  },
  watch: {},
  methods: {
    addSelected(option, filter) {
      this.selected[filter].push(option)
    },
    removeSelected(option, filter) {
      this.selected[filter].splice(this.selected[filter].indexOf(option), 1)
    },
    removeCategory(title) {
      this.selected[title] = []
    },
    removeAll() {
      for (const key in this.selected) {
        this.selected[key] = []
      }
    },
  },
}
</script>

<style scoped lang="scss">
#search-filtres-box {
  position: relative;
  padding: 1rem;
  min-height: 4rem;
  max-height: 15rem;
  background: whitesmoke;
}
#filtresBox {
  position: absolute;
  // display: grid;
  // display: flex;
  // align-items: center;
  width: 99%;
  // grid-template-columns: 2fr 2.5fr 1.5fr 2fr 3fr;
}
.filter {
  margin-right: 1rem;
  margin-bottom: 1rem;
  float: left;
  // min-width: 12rem;
  // display: inline-block;
}
#selectedFiltresBox {
  margin-top: 3rem;
}
.selectedFilter {
  // position: absolute;
  display: inline-block;
  margin: 0 0.5rem 0.4rem 0;
  padding: 0.3rem 1rem;
  text-align: left;
  background: lightgray;
  border-radius: 20px;
  border: 1px lightgray solid;
  transition: all 0.3s;
}
.selectedFilter:hover {
  // background: $main-light-color;
  // background: white;
  border-color: gray;
}
#clearButton {
  padding: 0.3rem 1rem;
  background: white;
  border: 1px black solid;
  border-radius: 20px;
  transition: all 0.3s;
}
#clearButton:hover {
  color: white;
  background: black;
  background: $main-color;
  border-color: $main-light-color;
}
.rolled-enter-active,
.rolled-leave-active {
  transition: all 0.6s;
}
.rolled-enter,
.rolled-leave-to {
  transform: translateX(-3rem);
  opacity: 0;
}
@media screen and (max-width: $mobile) {
}
</style>
