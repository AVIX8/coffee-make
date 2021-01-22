<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card max-width="200">
        <v-card-title>Register</v-card-title>
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
            autocomplete="new-password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="register">Register</v-btn>
          <v-btn @click="$router.push('login')">Go to login</v-btn>
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
    register() {
      this.$axios
        .$post('user/register', {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          console.log(data)
          this.$router.push('profile')
        })
        .catch((err) => {
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
