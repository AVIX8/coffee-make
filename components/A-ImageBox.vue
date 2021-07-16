<template>
  <div>
    <input
      ref="file"
      type="file"
      multiple
      hidden
      accept="images/*"
      @change="onChange"
    />
    <div
      :class="{ blueBorder: hover }"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      @mouseleave="hover = false"
    >
      <v-card outlined>
        <v-card-title
          >Изображения<v-spacer />
          <label class="grey--text subtitle-2"> Перенесите или нажмите </label>
          <v-btn color="primary" fab small class="ml-4" @click="upload">
            <v-icon> mdi-upload </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="value.length" class="pb-1">
          <v-row>
            <drop-list
              :items="value"
              class="d-flex flex-wrap"
              @reorder="$event.apply(value)"
            >
              <template v-slot:item="{ item, reorder }">
                <drag :key="item.imageURL" :data="item">
                  <v-col :class="{ 'top-border': reorder }">
                    <v-card outlined>
                      <v-img
                        :src="item.imageURL"
                        contain
                        class="ma-2"
                        aspect-ratio="1"
                        min-width="150"
                      />
                      <v-card-actions class="justify-end">
                        <v-btn
                          :download="item.name || item.id"
                          :href="item.imageURL"
                          color="primary"
                          small
                          min-width="0"
                          >{{ item.size ? `${item.size}&nbsp;` : '' }}
                          <v-icon small> mdi-download </v-icon>
                        </v-btn>
                        <v-btn
                          color="error"
                          small
                          min-width="0"
                          @click="remove(item)"
                        >
                          <v-icon small> mdi-close </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </drag>
              </template>
              <template v-slot:></template>
            </drop-list>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { Drag, DropList } from 'vue-easy-dnd'
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export default {
  components: {
    Drag,
    DropList,
  },
  props: {
    value: { type: Array, required: true },
  },
  data() {
    return {
      files: [],
      hover: false,
      mouseInside: false,
    }
  },
  methods: {
    onChange() {
      this.hover = false
      this.$refs.file.files.forEach((file) => {
        const imageURL = URL.createObjectURL(file)
        this.value.push({
          imageURL,
          size: formatBytes(file.size, 1),
          file,
          name: file.name,
        })
      })
    },
    dragover(event) {
      this.hover = true
      event.preventDefault()
    },
    dragleave(event) {
      this.hover = false
    },
    drop(event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange()
    },
    upload() {
      this.$refs.file.click()
    },
    remove(item) {
      this.value.splice(this.value.indexOf(item), 1)
    },
  },
}
</script>

<style scoped>
.top-border {
  border-top: 3px solid #1976d2;
  margin-top: -3px;
}
.drop-allowed.drop-in * {
  cursor: inherit !important;
}
.blueBorder {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border-style: dashed !important;
  border: 2px solid #1976d2;
  margin: -2px;
}
</style>
