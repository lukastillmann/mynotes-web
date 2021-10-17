<template>
    <div class="note">
        <h2>{{ title.replace(/\.md$/, "") }}</h2>
        <div id="editor" ref="editor"></div>
        <ui-button type="2" @click="save">Save</ui-button>
    </div>
</template>

<script>
import {mapState} from "vuex";
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";

export default {
    name: "Note",
    data() {
        return {};
    },
    watch: {
        title() {
            this.getNote();
        },
    },
    computed: {
        ...mapState(["note"]),
        title() {
            return this.$route.params.note;
        },
        category() {
            return this.$route.params.category;
        },
    },
    methods: {
        initEditor() {
            this.editor = new Editor({
                el: this.$refs.editor,
                height: "500px",
                initialValue: "Test",
                initialEditType: "markdown",
            });

            this.editor.getMarkdown();
        },
        initEventListeners() {
            this.editor.on("change", this.onChange);
        },
        onChange(e) {
            console.log(this.editor.getMarkdown(), e);
        },
        updateEditor(value) {
            if (value || this.note?.note) {
                this.editor.setMarkdown(value || this.note.note);
            }
        },
        getNote() {
            this.$store
                .dispatch("note/load", {title: this.title, category: this.category})
                .then(() => {
                    this.$store.commit("messages/add", {text: "Notiz geladen"});
                    this.updateEditor();
                });
            /*
            api.get(this.url)
                .then((response) => {
                    this.note = response.note;
                    this.metadata = response.metadata;
                    this.updateEditor(response.note);
                })
                .catch((error) => {
                    console.error(error);
                });
                */
        },
        save() {
            const note = {
                title: this.title,
                category: this.category,
                markdown: this.editor.getMarkdown()
            }
            this.$store.dispatch("note/save", note);
        },
    },
    mounted() {
        this.getNote();
        this.initEditor();
        this.initEventListeners();
    },
};
</script>

<style scoped lang="scss">
.note {
    width: 100%;
}
</style>
