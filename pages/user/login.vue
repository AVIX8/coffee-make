<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card max-width="200">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="email"
            autocomplete="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            name="password"
            autocomplete="current-password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="login">Login</v-btn>
          <v-btn @click="$router.push('register')">Go to registration</v-btn>
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
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$axios
        .$post('user/login', {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          console.log(data)
          this.$router.push('profile')
          console.log(this.$router)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
  },
}
</script>

<style scoped></style>
