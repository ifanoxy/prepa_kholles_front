<script lang="ts">
import Bottom_navbar from "@/components/bottom_navbar.vue";
import Add_sujet from "@/components/add_sujet.vue";

export default {
    components: {Add_sujet, Bottom_navbar},
    data: () => {
        return {
            open_add_sujet: false,
            reload: 0,
        }
    },
    methods: {
        add_sujet_dialog: function () {
            this.open_add_sujet = true;
        },
        sujet_created: function () {
            this.open_add_sujet = false;
            this.reload++;
        }
    }
}
</script>

<template>
    <div class="flex grow h-dvh flex-col gap-4">
        <Add_sujet @created="sujet_created" v-if="$route.name != 'login'" @close="this.open_add_sujet = false" :on_open="this.open_add_sujet" />
        <div class="overflow-auto flex" :class="$route.name == 'login' ? 'grow' : ''">
            <RouterView :reload="reload" ref="routerView" />
        </div>
        <nav v-if="$route.name != 'login'" class="flex bg-secondary grow w-full mt-auto max-h-[100px] min-h-[75px] h-52">
            <Bottom_navbar @add_sujet="add_sujet_dialog" />
        </nav>
    </div>
</template>
