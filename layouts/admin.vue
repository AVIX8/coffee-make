<template>
  <v-app>
    <v-app-bar app height="64px">
      <v-app-bar-nav-icon
        v-show="!drawer"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="title">Coffee Make</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
      :expand-on-hover="$device.isDesktop"
    >
      <v-list-item class="px-2 py-1">
        <v-list-item-avatar tile>
          <v-img src="/logo.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title"> Coffee Make </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app> </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'admin',
  data() {
    return {
      drawer: this.$device.isDesktop,
      items: [
        {
          title: 'Панель управления',
          icon: 'mdi-view-dashboard',
          to: '/admin/dashboard',
        },

        { title: 'База данных', icon: 'mdi-database', to: '/admin/database' },
        { title: 'Заказы', icon: 'mdi-clipboard-text', to: '/admin/orders' },

        { title: 'Категории', icon: 'mdi-apps', to: '/admin/categories' },
        {
          title: 'Товары',
          icon: 'mdi-package-variant-closed',
          to: '/admin/products',
        },

        {
          title: 'Пользователи',
          icon: 'mdi-account-supervisor',
          to: '/admin/users',
        },
        { title: 'Сессии', icon: 'mdi-responsive', to: '/admin/sessions' },
        { title: 'Фото', icon: 'mdi-image', to: '/admin/photos' },
      ],
    }
  },
}
</script>
