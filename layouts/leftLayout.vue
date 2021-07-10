<template>
  <div ref="main" class="MAIN">
    <div v-if="isAuthentication" class="authenticationCover">
      <Authentication @close="closeAuthentication" />
    </div>

    <div class="HEADER">
      <nuxt-link to="/" style="text-decoration: none">
        <img class="logo" title="На Главную" src="/Logo_white_.png" />
      </nuxt-link>
      <img
        class="account"
        src="/account.png"
        title="Мой Аккаунт"
        @click="accountClick"
      />
      <nuxt-link
        class="cart"
        tag="img"
        src="/cart.png"
        to="/"
        title="Корзина"
      />
    </div>

    <nuxt-link id="blueLink" tag="div" to="/business">Для Бизнеса</nuxt-link>
    <nuxt />

    <div v-if="$device.isDesktop" class="FOOTER">
      <div class="workingHours">
        <h5>ВРЕМЯ РАБОТЫ</h5>
        ПН - ПТ с 9:00 до 18:00 <br />
        (по местному времени)
      </div>
      <div class="contacts">
        <h5>КОНТАКТЫ</h5>
        Телефон: +7 (383) 383-55-42 <br />
        Email: info@mycfm.ru
      </div>
      <div class="footerInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
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
@media screen and (max-width: $laptop) {
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 15%;
    background: $main-color;
    z-index: 3;
  }
  .logo {
    margin: 0.2rem;
    width: 6rem;
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
    background-color: $main-light-color;
    transition: all 0.4s;
    box-shadow: 0.2rem 0.2rem 0.4rem black;
  }
  #blueLink {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20%;

    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 2rem;
    text-shadow: 0 0 0.5rem black;

    z-index: 2;
    background: $side-dark-color;
    box-shadow: 0 0 1rem gray;

    transform: translateX(95%);
    transition: all 0.5s;
  }
  #blueLink:hover {
    box-shadow: 0 0 1rem black;
    transform: translateX(0%);
  }

  .FOOTER {
    position: relative;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    padding-bottom: 2rem;

    width: 100%;

    font-family: 'Segoe UI', 'Open Sans', sans-serif;
    font-size: 0.96rem;

    background-color: #16191c;
    z-index: 3;
  }
  .workingHours h5 {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid white;
  }
  .workingHours {
    margin: 0 2rem 0 10rem;
    color: white;
  }
  .contacts h5 {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid white;
  }
  .contacts {
    margin: 0 10rem 0 2rem;
    color: white;
  }
}
@media screen and (max-width: $mobile) {
  .HEADER {
    margin-bottom: 4rem;
  }
  .Cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;

    height: 3rem;
  }
  .burger {
    position: absolute;
    right: 10%;
  }

  .NavigationBAR {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    padding: 0.1rem;

    height: 3rem;

    background: white;
    // border-top: 1px solid #3a3736;
    box-shadow: 0 60px 100px 10px #3a3736;
    z-index: 99;
  }
  .NavigationBAR p {
    font-size: 0.5rem;
  }
  .nuxt-link-exact-active {
    color: white;
    background: #32bebd;
  }
  .nuxt-link-exact-active i {
    color: #32bebd;
    color: white;
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
* {
  transition: ease-out 0.1s;
}
.MAIN {
  width: 100%;
}
.HEADER {
  position: relative;
  width: 100%;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
