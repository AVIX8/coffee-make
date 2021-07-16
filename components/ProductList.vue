<template>
  <div id="catalog-box">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="card-card"
      @click="$emit('openProduct', item)"
    >
      <Card :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          _id: '054VA72303012P',
          title: 'Mild',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['__Coffee_Make_Mild.png', 'сироп зеленый банан.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Объём (мл)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Oro',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['__Coffee_Make_Oro.png'],
          slug: 'mild',
          price: 1300,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Молочник «Eternum»',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['Молочник «Eternum» 150 мл.png'],
          slug: 'molochnik-eternum',
          price: 1200,
          optionTitle: undefined,
          options: [],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Объём (мл)',
              value: 150,
            },
          ],
          characteristics: [],
        },
        {
          _id: '054VA72303012P',
          title: 'Помпа для бутылки сиропа',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['помпа.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Сироп ARGENTO "ЗЕЛЕНЫЙ БАНАН"',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['сироп зеленый банан.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Красные стаканы',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['красные стаканы 2.jpg'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Mild',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['__Coffee_Make_Mild.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Oro',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['__Coffee_Make_Oro.png'],
          slug: 'mild',
          price: 1300,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Молочник «Eternum»',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['Молочник «Eternum» 150 мл.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Помпа для бутылки сиропа',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['помпа.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Сироп ARGENTO "ЗЕЛЕНЫЙ БАНАН"',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['сироп зеленый банан.png'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
        {
          _id: '054VA72303012P',
          title: 'Красные стаканы',
          descr:
            'Смесь арабики с ароматом сладкой карамели, какао и бисквитной выпечки (сладкий).',
          imgs: ['красные стаканы 2.jpg'],
          slug: 'mild',
          price: 1200,
          optionTitle: 'Масса (гр)',
          options: [
            {
              price: 1200,
              value: 1000,
            },
            {
              price: 300,
              value: 250,
            },
          ],
          attributes: [
            // не участвуют в фильтрации
            {
              title: 'Масса (гр)',
              value: 1000,
            },
          ],
          characteristics: [
            // участвуют в фильтации
            {
              title: 'Обжарка',
              value: 'Средняя',
            },
            {
              title: 'Кислотность',
              value: 'Средняя',
            },
            {
              title: 'Сорт',
              value: '100% арабика',
            },
            {
              title: 'Купаж',
              value: 'Смесь',
            },
            {
              title: 'География',
              value: 'Бразилия, Колумбия, Гватемала.',
            },
          ],
        },
      ],
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
#catalog-box {
  // overflow: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  // height: 100rem;
  // width: 100%;
  // background: forestgreen;
}
.card-card {
  margin: 2rem;
}
.card-card:last-child {
  // margin-bottom: 4rem;
}
#paginationBox {
  height: 10%;
  width: 100%;
  background: brown;
}
@media screen and (max-width: $mobile) {
  .card-card {
    margin: 0rem;
  }
}
</style>
