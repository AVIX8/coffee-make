<template>
  <div
    class="contactBox"
    :style="[
      backgroundImg !== null
        ? {
            backgroundImage: 'url(' + backgroundImg + ')',
          }
        : '',
    ]"
  >
    <div
      class="title"
      :style="{ color: titleColor, 'text-shadow': '0 0 0.15rem ' + titleColor }"
    >
      {{ title }}
    </div>
    <div v-if="text" class="text" :style="{ color: textColor }">
      {{ text }}
    </div>
    <div class="inputBox">
      <input
        ref="phone"
        :value="phone"
        placeholder="Телефон"
        type="text"
        @input="phoneInput"
      />
    </div>
    <div class="inputBox">
      <input ref="name" v-model="name" placeholder="Ваше имя" type="text" />
    </div>
    <div class="inputBox">
      <textarea
        v-if="message"
        label="One row"
        auto-grow
        outlined
        rows="1"
        row-height="15"
      ></textarea>
    </div>
    <button @click="pushContact">Отправить</button>
    <div>Мы с Вами свяжемся</div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false, default: 'Сообщите о себе' },
    titleColor: { type: String, required: false, default: 'white' },
    text: { type: String, required: false, default: null },
    textColor: { type: String, required: false, default: 'white' },
    backgroundImg: { type: String, required: false, default: null },
    message: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      phone: '',
      name: '',
      phoneMask: /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/gm,
      phoneRegExp: /^\d \([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}$/m,
    }
  },
  computed: {},
  watch: {},
  methods: {
    pushContact() {
      console.log(this.phone)
      console.log(this.phoneRegExp)
      if (!this.phoneRegExp.test(this.phone)) this.wrong(this.$refs.phone)
      if (this.name.length === 0) this.wrong(this.$refs.name)
    },
    phoneInput(event) {
      const str = event.target.value
      // console.log('input: ' + str)
      this.phone = str
        .replace(/[\D]+/gm, '')
        .substring(0, 11)
        .replace(this.phoneMask, '$1 ($2) $3-$4-$5')
      // console.log('phone: ' + this.phone)
      event.target.value = this.phone
    },
    wrong(e) {
      e.style.background = 'rgb(253, 150, 150)'
      e.style.borderColor = 'rgb(172, 38, 38)'

      setTimeout(() => {
        e.style.transform = 'translate(2px, 0px) rotate(3deg)'
      }, 100)
      setTimeout(() => {
        e.style.transform = 'translate(-2px, 0px) rotate(-3deg)'
      }, 100 + 50)

      setTimeout(() => {
        e.style.transform = 'translate(0px, 0px) rotate(0deg)'
      }, 200)

      e.style.transition = 'all 0.1s'
      setTimeout(() => {
        e.style.background = 'rgba(255, 255, 255, 0.8)'
        e.style.borderColor = '#ff3300'
        e.style.transition = 'all 1s'
      }, 300)
    },
  },
}
</script>

<style scoped lang="scss">
.contactBox {
  display: grid;
  // grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  justify-items: center;
  text-align: center;
  padding: 1rem 5rem;
  min-height: 100px;
  min-width: 560px;
  color: white;
  border-radius: 20px;
  background: $side-color;
  // background-image: url(static\red_barista.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.title {
  margin: 1rem;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 3rem black;
}
.text {
  margin: 1rem 0;
  width: 65%;
  font-size: 1.2rem;
  text-align: center;
  text-shadow: 0 0 0.5rem black;
}
.inputBox {
  width: 100%;
}
.contactBox input,
button {
  width: 80%;
  margin: 0.5rem 0;
  padding: 10px 30px;
  outline: none;
  border-radius: 20px;
  // border: 2px solid gray;
}
.contactBox input {
  color: black;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.8);
}
.contactBox button {
  box-sizing: border-box;
  font-size: 1.6rem;
  background: $side-dark-color;

  border: 2px solid white;
  transition: all 0.2s;
}
.contactBox button:hover {
  // color: $side-dark-color;
  // border-color: $main-color;
  background: $main-light-color;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
@media screen and (max-width: $mobile) {
  .contactBox {
    padding: 1rem;
    min-width: unset;
    width: 100%;
    background-position-x: 50%;
  }
  .title {
    font-size: 24px;
  }
  .text {
    font-size: 16px;
  }
  .contactBox button {
    box-sizing: border-box;
    font-size: 1.2rem;
    background: $side-dark-color;

    border: 2px solid white;
    transition: all 0.2s;
  }
}
</style>
