<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Категория</div>
          <v-list-item-title class="headline mb-1">
            {{ name }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar tile size="80"
          ><v-img :src="imageURL"></v-img
        ></v-list-item-avatar>
      </v-list-item>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Название"
          required
          outlined
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          :value="parent.category + '/' + name"
          label="Полный путь"
          disabled
        ></v-text-field>
        <v-text-field
          v-if="parent.category"
          :value="parent.category"
          label="Родитель"
          disabled
        ></v-text-field>
        <v-file-input
          v-model="image"
          outlined
          label="Изображение"
          truncate-length="15"
          show-size
        ></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close"> Закрыть </v-btn>
        <v-btn color="blue" text @click="save"> Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
    parent: { type: Object, required: true },
  },
  data: () => ({
    dialog: false,
    name: '',
    image: null,
    imageURL: '',
  }),
  watch: {
    value(newVal, oldVal) {
      this.dialog = newVal
      if (newVal === true) {
        this.name = ''
        this.image = null
        this.imageURL = ''
      }
    },
    image() {
      if (this.image) {
        this.imageURL = URL.createObjectURL(this.image)
      }
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    save() {
      this.$emit(
        'create',
        {
          name: this.name,
          image: this.image,
          parentId: this.parent._id,
        },
        this.parent
      )
      this.close()
    },
  },
}
</script>
