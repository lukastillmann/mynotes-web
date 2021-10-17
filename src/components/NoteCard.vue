<template>
    <li>
        <a href="#" @click="onClick" v-ripple:cssOnly v-shadow="2">
            {{ title }}
        </a>
    </li>
</template>

<script>
export default {
    name: "NoteCard",
    props: {
        note: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    computed: {
        url() {
            return `/category/${this.category}/${this.note}`;
        },
        title() {
            return this.note.title.replace(/\.md$/g, "");
        },
    },
    methods: {
        onClick() {
            this.$router.push({
                name: "Note",
                params: {
                    category: this.category,
                    note: this.note.title,
                },
            });
        },
    },
};
</script>

<style scoped lang="scss">
li {
    list-style-type: none;
    padding: 0;
    margin-bottom: 4px;
}

a, button {
    display: flex;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    padding: 15px 5px;

    width: 100%;
    /*background: #fff;*/
    border: 0 none;

    /*text-align: left;*/
}
</style>
