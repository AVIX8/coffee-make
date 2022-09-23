<template>
  <v-dialog
    width="400"
    :value="value"
    :persistent="waiting"
    @input="$emit('input', !value)"
  >
    <v-card>
      <v-card-title>Подтверждение удаления</v-card-title>
      <v-card-text class="pb-0">
        Введите {{ text }}
        <v-text-field
          v-model="tmpText"
          :name="Date.now()"
          :error-messages="!tmpText || equal ? '' : 'Значения не совпадают'"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text :loading="waiting" @click="close"
          >Отмена</v-btn
        >
        <v-btn
          color="error"
          text
          :disabled="!equal"
          :loading="waiting"
          @click="confirm"
          >Удалить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
  },
  data: () => ({
    text: '',
    tmpText: '',
    waiting: false,
  }),
  computed: {
    equal() {
      return this.text === this.tmpText
    },
  },
  methods: {
    open(text) {
      this.text = text
      this.tmpText = ''
      this.waiting = false
      this.$emit('input', true)
    },
    close() {
      this.$emit('input', false)
    },
    confirm() {
      this.waiting = true
      this.$emit('confirm')
    },
  },
}
</script>
