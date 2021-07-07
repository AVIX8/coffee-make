<template>
  <div>
    <CategoryForm
      ref="CategoryForm"
      v-model="createCategory"
      :parent="selected"
      @create="create"
    />

    <v-row justify="center">
      <v-col md="4">
        <v-card>
          <v-card-title>
            Иерархия
            <v-spacer />
            <!-- <v-btn color="blue" text @click="fetchAll()">Загрузить все</v-btn> -->
          </v-card-title>
          <v-card-text>
            <v-treeview
              :active.sync="active"
              :items="items"
              :open.sync="open"
              return-object
              activatable
              hoverable
              item-key="_id"
              :load-children="fetchCategories"
              color="warning"
              transition
            >
              <template v-slot:prepend="{ item }">
                <v-img
                  v-if="item.image"
                  :src="
                    $axios.defaults.baseURL + '/storage/image/' + item.image
                  "
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
                :src="
                  $axios.defaults.baseURL + '/storage/image/' + selected.image
                "
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
              <a :href="imageURL" target="_blank">{{ selected.image }}</a>
            </p>

            <v-card-actions class="flex-wrap justify-center">
              <v-btn class="ma-1" color="success" @click="createCategory = true"
                >Создать {{ active.length ? 'под' : 'новую ' }}категорию</v-btn
              >
              <v-btn class="ma-1" color="warning" :disabled="selected === root"
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
    createCategory: false,
    active: [],
    open: [],
    root: {
      path: '',
      children: [],
    },
  }),

  computed: {
    items() {
      return this.root.children
    },
    selected() {
      if (!this.active.length) return this.root
      return this.active[0]
    },
    imageURL() {
      return (
        this.$axios.defaults.baseURL + '/storage/image/' + this.selected.image
      )
    },
  },
  created() {
    // this.fetchCategories(this.root)
    this.fetchAll()
  },
  methods: {
    getCategoryById(_id, element = this.root) {
      if (element._id === _id) {
        return element
      } else if (element.children != null) {
        let result = null
        for (let i = 0; result == null && i < element.children.length; i++) {
          result = this.getCategoryById(_id, element.children[i])
        }
        return result
      }
      return null
    },
    addNewItem(parent, category) {
      if (this.getCategoryById(category._id) === null) {
        const newItem = {
          ...category,
          name: category.title,
          children: [],
          parentId: parent._id,
        }
        if (!parent?.children?.length) {
          this.$set(parent, 'children', [])
        }
        parent.children.push(newItem)
      }
    },
    removeItem(category) {
      const parent = this.getCategoryById(category.parentId)
      parent.children = parent.children.filter(
        (item) => item._id !== category._id
      )
      if (!parent?.children?.length) {
        this.$delete(parent, 'children')
      }
    },
    async fetchAll(item = this.root) {
      await this.fetchCategories(item)
      if (item?.children?.length) {
        await Promise.all(item.children.map((child) => this.fetchAll(child)))
      }
    },
    fetchCategories(item) {
      return this.$axios
        .$post('categories/', { parentPath: item.path })
        .then((categories) => {
          if (categories.length) {
            categories.forEach((category) => this.addNewItem(item, category))
          } else {
            this.$delete(item, 'children')
          }
        })
        .catch((err) => console.warn(err))
    },
    create(data, parent) {
      console.log('create:', data)
      const fd = new FormData()
      fd.append('title', data.title)
      fd.append('image', data.image)
      fd.append('parentId', data.parentId)
      this.$axios
        .post('categories/create', fd)
        .then((res) => {
          this.fetchCategories(parent)

          this.addNewItem(parent, res.data)
          const category = this.getCategoryById(res.data._id)

          this.fetchCategories(category)
          this.open.push(parent)
          this.$set(this.active, 0, category)
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data.message)
        })
    },
    del() {
      const toDelete = this.selected
      console.log('del:', toDelete)
      this.$axios
        .$post('categories/delete', { id: toDelete._id })
        .then((res) => {
          this.removeItem(toDelete)
          this.$set(this.active, 0, this.getCategoryById(toDelete.parentId))
        })
        .catch((err) => console.log(err.response.data.message))
    },
  },
}
</script>

<style scoped></style>
