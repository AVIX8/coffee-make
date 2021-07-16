<template>
  <div ref="main" class="MAIN">
    <nuxt />

    <div v-if="$device.isDesktop" class="FOOTER">
      <!-- <yandex-map :coords="coords">
        <ymap-marker marker-id="1" :coords="coords" hint-content="Мы здесь!" />
      </yandex-map> -->
      <div class="workingHours">
        <h5>ВРЕМЯ РАБОТЫ</h5>
        ПН - ПТ с 9:00 до 18:00 <br />
        (по местному времени)
      </div>
      <div class="contacts">
        <h5>КОНТАКТЫ</h5>
        Телефон: 8 800 550 60 82 <br />
        Email: info@mycfm.ru
      </div>
      <div class="address">
        <h5>НАШ ОФИС</h5>
        ул. Красногорская, 25, оф. 307, <br />
        Новосибирск, Россия
      </div>
    </div>
    <div v-else class="mobileMenuBox">
      <nuxt-link
        v-for="(nav, i) in navigationBtns"
        :key="i"
        :to="nav.to"
        tag="div"
        class="navigation"
      >
        <v-icon>{{ nav.icon }}</v-icon>
        <p>{{ nav.title }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthentication: false,
      navigationBtns: [
        { title: 'Главная', icon: 'mdi-home', to: '/' },
        { title: 'Каталог', icon: 'mdi-text-search', to: '/catalog' },
        { title: 'Корзина', icon: 'mdi-cart', to: '/cart' },
        { title: 'Аккаунт', icon: 'mdi-account-circle', to: '/account' },
      ],
      isMenuOn: false,
      menuIcon: 'mdi-menu',
    }
  },
  computed: {},
  methods: {
    MenuClick() {
      this.isMenuOn = !this.isMenuOn
      if (this.isMenuOn) this.menuIcon = 'mdi-close'
      else this.menuIcon = 'mdi-menu'
    },
    accountClick() {
      if (Object.keys(this.$store.state.user).length === 0)
        this.isAuthentication = true
      else this.$router.push('/account')
    },
    closeAuthentication() {
      this.isAuthentication = false
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Dancing Script';
  src: url(/fonts/DancingScript-Bold.ttf); /* Путь к файлу со шрифтом */
}
.FOOTER {
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  padding: 2rem;

  width: 100%;

  font-family: 'Segoe UI', 'Open Sans', sans-serif;
  font-size: 0.96rem;

  background-color: #16191c;
  background: $dark-packege;
  z-index: 1;
}
.workingHours,
.contacts,
.address {
  margin: 0 2rem;
  color: white;
}
.workingHours h5,
.contacts h5,
.address h5 {
  // text-align: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid white;
}

.mobileMenuBox {
  position: fixed;
  bottom: 0;
  background: white;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  padding: 0.1rem;

  height: 3rem;
  width: 100%;

  background: white;
  box-shadow: 0 60px 100px 10px #3a3736;
  z-index: 99;
}
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
}
.navigation p {
  width: 100%;
  font-size: 0.6rem;
  text-align: center;
}

@media screen and (max-width: $mobile) {
  .nuxt-link-exact-active {
    color: white;
    background: $main-color;
  }
  .nuxt-link-exact-active i {
    color: #32bebd;
    color: white;
  }
}
</style>
