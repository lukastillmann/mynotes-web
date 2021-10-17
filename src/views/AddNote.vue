<template>
    <div>
        ADD
        <button @click="save">Save</button>
    </div>
</template>

<script>
import api from "@/store/api";
import config from "@/config";
export default {
    name: "AddNote",
    computed: {
        url() {
            const category = this.$route.params.category;
            const url = config.api.add.expand({category: category});
            return url;
        },
    },
    methods: {
        save() {
            const title = "testtitle";
            const object = {
                title: title,
                note: "This is a note",
            };
            api.post(this.url, object)
                .then((response) => {
                    console.log("response", response);
                })
                .catch((x) => {
                    console.error(x);
                });
        },
    },
};
</script>

<style scoped></style>
