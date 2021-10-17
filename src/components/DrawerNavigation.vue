<template>
    <ui-drawer :model-value="open" @nav="onChange" type="modal" nav-id="drawer-navigation">
        <ui-drawer-header>
            <ui-drawer-title>Kategorien</ui-drawer-title>
            <ui-drawer-subtitle></ui-drawer-subtitle>
        </ui-drawer-header>
        <ui-drawer-content>
            <ui-nav>
                <ui-nav-item href="#" @click="home">Home</ui-nav-item>
                <ui-divider type="0" />
                <ui-nav-item href="#" @click="onClick(cat)" v-for="cat in categories" :key="cat">
                    {{ cat }}
                </ui-nav-item>
            </ui-nav>
        </ui-drawer-content>
    </ui-drawer>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "DrawerNavigation",
    data() {
        return {
            open: false,
            error: "",
        };
    },
    computed: {
        ...mapState(["categories"]),
    },
    methods: {
        home() {
            this.open = false;
            this.$router.push({
                name: "Home",
            });
        },
        onChange(open) {
            this.open = open;
        },
        onClick(cat) {
            this.open = false;
            this.$router.push({
                name: "Category",
                params: {
                    category: cat,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
