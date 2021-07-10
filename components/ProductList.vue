<template>
  <div id="catalog-box">
    <div v-for="(item, index) in items" :key="index" class="card-card">
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
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style scoped lang="scss">
#catalog-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90%;
  width: 100%;
}
.card-card {
  margin: 2rem;
}
#paginationBox {
  height: 10%;
  width: 100%;
  background: brown;
}
@media screen and (max-width: $mobile) {
}
</style>
