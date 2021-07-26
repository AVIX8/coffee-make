<template>
  <div v-if="items.length > 0" id="catalogBox">
    <h3 class="cartTitle">Корзина ({{ items.length }})</h3>
    <div class="content">
      <div class="products pr">
        <CartCard
          v-for="(item, i) in items"
          :key="i"
          class="shadowBox"
          :item="item"
        />
      </div>
      <div class="orderBox ob shadowBox">
        <button class="orderButton" @click="getValidItems">
          Оформить заказ
        </button>
        <button class="orderButton" @click="confirmOrder">
          Подтвердить заказ
        </button>
        <div class="cashiers-check"></div>
      </div>
    </div>
  </div>
  <div v-else>Здесь пока ничего нет</div>
</template>

<script>
// import SelectedTags from '../components/SelectedTags.vue'
export default {
  // components: { SelectedTags },
  layout: 'adaptivLayout',
  transition: 'catalog',
  data() {
    return {
      tmpItems: [
        {
          SKU: '0002',
          quantity: 8,
        },
        {
          SKU: '0003',
          quantity: 8,
        },
        {
          SKU: '0004',
          quantity: 3,
        },
      ],
      validItems: {},
    }
  },
  computed: {
    items() {
      return this.$store.state.cart.items
    },
  },
  mounted() {
    // this.$refs.catalogBox.style.minHeight =
    //   this.$store.state.windowHeight - 200 + 'px'
  },
  destroyed() {},
  methods: {
    getValidItems() {
      console.log(this.tmpItems)
      this.$store
        .dispatch('api/getValidItems', this.tmpItems)
        .then(({ validItems }) => {
          this.validItems = validItems
          console.log(validItems)
          this.validItems.totalPrice = 47474747 // сделал цену не валидной
        })
    },
    confirmOrder() {
      this.$store
        .dispatch('api/createOrder', {
          items: this.tmpItems,
          validItems: this.validItems,
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          this.validItems = err.response.data.validItems
          console.log(err.response.data)
        })
    },
  },
}
</script>

<style scoped lang="scss">
#catalogBox {
  position: relative;
  padding: 0 12% 5rem 12%;

  // background: $main-light-color;
}
.cartTitle {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  height: 3rem;
  width: 100%;
}
.content {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 0px 1rem;
  grid-auto-flow: row;
  grid-template-areas: 'pr ob';
  margin-top: 2rem;
  height: 100%;
}

.hd {
  grid-area: hd;
  margin-bottom: 1rem;
}
.ob {
  grid-area: ob;
}
.pr {
  grid-area: pr;
}
.shadowBox {
  border-radius: 20px;
  box-shadow: 0 1px 0.15rem gray;
}

.orderBox {
  position: sticky;
  top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;

  background: whitesmoke;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}
.orderButton {
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  color: white;
  font-size: 1.2rem;
  border-radius: 20px;
  background: $main-light-color;
  transition: all 0.3s;
}
.orderButton:hover {
  background: $main-color;
}
.categoryTitle {
  margin: 1rem 0 0 2rem;
  font-size: 2rem;
}
.sortButton {
  margin: 0 0.5rem;
  padding: 2px 0;
  border-bottom: 1px dashed black;
}
.fake-shadow {
  position: absolute;
  margin-top: 0.2rem;
  left: 39%;
  width: 47%;
  background: whitesmoke;
  box-shadow: 0 0 0.4rem 0.8rem whitesmoke;
  z-index: 2;
}
@media screen and (max-width: $mobile) {
  #catalogBox {
    position: relative;
    padding: 0 1rem;
    padding-bottom: 5rem;
    background: whitesmoke;
  }
  #path {
    padding: 0;
  }
  #searchBox {
    grid-template-columns: 1fr 1fr;
    width: auto;
    margin: 0;
    padding: 0.5rem;
    font-size: 0.6rem;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .hd {
    grid-area: hd;
    margin-bottom: 1rem;
  }
  .ob {
    grid-area: ob;
  }
  .pr {
    grid-area: pr;
  }
  .orderBox {
    position: unset;
    margin: 0;
    margin-bottom: 1rem;
  }
}
</style>
