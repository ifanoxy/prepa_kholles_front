<script lang="ts">


import Bottom_navbar from "@/components/bottom_navbar.vue";
import Add_sujet from "@/components/add_sujet.vue";

export default {
    components: {Add_sujet, Bottom_navbar},
    data: () => {
        return {
            open_add_sujet: false,
        }
    },
    methods: {
        add_sujet_dialog: function () {
            this.open_add_sujet = true;
        }
    }
}
</script>

<template>
    <div class="flex grow h-dvh flex-col">
        <Add_sujet v-if="true" @close="this.open_add_sujet = false" :on_open="this.open_add_sujet" />
        <RouterView />
        <nav class="flex bg-secondary w-full mt-auto h-24 bottom-0">
            <Bottom_navbar @add_sujet="add_sujet_dialog" />
        </nav>
    </div>
</template>
