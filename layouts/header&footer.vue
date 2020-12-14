<template>
  <div class="mainBox">
    <div class="HEADER">
      <div class="Cover">
        <img class="logo" lazy-src="/icon32.png" src="/icon.png" />
        <div class="logoName">Coffee Make</div>
        <v-text-field
          class="searchBox"
          label="Поиск..."
          solo
          dense
          hide-details
        ></v-text-field>
        <nuxt-link class="account" tag="img" src="/account.png" to="/" />
        <nuxt-link class="cart" tag="img" src="/cart.png" to="/" />
      </div>
      <div class="Categories">
        <nuxt-link to="/coffeeProductMain" class="category"> Кофе </nuxt-link>
        <nuxt-link to="/rentCoffeeMachinesMain" class="category">
          Аренда кофемашин
        </nuxt-link>
        <nuxt-link to="/syrupsProductMain" class="category"> Сиропы </nuxt-link>
        <nuxt-link to="/accessoriesProductMain" class="category">
          Аксессуары
        </nuxt-link>
        <nuxt-link to="/servicesMain" class="category"> Услуги </nuxt-link>
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
export default {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Rubik&display=swap');
* {
  transition: ease-out 0.3s;
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
  padding: 0.2% 20% 0.2% 20%;

  width: 100%;

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
.logo {
  margin: 0.2%;
  width: 6%;
  /* background-color: red; */
}
.logoName {
  margin: 0.2%;
  margin-left: 1%;

  color: white;
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 2.7vw;
}
.searchBox {
  margin-left: 27%;

  height: 10%;
  width: 20%;

  background-color: gainsboro;
}
.account {
  padding: 1.3%;
  margin-left: 3%;

  width: 5%;

  font-size: 1vw;
  border-radius: 50%;
}
.account:hover {
  border: 0;
  background-color: #2db6b5;
  transition: all 0.6s;
}
.cart {
  padding: 1.3%;
  margin-left: 1%;

  width: 5%;

  border-radius: 50%;
}
.cart:hover {
  background-color: #2db6b5;
  transition: all 0.6s;
}
.Categories {
  /* height: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;

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
  margin: 0.3%;
  padding: 0.1% 2% 0.1% 2%;

  color: white;
  font-size: 1vw;
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

  padding: 1%;

  font-family: 'Segoe UI', 'Open Sans', sans-serif;
  font-size: 0.8vw;

  background-color: darkslategrey;
}
.workingHours p {
  margin-bottom: 3%;
  font-size: 1.2vw;
  border-bottom: 1px solid white;
}
.workingHours {
  margin: 0 2% 0 10%;
  color: white;
}
.contacts p {
  margin-bottom: 3%;
  font-size: 1.2vw;
  border-bottom: 1px solid white;
}
.contacts {
  margin: 0 10% 0 2%;
  color: white;
}
</style>
