<template>
    <div class="note">
        <h2>{{ title }}</h2>
        <div id="editor" ref="editor"></div>
        <ui-button type="2" @click="save">Save</ui-button>
    </div>
</template>

<script>
import api from "@/store/api";
import { mapState } from "vuex";
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";

export default {
    name: "Note",
    data() {
        return {
            note: null,
            metadata: null,
        };
    },
    computed: {
        ...mapState(["note"]),
        title() {
            return this.note.metadata?.title;
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
        },
        updateEditor(value) {
            this.editor.setMarkdown(value);
        },
        getNote() {
            this.$store.dispatch("note/load");
            api.get(this.url)
                .then((response) => {
                    this.note = response.note;
                    this.metadata = response.metadata;
                    this.updateEditor(response.note);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        save(value) {
            console.log("save", value, this.editor.getMarkdown());
            api.post(this.url, {note: this.editor.getMarkdown()})
                .then((response) => {
                    console.log("response", response);
                })
                .catch((x) => {
                    console.error(x);
                });
        },
    },
    mounted() {
        this.getNote();
        this.initEditor();
        this.initEventListeners();
    },
};
</script>
