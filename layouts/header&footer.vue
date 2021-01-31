<template>
  <div ref="main" class="MAIN">
    <div class="HEADER">
      <template v-if="$device.isDesktop">
        <div class="Cover">
          <nuxt-link to="/" style="text-decoration: none">
            <div class="toMain" title="На Главную">
              <img class="logo" src="/logo.png" />
              <h1 class="logoName">Coffee Make</h1>
            </div>
          </nuxt-link>
          <v-text-field
            class="searchBox"
            label="Поиск..."
            solo
            dense
            hide-details
          />
          <nuxt-link
            class="account"
            tag="img"
            src="/account.png"
            to="/"
            title="Мой Аккаунт"
          />
          <nuxt-link
            class="cart"
            tag="img"
            src="/cart.png"
            to="/"
            title="Корзина"
          />
        </div>
        <div class="Categories">
          <nuxt-link
            v-for="category in categories"
            :key="category.title"
            tag="button"
            :to="category.linkTo"
            class="category"
          >
            <h6>{{ category.title }}</h6>
          </nuxt-link>
        </div>
      </template>

      <template v-else>
        <div class="Cover">
          <div class="search"></div>
        </div>

        <div class="NavigationBAR">
          <nuxt-link
            v-for="(navigationBtn, index) in navigationBtns"
            :key="index"
            tag="button"
            :to="navigationBtn.to"
          >
            <v-icon>{{ navigationBtn.icon }}</v-icon>
            <p>{{ navigationBtn.title }}</p>
          </nuxt-link>
        </div>
      </template>
    </div>
    <div
      v-for="(i, index) in [
        'isDesktop',
        'isMobile',
        'isTablet',
        'isMobileOrTablet',
        'isDesktopOrTablet',
        'isIos',
        'isWindows',
        'isMacOS',
        'isAndroid',
      ]"
      :key="index"
    >
      <p v-if="$device[i]">{{ i }}</p>
    </div>
    <!-- index -->
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
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Dancing Script';
  src: url(/fonts/DancingScript-Bold.ttf); /* Путь к файлу со шрифтом */
}
@media screen and (max-width: $laptop) {
  .Cover {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    // padding: 0.2rem 25rem 0.2rem 25rem;

    background: linear-gradient(
        90.54deg,
        rgba(43, 42, 40, 0.3) 0%,
        rgba(255, 255, 255, 0.15) 33.73%,
        rgba(255, 255, 255, 0.05) 66.56%,
        rgba(255, 255, 255, 0) 100%
      ),
      #00241b;
  }
  .toMain {
    display: flex;
    align-items: center;
  }
  .logo {
    margin: 0.2rem;
    width: 4.5rem;
  }
  .logoName {
    margin: 0.2rem;
    margin-left: 2rem;

    color: white;
    font-family: 'Dancing Script', cursive;
    font-weight: bold;
    text-shadow: 0.2rem 0.2rem 0.2rem black;
  }
  .logoName:hover {
    text-shadow: 0.5rem 0.5rem 0.5rem black;
  }
  .searchBox {
    margin-left: 5rem;

    border-radius: 30px;
    background-color: gainsboro;
  }
  .account {
    padding: 0.6rem;
    margin-left: 3rem;

    width: 3rem;

    border-radius: 50rem;
    transition: ease-out 0.5s;
  }
  .account:hover {
    cursor: pointer;
    background-color: #2db6b5;
    transition: all 0.4s;
    box-shadow: 0.2rem 0.2rem 0.4rem black, 0px 0px 50px black;
  }
  .cart {
    padding: 0.6rem;
    margin-left: 1rem;

    width: 3rem;

    border-radius: 50rem;
    transition: ease-out 0.5s;
  }
  .cart:hover {
    cursor: pointer;
    background-color: #2db6b5;
    transition: all 0.4s;
    box-shadow: 0.2rem 0.2rem 0.4rem black, 0px 0px 50px black;
  }
  .Categories {
    position: relative;
    display: flex;
    // align-items: center;
    justify-content: center;

    padding: 0.1rem;

    text-align: center;
    background: linear-gradient(
        90deg,
        #35948a 0%,
        #45bbb0 49.48%,
        #35948a 100%,
        #35948a 100%
      ),
      #65b891;
  }
  .category {
    margin: 0.3rem;
    padding: 0.2rem 2rem 0.2rem 2rem;

    color: white;
    font-family: 'Rubik', sans-serif;
    text-decoration: none;

    border-radius: 50px;

    transition: 0.4s ease-out;
  }
  .category:hover {
    // color: #32bebd;
    // background-color: white;
    background-image: linear-gradient(
      to right bottom,
      #35edeb,
      #34e1df,
      #34d5d4,
      #33cac8,
      #32bebd
    );
    box-shadow: 0.2rem 0.2rem 0.9rem rgba(0, 0, 0, 0.2),
      0px 0px 50px rgba(0, 0, 0, 0.2);
    transition: all 0.35s;
  }
  .category:active {
    margin: 0.3rem 0.8rem 0.3rem 0.8rem;
    padding: 0.15rem 1.5rem 0.15rem 1.5rem;

    background-color: #3a3736;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2),
      0px 0px 50px rgba(0, 0, 0, 0.2);

    transition: all 0.1s;
  }

  .FOOTER {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    padding-bottom: 2rem;

    width: 100%;

    font-family: 'Segoe UI', 'Open Sans', sans-serif;
    font-size: 0.96rem;

    background-color: #16191c;
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
    margin-bottom: 5rem;
  }
  .Cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;

    height: 4rem;
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

    height: 3.5rem;

    font-family: Roboto;

    background: white;
    // border-top: 1px solid #3a3736;
    box-shadow: 0 60px 100px 10px #3a3736;
    z-index: 99;
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
