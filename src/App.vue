<script lang="ts">
import Bottom_navbar from "@/components/bottom_navbar.vue";
import Add_sujet from "@/components/add_sujet.vue";
import {ApiClient} from "@/plugins/API/client";

export default {
    components: {Add_sujet, Bottom_navbar},
    data: () => {
        return {
            open_add_sujet: false,
            reload: 0,
            open_search_dialog: false,
            filters: {
                matiere: null,
                chapitre: null,
            },
            matieres: [],
            chapitres: []
        }
    },
    async beforeMount() {
        const matieres = await ApiClient.route.matieres.getAll();
        if (matieres?.data?.length > 0)
            this.matieres = matieres.data;
        const chapitres = await ApiClient.route.chapitres.getAll();
        if (chapitres?.data?.length > 0)
            this.chapitres = chapitres.data;
    },
    methods: {
        filtered_chapitre: function () {
            return this?.filters?.matiere?.id ? this.chapitres.filter(x => x.matiere_id == this?.filters?.matiere?.id) : this.chapitres;
        },
        add_sujet_dialog: function () {
            this.open_add_sujet = true;
        },
        sujet_created: function () {
            this.open_add_sujet = false;
            this.reload++;
        },
        open_search: function () {
            this.open_search_dialog = true;
        }
    }
}
</script>

<template>
    <div class="flex grow h-dvh flex-col gap-4">
        <nav class="absolute z-10 m-4 bg-secondary rounded-full bg-opacity-80 h-10 w-10 flex items-center justify-center" v-if="$route.name != 'login'" >
            <i @click="open_search_dialog = !open_search_dialog" class="pi pi-search" />
        </nav>

        <div class="card flex justify-center">
            <Drawer v-model:visible="open_search_dialog" header="Recherche" position="full">
                <div class="flex h-full flex-col gap-4 pt-4 pb-12">
                    <div class="flex flex-col gap-2">
                        <label>Matières</label>
                        <Select show-clear v-model="filters.matiere" :options="matieres" option-label="name" placeholder="Selectionner une matière" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label>Chapitres</label>
                        <Select show-clear v-model="filters.chapitre" :options="filtered_chapitre(chapitres)" option-label="name" placeholder="Selectionner un chapitre" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
                    </div>
                    <Button icon="pi pi-search" class="w-full mt-auto" label="Rechercher" @click="open_search_dialog = !open_search_dialog" />
                </div>
            </Drawer>
        </div>

        <Add_sujet @created="sujet_created" v-if="$route.name != 'login'" @close="this.open_add_sujet = false" :on_open="this.open_add_sujet" />
        <div class="overflow-auto flex h-full mt-12" :class="$route.name == 'login' ? 'grow' : ''">

            <RouterView :reload="reload" ref="routerView" v-slot="{ Component }">
                <KeepAlive>
                    <component :filters="filters" :is="Component"></component>
                </KeepAlive>
            </RouterView>
        </div>
        <nav v-if="$route.name != 'login'" class="flex bg-secondary grow w-full mt-auto md:h-[90px] h-[75px]">
            <Bottom_navbar @add_sujet="add_sujet_dialog" />
        </nav>
    </div>
</template>
