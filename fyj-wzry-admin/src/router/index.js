import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/items/create', component: ItemEdit },
      { path: '/heros/create', component: HeroEdit },
      { path: '/ads/create', component: AdEdit },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/heros/lists', component: HeroList },
      { path: '/articles/lists', component: ArticleList },
      { path: '/categories/lists', component: CategoryList },
      { path: '/ads/lists', component: AdList },
      { path: '/items/lists', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
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
