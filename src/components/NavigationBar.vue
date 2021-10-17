<template>
    <ui-top-app-bar
        nav-id="drawer-navigation"
        contentSelector=".content"
        :title="title"
    ></ui-top-app-bar>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "NavigationBar",
    computed: {
        ...mapState(["category"]),
        title() {
            return this.category || "MyNotex";
        },
    },
};
</script>

<style scoped></style>
