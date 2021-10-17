import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
//import Note from "../views/Note.vue";
import AddNote from "../views/AddNote.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/category/:category",
        name: "Category",
        component: Category,
    },
    {
        path: "/category/:category/:note",
        name: "Note",
        component: Category,
    },
    {
        path: "/category/:category/new",
        name: "AddNote",
        component: AddNote,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
