<template>
    <div class="category">
        <ui-grid>
            <ui-grid-cell :columns="3">
                <h3>Alle Notizen in "{{ category }}"</h3>
                <ul v-if="notes.length">
                    <NoteCard v-for="note in notes" :key="note" :note="note" :category="category" />
                </ul>
                <div v-else>Keine Notizen in dieser Kategorie</div>
            </ui-grid-cell>
            <ui-grid-cell :columns="9">
                <Note v-if="note"/>
                <div v-else>No Note</div>
            </ui-grid-cell>
        </ui-grid>
        <FloatingButton :category="category" />
    </div>
</template>

<script>
import {mapState} from "vuex";
import NoteCard from "@/components/NoteCard";
import FloatingButton from "@/components/FloatingButton";
import Note from "@/components/Note";

export default {
    name: "Category",
    components: {
        FloatingButton,
        Note,
        NoteCard,
    },
    watch: {
        category() {
            this.resetNotes();
            this.getNotes()
        }
    },
    computed: {
        ...mapState(["notes"]),
        note() {
            return this.$route.params.note;
        },
        category() {
            return this.$route.params.category;
        },
    },
    methods: {
        getLink(note) {
            return `/category/${this.category}/${note}`;
        },
        resetNotes() {
            this.$store.commit("notes/clear");
        },
        getNotes() {
            this.$store.dispatch("notes/load", this.category);
        },
        setCategory() {
            this.$store.commit("category/update", this.category);
        },
    },
    mounted() {
        this.setCategory();
        this.getNotes();
    },
};
</script>

<style lang="scss" scoped>
h2 {
    margin: 30px 30px 10px;
}

ul {
    padding: 0;
}
li {
    list-style-type: none;
}
</style>
