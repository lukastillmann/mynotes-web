<template>
    <ui-snackbar
        v-model="open"
        :timeout-ms="timeout"
        :message="message"
        :action-button-text="actionText"
        :action-type="actionType ? 1 : 0"
    ></ui-snackbar>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Messages",
    data() {
        return {
            open: false,
            timeout: 4000,
            message: "",
            actionText: "close",
            actionType: true,
        };
    },
    computed: {
        ...mapState(["messages"]),
    },
    watch: {
        messages: {
            handler(n) {
                if (n.length > 0) {
                    const message = n[n.length - 1];
                    this.message = message.text;
                    this.open = true;
                    setTimeout(() => {
                        this.$store.commit("messages/remove", n[n.length - 1]);
                        this.open = false;
                    }, this.timeout);
                }
            },
            deep: true,
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped></style>
