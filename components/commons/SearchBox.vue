<template>
  <div class="searchBox">
    <div ref="search" class="search">
      <input
        ref="input"
        v-model="text"
        class="input"
        placeholder="Поиск по каталогу"
      />
      <button class="clear" title="Очистить" @click="clear">
        <v-icon class="clear">mdi-close</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      results: null,
      timeoutId: null,
    }
  },
  watch: {
    text(val) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.$emit('input', val)
      }, 400)
    },
  },
  mounted() {},
  methods: {
    clear() {
      this.text = ''
    },
  },
}
</script>

<style scoped lang="scss">
.searchBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  height: 2rem;
  width: 100%;

  // background: blue;
}
.search {
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0 1% 0 5%;

  height: 100%;
  width: 100%;

  background: whitesmoke;
  border-radius: 20px;
  border: solid 1px lightgray;
  box-shadow: inset 0 0 0.1rem gray;

  z-index: 0;

  transition: all 0.2s;

  // background: blue;
  // overflow: hidden;
}
.search:hover {
  background: white;
  // box-shadow: inset 0 0 0.5rem gray;
}
.input {
  // padding: 0 0 0 5%;

  height: 100%;
  width: 100%;

  font-size: 1.15rem;

  border-radius: 20px 0 0 20px;

  // background: lightgray;
  // background: red;
}
.clear {
  padding: 0 1% 0 1%;
  height: 100%;
  border-radius: 20px;
  // background: white;
  // box-shadow: -1.5rem 0 1rem 0rem white;
  cursor: pointer;
  // background: yellow;
}
.searchGo {
  padding: 0 1.5% 0 1%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  // background: white;
  cursor: pointer;
  // background: greenyellow;
}
.searchGo:hover {
  color: rgb(28, 156, 139);
  text-shadow: 0 0 0.1rem rgb(28, 156, 139);
  // background: rgb(28, 156, 139);
}
.clear:hover {
  color: rgb(199, 72, 72);
  text-shadow: 0 0 0.1rem rgb(199, 72, 72);
}
.searchGo:active,
.clear:active {
  text-shadow: 0 0 0.7rem rgb(28, 156, 139);
}

//===============================================

.resultsDown-enter-active,
.resultsDown-leave-active {
  transition: all 0.2s;
}
.resultsDown-enter {
  // margin-top: -30%;
  transform: translateY(-40%) scaleY(0.1);
  opacity: 0;
}
.results {
  position: absolute;
  top: 0;
  left: 0;

  // height: 22rem;
  width: 100%;

  background: white;
  // background: orange;

  border-radius: 20px;
  // border: solid 2px #00a199;

  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.5);

  z-index: 1;
  // overflow: scroll;
  overflow: auto !important;
  -ms-overflow-style: none !important; /* IE 11 */
  scrollbar-width: none !important; /* Firefox 64 */
  transition: all 0.5s;
}
.result {
  position: relative;
  // display: grid;
  // grid-template-columns: 1fr 9fr;
  display: flex;

  padding: 0.5rem;

  height: 6rem;

  border-radius: 0;
  border-bottom: solid 1px lightgray;

  cursor: pointer;
}
.result:hover {
  background: #8ddfdb;
}
.result:active {
  background: white;
  box-shadow: inset 0 0 5rem 1rem #8ddfdb;
}
.result:last-child {
  border-radius: 0 0 20px 20px;
  border-bottom: none;
}
.preview {
  padding: 0.2rem;

  height: 5rem;
  width: 5rem;

  background: white;
  border-radius: 20px;
  // border: solid 2px #00a199;
}
.info {
  padding: 0 0 0 1rem;
}
.info h6 {
  margin: 0 0 1rem 0;
}

@media screen and (max-width: $mobile) {
  .input {
    font-size: 0.9rem;
  }
  .result:hover {
    background: none;
  }
  .info {
    padding: 0 0 0 1rem;
  }
  .info h6 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
  }
  .info p {
    font-size: 0.8rem;
  }
}
</style>
