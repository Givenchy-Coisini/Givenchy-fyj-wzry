import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/items/create', component: ItemEdit },
      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/lists', component: HeroList },
      { path: '/categories/lists', component: CategoryList },
      { path: '/items/lists', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
