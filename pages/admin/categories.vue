<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Иерархия </v-card-title>
          <v-card-text>
            <v-treeview
              :active.sync="active"
              :items="items"
              activatable
              hoverable
              item-key="_id"
              :load-children="fetchCategories"
              color="warning"
              transition
            >
              <!-- <template v-slot:prepend="{ item }">
                <v-img :src="item.image" contain max-height="48px"></v-img>
              </template> -->
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Категория</div>
              <v-list-item-title class="headline mb-1">
                {{ selected.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"
              ><v-img :src="selected.image"></v-img
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-text>
            <v-row v-for="field in fields" :key="field.name">
              <v-col class="py-1">
                <strong> {{ field.text }}: </strong>
                {{ selected[field.prop] }}
              </v-col>
            </v-row>
            <v-card-actions class="flex-wrap">
              <v-spacer></v-spacer>
              <v-btn color="success"
                >Создать {{ active.length ? 'под' : 'новую ' }}категорию</v-btn
              >
              <v-btn color="warning" :disabled="!active.length">Изменить</v-btn>
              <v-btn
                color="error"
                :disabled="!active.length"
                @click="deleteCategory"
                >Удалить</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    active: [],
    open: [],
    root: {
      category: '',
      children: [],
    },
    allCategories: [],
    fields: [
      { text: 'Название', prop: 'name' },
      { text: 'Полный путь', prop: 'category' },
      { text: 'Родитель', prop: 'parent' },
      { text: 'Изображение', prop: 'image' },
    ],
  }),

  computed: {
    items() {
      return this.root.children
    },
    selected() {
      if (!this.active.length) return this.root
      const id = this.active[0]
      return this.allCategories.find((item) => item._id === id)
    },
  },
  created() {
    this.fetchCategories(this.root)
  },
  methods: {
    fetchCategories(item) {
      return this.$axios
        .$post('categories/', { parentPath: item.category })
        .then((res) => {
          if (res.categories.length) {
            this.allCategories.push(...res.categories)
            item.children.push(
              ...res.categories.map((x) => {
                return { ...x, children: [] }
              })
            )
          } else {
            this.$delete(item, 'children')
          }
        })
        .catch((err) => console.warn(err))
    },
    deleteCategory() {
      console.log(this.selected._id)
      this.$axios
        .$post('categories/delete', { id: this.selected._id })
        .then((res) => console.log(res))
        .catch((err) => console.warn(err))
    },
  },
}
</script>

<style scoped></style>
