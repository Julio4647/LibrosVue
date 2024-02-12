import Vue from 'vue'
import VueRouter from 'vue-router'
import Breadcrumb from 'vue-2-breadcrumbs';
import Formulario from '@/components/Formulario.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Formulario },
]

const router = new VueRouter({
  routes
})


export default router
