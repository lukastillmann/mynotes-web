<template>
    <div class="app">
        <DrawerNavigation />
        <NavigationBar />
        <div class="content">
            <router-view />
        </div>
        <Messages/>
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import DrawerNavigation from "@/components/DrawerNavigation";
import Messages from "@/components/Messages";

export default {
    name: "App",
    components: {
        DrawerNavigation,
        Messages,
        NavigationBar,
    },
};
</script>
