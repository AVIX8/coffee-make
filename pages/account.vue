<template>
  <div class="accountBox">
    <h1>Личный кабинет</h1>
    <div class="contentBox">
      <div class="dataBox">
        <div class="title">
          <button class="editBtn" @click="edit">
            {{ isEdit ? 'Сохранить' : 'Изменить' }}&nbsp;
            <v-icon color="#FFFFFF">{{
              isEdit ? 'mdi-content-save' : 'mdi-account-edit'
            }}</v-icon>
          </button>
          <h3>Данные:</h3>
        </div>

        <div class="data">
          <div v-for="(value, key) in tUser.profile" :key="key" ref="profile">
            <div v-if="isEdit" class="label textBox">
              <input
                v-model="tUser.profile[key]"
                class="input"
                :placeholder="key"
              />
              <button
                title="Очистить"
                class="clear"
                @click="tUser.profile[key] = null"
              >
                <v-icon>mdi-close</v-icon>
              </button>
            </div>
            <div v-else class="label">{{ value }}</div>
          </div>
        </div>
      </div>

      <div class="ordersBox">
        <div class="title">
          <button class="editBtn">
            <v-icon color="#FFFFFF">mdi-calendar-search</v-icon>
          </button>
          <h3>Заказы</h3>
        </div>

        <div class="data">
          <div v-for="(value, name) in tUser.profile" :key="name">
            <button class="order"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'header&footer',
  data() {
    return {
      isEdit: true,
      user: this.$store.state.user,
      tUser: {
        profile: {
          ФИО: 'Богдан Рассказов',
          адрес: 'Глазурный пр - 12, кв.4',
          телефон: 88005553535,
          email: 'bogdanchik@mail.ru',
        },
      },
    }
  },
  computed: {},
  methods: {
    edit() {
      if (this.isEdit) {
        let i = 0
        let flag = true
        for (const key in this.tUser.profile) {
          if (!this.tUser.profile[key]) {
            flag = false
            this.wrong(i)
          }
          i++
        }
        if (flag) this.isEdit = false
      } else this.isEdit = true
    },
    wrong(index) {
      const element = this.$refs.profile[index]
      element.style.background = 'rgb(253, 150, 150)'
      element.style.borderColor = 'rgb(172, 38, 38)'

      setTimeout(() => {
        element.style.transform = 'translate(10px, 0px)'
      }, 100)
      setTimeout(() => {
        element.style.transform = 'translate(-10px, 0px)'
      }, 100 + 50)

      setTimeout(() => {
        element.style.transform = 'translate(0px, 0px)'
      }, 200)

      element.style.transition = 'all 0.1s'
      setTimeout(() => {
        element.style.background = 'whitesmoke'
        element.style.borderColor = 'gray'
        element.style.transition = 'all 1s'
      }, 300)
      element.focus()
    },
  },
}
</script>

<style scoped lang="scss">
* {
  outline: none;
}
.accountBox {
  margin: 0 22vw 0 22vw;
  padding: 2rem 0 1rem 0;

  background: blue;
}
.contentBox {
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin: 1rem 0;

  background: yellowgreen;
}
.dataBox {
  position: relative;
  margin: 0 1rem 0 0;
  padding: 1rem;

  border-radius: 20px;
  border: 3px solid rgb(15, 151, 122);

  background: white;
}
.title {
  display: flex;
  align-items: center;

  margin: 0 0 1rem 0;

  height: 2.5rem;

  // background: green;
}
.editBtn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 1rem 0.5rem 1rem;

  width: 11rem;

  color: white;

  border-radius: 20px;

  background: rgb(15, 151, 122);
}
.label {
  margin: 0 0 1rem 1.5rem;
  padding: 0.5rem 0 0.5rem 0;

  width: 90%;
  height: 2.2rem;

  font-size: 1.2rem;

  border: 1px solid transparent;
  border-bottom: 1px solid gray;
  transition: all 1s;
}
.textBox {
  position: relative;
  margin: 0 0 1rem 0;
  padding: 0.5rem 0 0.5rem 1.5rem;

  width: 100%;

  border-radius: 20px;
  border: 1px solid gray;

  background: whitesmoke;

  transition: all 1s;
}
.label {
}
.clear {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
}

.ordersBox {
  position: relative;

  margin: 0 0 0 1rem;
  padding: 1rem;

  border-radius: 20px;
  border: 3px solid rgb(15, 151, 122);

  background: white;
}
.order {
  background: red;
}
@media screen and (max-width: $mobile) {
}
</style>
