<template>
  <div ref="main" class="MAIN">
    <div v-if="isAuthentication" class="authenticationCover">
      <Authentication @close="closeAuthentication" />
    </div>

    <transition name="fadeDown">
      <div
        v-if="$device.isDesktop && $route.name !== 'index'"
        :class="headerStyle"
      >
        <nuxt-link to="/" style="text-decoration: none">
          <img class="logo" title="На Главную" src="/Logo_white_.png" />
        </nuxt-link>
        <div style="width: 75%" />
        <img
          class="account"
          src="/account.png"
          title="Мой Аккаунт"
          @click="accountClick"
        />
        <nuxt-link
          v-if="this.$route.name !== 'cart'"
          class="cart"
          tag="img"
          src="/cart.png"
          to="/cart"
          title="Корзина"
        />
      </div>
    </transition>

    <nuxt-link
      v-if="$device.isDesktop"
      :class="sideLinkStyle"
      tag="div"
      :to="linkRoute"
    >
      <div class="eyelet" :class="[isCatalog ? 'eyelet-left' : 'eyelet-right']">
        <v-icon v-if="isCatalog" large>mdi-chevron-left</v-icon>
        <v-icon v-else large>mdi-chevron-right</v-icon>
      </div>

      <div
        class="back-box"
        :class="[isCatalog ? 'back-box-left' : 'back-box-right']"
      />
      <div
        class="frontbox"
        :style="isCatalog ? 'background: #4494b6a1' : 'background: #e5765791'"
      >
        <v-icon v-if="!isCatalog" color="#fff" large>mdi-chevron-left</v-icon>
        {{ isCatalog ? 'Для Бизнеса' : 'Каталог' }}
        <v-icon v-if="isCatalog" color="#fff" large>mdi-chevron-right</v-icon>
      </div>
    </nuxt-link>

    <div ref="nuxtBox">
      <nuxt />
    </div>

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
// import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  // components: { yandexMap, ymapMarker },
  data() {
    return {
      isAuthentication: false,
      categories: [
        { title: 'Кофе', linkTo: '/products' },
        { title: 'Аренда кофемашин', linkTo: '/rentCoffeeMachinesMain' },
        { title: 'Сиропы', linkTo: '/products' },
        { title: 'Аксессуары', linkTo: '/products' },
        { title: 'Услуги', linkTo: '/servicesMain' },
      ],
      navigationBtns: [
        { title: 'Главная', icon: 'mdi-home', to: '/' },
        { title: 'Каталог', icon: 'mdi-text-search', to: '/catalog' },
        { title: 'Корзина', icon: 'mdi-cart', to: '/cart' },
        { title: 'Аккаунт', icon: 'mdi-account-circle', to: '/account' },
      ],
      isMenuOn: false,
      menuIcon: 'mdi-menu',
      // coords: [54.82896654088406, 39.831893822753904],
    }
  },
  computed: {
    isBusiness() {
      return this.$route.name === 'business'
    },
    isCatalog() {
      return this.$route.name === 'catalog'
    },
    headerStyle() {
      return {
        HEADER: true,
        'left-color': !this.isBusiness,
        'right-color': this.isBusiness,
      }
    },
    sideLinkStyle() {
      return {
        sideLink: true,
        blueLink: this.isCatalog,
        redLink: !this.isCatalog,
      }
    },
    linkRoute() {
      if (this.isCatalog) return '/business'
      else return '/catalog'
      // return null
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    // })
    this.$refs.nuxtBox.style.minHeight =
      this.$store.state.windowHeight - 90 + 'px'
  },
  methods: {
    MenuClick() {
      this.isMenuOn = !this.isMenuOn
      if (this.isMenuOn) this.menuIcon = 'mdi-close'
      else this.menuIcon = 'mdi-menu'
    },
    accountClick() {
      if (this.$store.state.auth.user) this.isAuthentication = true
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
.authenticationCover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.HEADER {
  // position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 15%;
  z-index: 2;
}
.left-color {
  background: $main-color;
  transition: background-color 1s;
}
.right-color {
  background: $side-dark-color;
  transition: background-color 1s;
}
.logo {
  margin: 0.2rem;
  width: 7rem;
}
.account {
  padding: 0.6rem;
  margin-left: 3rem;

  width: 3rem;

  border-radius: 50rem;
  transition: ease-out 0.5s;
}
.cart {
  padding: 0.6rem;
  margin-left: 1rem;

  width: 3rem;

  border-radius: 50rem;
  transition: ease-out 0.5s;
}
.account:hover,
.cart:hover {
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: 0 0 0.5rem black;
}
.sideLink {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 15%;
  cursor: pointer;
  z-index: 2;
  filter: drop-shadow(0 0 0.3rem $dark-packege);
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1), width 0s;
}
.blueLink {
  right: 0;
  transform: translateX(99%);
}
.redLink {
  left: 0;
  transform: translateX(-99%);
}
.redLink:hover,
.blueLink:hover {
  filter: drop-shadow(0 0 0.5rem black);
  transform: translateX(0%);
}
.sideLink:hover .eyelet {
  transform: translateX(0);
  opacity: 0;
}
.eyelet {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  margin-top: -50px;
  text-shadow: none;
  border-radius: 100%;
  z-index: -2;
  transition: all 0.5s;
}
.eyelet-left {
  padding: 0 2.5rem 0 0;
  background: $side-dark-color;
  transform: translateX(-50%);
}
.eyelet-right {
  padding: 0 0 0 2.5rem;
  background: $main-light-color;
  transform: translateX(240%);
}
.back-box {
  position: absolute;
  height: 100%;
  width: 100%;
  // filter: blur(2px);
  background-position: 75% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
.back-box-left {
  background-image: url(static\right-background.jpg);
  border-left: 5px $side-dark-color solid;
}
.back-box-right {
  background-image: url(static\left-background.jpg);
  border-right: 5px $main-light-color solid;
}
.frontbox {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  text-shadow: 0 0 1rem black;
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
.fadeDown-enter-active {
  transition: all 0s;
}
.fadeDown-leave-active {
  transition: all 0s;
}
.fadeDown-enter,
.fadeDown-leave-to {
  position: absolute;
  transform: translateY(-2rem);
  opacity: 0;
}
@media screen and (max-width: $mobile) {
  .HEADER {
    padding: 0 5%;
  }
  .nuxt-link-exact-active {
    // background: $main-color;
  }
  .nuxt-link-exact-active i {
    color: $main-light-color;
  }
  .nuxt-link-exact-active p {
    color: $main-light-color;
    font-weight: bold;
    font-size: 12px;
  }

  .MenuTransition-enter-active {
    transition: all 0.3s;
  }
  .MenuTransition-leave-active {
    transition: all 0.8s;
  }
  .MenuTransition-enter,
  .MenuTransition-leave-to {
    transform: translateX(-300px);
    opacity: 0;
  }
  .MobileMenu {
    position: absolute;
    z-index: 9;
    top: 4rem;

    height: 100%;
    width: 100%;

    background-color: white;

    border-bottom: 2px black solid;
  }

  .Categories {
    // position: relative;
    // display: grid;
    flex-wrap: wrap;

    padding: 0;

    text-align: center;
    // background: red;
    background: white;
  }
  .category {
    margin: 0.5rem 0;
    padding: 1rem;

    width: 90%;

    color: #32bebd;
    color: white;
    font-family: 'Rubik', sans-serif;
    text-decoration: none;

    border-radius: 20px;
    background: #32bebd;

    transition: 0.4s ease-out;
  }
  .category:active {
    // margin: 0.3rem 0.8rem 0.3rem 0.8rem;
    // padding: 0.15rem 1.5rem 0.15rem 1.5rem;
    margin: 0.5rem 0;
    padding: 1rem;

    background-color: #3a3736;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2),
      0px 0px 50px rgba(0, 0, 0, 0.2);

    transition: all 0.1s;
  }
}
</style>
