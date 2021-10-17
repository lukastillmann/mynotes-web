<template>
    <router-link class="link" :to="url">
        <ui-card>
            <ui-card-content>
                <ui-card-text>
                    {{ category }}
                </ui-card-text>
            </ui-card-content>
        </ui-card>
    </router-link>
</template>

<script>
export default {
    name: "CategoryCard",
    props: {
        category: {
            type: String,
            required: true,
        },
    },
    computed: {
        url() {
            return `/category/${this.category}`;
        },
    },
};
</script>

<style scoped lang="scss">
.link {
    text-decoration: none;
    color: #000;
    font-weight: bold;
}
</style>
