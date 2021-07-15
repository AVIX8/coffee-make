<template>
  <div>
    <v-row justify="center">
      <v-col md="4">
        <v-card>
          <v-card-title>
            Иерархия
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-treeview
              :active.sync="active"
              :items="root.children"
              :open.sync="open"
              return-object
              activatable
              hoverable
              item-key="_id"
              :load-children="getCategories"
              color="warning"
              transition
            >
              <template v-slot:prepend="{ item }">
                <v-img
                  v-if="item.image"
                  :src="imageIdToURL(item.image)"
                  contain
                  max-height="48px"
                  max-width="48px"
                ></v-img>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Категория</div>
              <v-list-item-title class="headline mb-1">
                {{ selected.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-img
                v-if="selected.image"
                ref="image"
                :src="imageIdToURL(selected.image)"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-text>
            <p v-if="selected.title">
              <strong> Название: </strong>{{ selected.title }}
            </p>
            <p v-if="selected.path">
              <strong> Полный путь: </strong>{{ selected.path }}
            </p>
            <p v-if="selected.parent">
              <strong> Родитель: </strong>{{ selected.parent }}
            </p>
            <p v-if="selected.image">
              <strong> Изображение: </strong>
              <a :href="imageIdToURL(selected.image)" target="_blank">{{
                selected.image
              }}</a>
              &nbsp;
              <v-btn
                :download="selected.image"
                :href="imageIdToURL(selected.image)"
                color="primary"
                small
                min-width="0"
              >
                <v-icon small> mdi-download </v-icon>
              </v-btn>
            </p>

            <v-card-actions class="flex-wrap justify-center">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">Категория</div>
                      <v-list-item-title class="headline mb-1">
                        {{ tmpItem.title }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80"
                      ><v-img :src="tmpImageURL"></v-img
                    ></v-list-item-avatar>
                  </v-list-item>
                  <v-card-text>
                    <v-text-field
                      v-model="tmpItem.title"
                      label="Название"
                      required
                      outlined
                      autocomplete="off"
                    ></v-text-field>
                    <v-text-field
                      :value="tmpParent.path + '/' + tmpItem.title"
                      label="Полный путь"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      v-if="tmpParent.path"
                      :value="tmpParent.path"
                      label="Родитель"
                      disabled
                    ></v-text-field>
                    <v-file-input
                      v-model="tmpImage"
                      outlined
                      label="Изображение"
                      truncate-length="15"
                      show-size
                    ></v-file-input>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" text :disabled="loading" @click="close">
                      Закрыть
                    </v-btn>
                    <v-btn
                      color="blue"
                      text
                      :loading="loading"
                      :disabled="loading"
                      @click="save"
                    >
                      {{ isNew ? 'Создать' : 'Изменить' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn class="ma-1" color="success" @click="create"
                >Создать {{ active.length ? 'под' : 'новую ' }}категорию</v-btn
              >
              <v-btn
                class="ma-1"
                color="warning"
                :disabled="selected === root"
                @click="edit"
                >Изменить</v-btn
              >
              <v-btn
                class="ma-1"
                color="error"
                :disabled="selected.children && selected.children.length > 0"
                @click="del"
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
      path: '',
      children: [],
    },
    categoryById: {},
    isNew: true,
    dialog: false,
    defaultItem: {
      path: '',
      title: '',
      parent: '',
    },
    tmpItem: {},
    tmpParent: {},
    tmpImage: null,
    tmpImageURL: '',

    loading: null,
  }),

  computed: {
    selected() {
      if (!this.active.length) return this.root
      return this.active[0]
    },
  },
  watch: {
    tmpImage() {
      if (this.tmpImage) this.tmpImageURL = URL.createObjectURL(this.tmpImage)
      else this.tmpImageURL = ''
    },
  },
  created() {
    this.categoryById[undefined] = this.root
    this.tmpItem = Object.assign({}, this.defaultItem)
    this.fetchAll()
  },
  methods: {
    imageIdToURL(id) {
      return `${this.$axios.defaults.baseURL}/storage/image/${id}`
    },
    addNewItem(parent, category) {
      if (this.categoryById[category._id] === undefined) {
        const newItem = {
          ...category,
          name: category.title,
          children: [],
          parentId: parent._id,
        }
        if (!parent?.children?.length) this.$set(parent, 'children', [])
        this.categoryById[category._id] = newItem
        parent.children.push(newItem)
      }
    },
    removeItem(category) {
      const parent = this.categoryById[category.parentId]
      parent.children = parent.children.filter(
        (item) => item._id !== category._id
      )
      if (!parent?.children?.length) this.$delete(parent, 'children')
      delete this.categoryById[category._id]
    },
    async removeAll(item) {
      if (item?.children?.length)
        await Promise.all(item.children.map((child) => this.removeAll(child)))
      this.removeItem(item)
    },
    async fetchAll(item = this.root) {
      await this.getCategories(item)
      if (item?.children?.length)
        await Promise.all(item.children.map((child) => this.fetchAll(child)))
    },
    getCategories(item) {
      return this.$store
        .dispatch('api/getCategories', item.path)
        .then((categories) => {
          if (categories.length) {
            categories.forEach((category) => this.addNewItem(item, category))
          } else {
            this.$delete(item, 'children')
          }
        })
        .catch((err) => console.warn(err))
    },
    create() {
      this.isNew = true
      this.tmpParent = this.selected
      this.tmpItem.parentId = this.tmpParent._id
      this.dialog = true
    },
    edit() {
      this.isNew = false
      this.tmpImageURL = this.imageIdToURL(this.selected.image)
      this.tmpItem = Object.assign({}, this.selected)
      this.tmpParent = this.categoryById[this.tmpItem.parentId]
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.loading = false

      this.tmpImage = null
      this.tmpItem = Object.assign({}, this.defaultItem)
      this.tmpParent = {}
    },
    async save() {
      this.loading = true

      this.tmpItem.image = this.tmpImage
      if (this.isNew) {
        console.log('create:', this.tmpItem)
        await this.$store
          .dispatch('api/createCategory', this.tmpItem)
          .then((newCategory) => {
            this.getCategories(this.tmpParent)

            this.addNewItem(this.tmpParent, newCategory)
            const category = this.categoryById[newCategory._id]

            this.getCategories(category)
            this.open.push(this.tmpParent)
            this.$set(this.active, 0, category)
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response.data.message)
          })
      } else {
        const opens = this.open
        this.open = []

        console.log('edit:', this.tmpItem)
        await this.$store
          .dispatch('api/updateCategory', this.tmpItem)
          .then(async (newCategory) => {
            await this.removeAll(this.tmpItem)
            await this.fetchAll(this.tmpParent)

            opens.forEach((o) => {
              this.open.push(this.categoryById[o._id])
            })
            const category = this.categoryById[this.tmpItem._id]
            this.$set(this.active, 0, category)
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response.data.message)
          })
      }
      this.close()
    },
    del() {
      const toDelete = this.selected
      console.log('del:', toDelete)
      this.$store
        .dispatch('api/deleteCategory', toDelete._id)
        .then((res) => {
          this.removeItem(toDelete)
          this.$set(this.active, 0, this.categoryById[toDelete.parentId])
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data.message)
        })
    },
  },
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
