<template>
  <div v-click-outside="hide" class="authenticationBox">
    <div class="title">CoffeeMake</div>
    <div class="choiceAuthentication">
      <button class="loginOn" :class="{ active: log }" @click="log = true">
        Вход
      </button>
      <button class="registerOn" :class="{ active: !log }" @click="log = false">
        Регистрация
      </button>
    </div>

    <div v-if="log" class="loginBox">
      <v-text-field
        v-model="email"
        label="почта или телефон"
        autocomplete="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="пароль"
        type="password"
        name="password"
        autocomplete="current-password"
      ></v-text-field>
    </div>

    <div v-else class="registerBox">
      <v-text-field
        v-model="email"
        label="почта или телефон"
        autocomplete="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="пароль"
        type="password"
        autocomplete="new-password"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="повторите пароль"
        type="password"
        autocomplete="new-password"
      ></v-text-field>
    </div>

    <div class="submitBox">
      <button class="submit" @click="log ? login() : register()">
        {{ log ? 'Вход' : 'Регистрация' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAlive: false,
      log: true,
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('api/login', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          // нужно что-то делать
          this.$router.push('user/profile')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    register() {
      this.$store
        .dispatch('api/register', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          // нужно что-то делать
          this.$router.push('user/profile')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    hide() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'Dancing Script';
  src: url(/fonts/DancingScript-Bold.ttf); /* Путь к файлу со шрифтом */
}
.cookie {
  background-color: #fde;
}

.authenticationBox {
  position: relative;
  /* display: grid;
  grid-template-rows: 2fr 1fr 4fr 1fr; */

  padding: 2rem;

  height: 30rem;
  width: 20rem;

  background: white;

  border-radius: 20px;
  border: 3px solid rgb(15, 151, 122);
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 4rem;

  color: rgb(15, 109, 88);
  font-size: 3.5rem;
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  text-shadow: 0.1rem 0.1rem 0.1rem black;

  /* background: red; */
}

.choiceAuthentication {
  position: absolute;
  top: 8rem;
  left: 0rem;
  right: 0rem;

  padding: 1rem 0;
  padding: 1rem;

  height: 2rem;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  /* background: violet; */
}
.loginOn,
.registerOn {
  margin: 0 1rem 0 1rem;
  padding: 0 0 0.5rem 0;

  width: 50%;

  font-size: 1.2rem;
  /* background: green; */
}
.active {
  border-bottom: 2px solid rgb(15, 109, 88);
}

.loginBox,
.registerBox {
  position: absolute;
  top: 10rem;
  bottom: 5rem;
  left: 2rem;
  right: 2rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* background: yellow; */
}

.submitBox {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  text-align: center;
  font-size: 1.5rem;

  /* background: coral; */
}
.submit {
  margin: 0rem 0rem 2rem 0rem;
  /* padding: 0.5rem 2.5rem 0.5rem 2.5rem; */
  padding: 0.5rem;

  width: 15rem;

  text-align: center;

  border-radius: 20px;
  background: #45bbb0;
  box-shadow: 0 0.2rem 0 black;
}
.submit:hover {
  background: #42c3b6;
}
</style>
