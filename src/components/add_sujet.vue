<script lang="ts">
import Camera from "@/components/Camera.vue";
import {isMobile} from "@/plugins/utils/isMobile";
import {ApiClient} from "@/plugins/API/client";

export default {
    components: {Camera},
    props: ['on_open'],
    emits: ['close', 'created'],
    watch: {
        on_open: function() {
            this.src = false;
            this.visible = true;
            this.camera_visible = false;
        },
        visible: function() {
            this.$emit('close')
        }
    },
    data: () => {
        return {
            visible: false,
            src: null,
            matiere: null,
            loading: false,
            chapitre: null,
            camera_visible: false,
            matieres: [],
            chapitres: [],
            selected_chapitres: [],
        }
    },
    async mounted() {
        this.matieres = (await ApiClient.route.matieres.getAll()).data;
        this.chapitres = (await ApiClient.route.chapitres.getAll()).data;
    },
    methods: {
        isMobile,
        onPhoto(image: string) {
            this.src = image;
            this.camera_visible = false;
        },
        onFileSelect: function (event) {
            const file = event.files[0];
            const reader = new FileReader();

            reader.onload = async (e) => {
                this.src = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        onMatiereSelect() {
            if (this.matiere)
                this.selected_chapitres = this.chapitres.filter(x => x.matiere_id === this.matiere.id);
            else this.selected_chapitres = [];
        },
        async save() {
            this.loading = true;

            const res = await ApiClient.route.sujets.create({
                chapitre_id: this?.chapitre?.id,
                matiere_id: this.matiere.id,
                image: this.src,
            });

            console.log(res)

            this.$emit("created");

            this.visible = false;
        }
    }
}
</script>

<template>
    <Dialog class="mx-2" v-model:visible="visible" modal header="Ajouter un sujet" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8"></span>
        <div class="flex items-center flex-col gap-4 mb-4">
            <label for="username" class="font-semibold">Photo du sujet</label>
            <img :src="src ? src : 'https://static.vecteezy.com/ti/vecteur-libre/p2/21736279-transparent-contexte-4k-vide-la-grille-a-carreaux-disposition-fond-d-ecran-gratuit-vectoriel.jpg'" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
            <div class="flex gap-4 mb-4">
                <Drawer v-model:visible="camera_visible" position="full">
                    <Camera @image_upload="onPhoto" :active="camera_visible"></Camera>
                </Drawer>

                <Button :disabled="loading" v-if="!isMobile()" severity="secondary" size="small" label="Prendre une photo" icon="pi pi-camera" @click="camera_visible = true" />

                <FileUpload :disabled="loading" :choose-label="isMobile() ? 'Prendre une photo' : 'Importer'" accept=".png, .jpeg, .jpg" :maxFileSize="14_000_000" mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="whitespace-nowrap text-xs p-button-outlined" />
            </div>

            <label for="matiere" class="font-semibold">Matière</label>
            <Select :disabled="loading" @value-change="onMatiereSelect" v-model="matiere" :options="matieres" optionLabel="name" placeholder="Sélectionner une matière" class="w-full" />

            <Select :disabled="loading" v-if="selected_chapitres.length >= 1" @value-change="onMatiereSelect" v-model="chapitre" :options="selected_chapitres" optionLabel="name" placeholder="Sélectionner un chapitre" class="w-full" />
        </div>
        <div class="flex gap-2">
            <Button :disabled="loading" class="w-full" type="button" label="Annuler" severity="secondary" @click="visible = false"></Button>
            <Button :disabled="!src || !matiere || loading" class="w-full" type="button" label="Sauvegarder" @click="save"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>
