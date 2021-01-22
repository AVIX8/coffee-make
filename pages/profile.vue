<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card max-width="200">
        <v-card-title>Profile</v-card-title>
        <v-card-text>
          {{ userData }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="logout">logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      userData: {},
    }
  },
  mounted() {
    this.$axios
      .$get(this.$axios.defaults.baseURL + '/user/profile')
      .then((data) => {
        this.userData = data
      })
      .catch((err) => {
        console.error(err.response)
      })
  },
  methods: {
    logout() {
      this.$axios
        .$get(this.$axios.defaults.baseURL + '/user/logout')
        .then((data) => {
          console.log(data)
          this.$router.push('login')
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
  },
}
</script>

<style scoped>
.cookie {
  background-color: #fde;
}
</style>
