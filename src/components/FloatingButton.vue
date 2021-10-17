<template>
    <div>
        <ui-fab extended @click="click" class="button">
            <template #before="{iconClass}">
                <ui-icon :class="iconClass">add</ui-icon>
            </template>
            <span>Neue Notiz</span>
        </ui-fab>
        <ui-dialog v-model="open" scrollable @confirm="onConfirm" :closable="false">
            <ui-dialog-title>Neue Notiz anlegen</ui-dialog-title>
            <ui-dialog-content>
                <ui-form-field>
                    <ui-textfield v-model="title">Gib einen Titel ein</ui-textfield>
                </ui-form-field>
            </ui-dialog-content>
            <ui-dialog-actions></ui-dialog-actions>
        </ui-dialog>
    </div>
</template>

<script>
import config from "@/config";
import api from "@/store/api";

export default {
    name: "FloatingButton",
    data() {
        return {
            open: false,
            title: "",
        };
    },
    props: {
        category: {
            type: String,
        },
    },
    computed: {
        url() {
            const category = this.$route.params.category;
            const url = config.api.add.expand({category: category});
            return url;
        },
    },
    methods: {
        click() {
            this.open = true;
            /*
            this.$router.push({
                name: "AddNote",
                params: {
                    category: this.category,
                },
            });
            */
        },
        createNote2() {
            console.log("CreateNote", this.url);
        },
        createNote() {
            api.post(this.url, {title: this.title})
                .then((response) => {
                    console.log("response", response);
                    if (response.ok) {
                        this.$router.push({
                            name: "Note",
                            params: {
                                category: this.category,
                                note: response.title,
                            },
                        });
                    }
                })
                .catch((x) => {
                    console.error(x);
                });
        },
        onConfirm(confirm) {
            if (confirm == false) {
                this.open = false;
                return;
            }
            if (this.title && this.title != "") {
                console.log("save", this.title);
                this.open = false;
                this.createNote();
            } else {
                alert("Textfeld darf nicht leer sein");
            }
        },
    },
};
</script>

<style scoped lang="scss">
.button {
    position: fixed;
    bottom: 50px;
    right: 50px;
}
</style>
