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
        <v-btn @click="$router.push('register')">Go to registration</v-btn>
        <v-btn @click="$router.push('/admin')">Go to admin panel</v-btn>
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
    this.$store
      .dispatch('api/profile')
      .then((data) => {
        this.userData = data
      })
      .catch((err) => {
        console.error(err.response.data)
      })
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then((data) => {
          console.log(data)
          this.$router.push('login')
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data)
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
