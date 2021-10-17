<template>
    <Editor :initialValue="value"/>
</template>

<script>
//import EasyMDE from "easymde";
import {Editor} from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

//import "easymde/dist/easymde.min.css";

export default {
    name: "Editor",
    components: {
        Editor,
    },
    data() {
        return {
            editor: null,
        };
    },
    props: ["value"],
    mounted() {
        console.log('value', this.value);
    },
};
</script>

<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 500px;
}
</style>
