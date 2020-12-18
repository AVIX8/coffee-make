<template>
  <div class="mainBox">
    <div class="HEADER">
      <div class="Cover">
        <nuxt-link to="/" style="text-decoration: none">
          <div class="toMain" title="На Главную">
            <img class="logo" src="/icon.png" />
            <div class="logoName">Coffee Make</div>
          </div>
        </nuxt-link>
        <v-text-field
          class="searchBox"
          label="Поиск..."
          solo
          dense
          hide-details
        ></v-text-field>
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
          :to="category.linkTo"
          class="category"
        >
          {{ category.title }}
        </nuxt-link>
      </div>
    </div>

    <!-- index --><nuxt />

    <div class="FOOTER">
      <div class="workingHours">
        <p>ВРЕМЯ РАБОТЫ</p>
        ПН - ПТ с 9:00 до 18:00 <br />
        (по местному времени)
      </div>
      <div class="contacts">
        <p>КОНТАКТЫ</p>
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
    }
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'Dancing Script';
  src: url(/fonts/DancingScript-Bold.ttf); /* Путь к файлу со шрифтом */
}
* {
  transition: ease-out 0.1s;
}
.mainBox {
  position: relative;
}
.HEADER {
  position: relative;
  background-color: red;
}
.Cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 25rem 0.2rem 25rem;

  background-image: linear-gradient(
    to right bottom,
    #272523,
    #2d2b29,
    #33312f,
    #3a3736,
    #403d3c,
    #403d3c,
    #403d3c,
    #403d3c,
    #3a3736,
    #33312f,
    #2d2b29,
    #272523
  );
}
.toMain {
  position: relative;
  display: flex;
  align-items: center;
}
.logo {
  margin: 0.2rem;
  width: 5rem;
  /* background-color: red; */
}
.logoName {
  margin: 0.2rem;
  margin-left: 2rem;

  color: white;
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 3rem;
}
.searchBox {
  margin-left: 5rem;

  width: 20rem;

  border-radius: 30px;
  background-color: gainsboro;
}
.account {
  padding: 0.7rem;
  margin-left: 3rem;

  width: 3.5rem;

  border-radius: 50rem;
  transition: ease-out 1s;
}
.account:hover {
  border: 0;
  cursor: pointer;
  background-color: #2db6b5;
  transition: all 0.6s;
}
.cart {
  padding: 0.7rem;
  margin-left: 1rem;

  width: 3.5rem;

  border-radius: 50rem;
  transition: ease-out 1s;
}
.cart:hover {
  cursor: pointer;
  background-color: #2db6b5;
  transition: all 0.6s;
}
.Categories {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.1rem;

  text-align: center;

  background-image: linear-gradient(
    to right,
    #1f9d9c,
    #23a3a2,
    #26a9a8,
    #2ab0af,
    #2db6b5,
    #2db6b5,
    #2db6b5,
    #2db6b5,
    #2ab0af,
    #26a9a8,
    #23a3a2,
    #1f9d9c
  );
}
.category {
  margin: 0.3rem;
  padding: 0.15rem 2rem 0.15rem 2rem;

  color: white;
  font-size: 1.2rem;
  font-family: 'Rubik', sans-serif;
  text-decoration: none;

  border-radius: 50px;

  transition: 0.6s ease-out;
}
.category:hover {
  color: #32bebd;
  background-color: white;
  transition-duration: 0.4s;
}

.FOOTER {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  padding-bottom: 2rem;

  font-family: 'Segoe UI', 'Open Sans', sans-serif;
  font-size: 0.96rem;

  background-color: darkslategrey;
}
.workingHours p {
  margin-bottom: 0.5rem;
  font-size: 1.44rem;
  border-bottom: 1px solid white;
}
.workingHours {
  margin: 0 2rem 0 10rem;
  color: white;
}
.contacts p {
  margin-bottom: 0.5rem;
  font-size: 1.44rem;
  border-bottom: 1px solid white;
}
.contacts {
  margin: 0 10rem 0 2rem;
  color: white;
}
</style>
