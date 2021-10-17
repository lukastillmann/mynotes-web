<template>
    <div class="home">
        <ui-grid>
            <h2>Kategorien</h2>
        </ui-grid>
        <ui-grid>
            <ui-grid-cell v-for="cat in categories" :key="cat">
                <CategoryCard :category="cat" />
            </ui-grid-cell>
        </ui-grid>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import CategoryCard from "@/components/CategoryCard";

export default {
    name: "Home",
    components: {
        CategoryCard,
    },
    data() {
        return {
            error: "",
        };
    },
    computed: {
        ...mapState(["categories"]),
    },
    methods: {
        getLink(cat) {
            return `/category/${cat}`;
        },
    },
    mounted() {
        this.$store.dispatch("categories/load");
    }
};
</script>
