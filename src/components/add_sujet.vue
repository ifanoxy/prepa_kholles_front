<script lang="ts">
import Camera from "@/components/Camera.vue";
import {isMobile} from "@/plugins/utils/isMobile";

export default {
    components: {Camera},
    props: ['on_open'],
    emits: ['close'],
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
            camera_visible: false,
            matieres: []
        }
    },
    mounted() {

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

                <Button v-if="!isMobile()" severity="secondary" size="small" label="Prendre une photo" icon="pi pi-camera" @click="camera_visible = true" />

                <FileUpload :choose-label="isMobile() ? 'Prendre une photo' : 'Importer'" accept="image/*" :maxFileSize="16_000_000" mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="whitespace-nowrap text-xs p-button-outlined" />
            </div>

            <label for="matiere" class="font-semibold">Matière</label>
            <Select v-model="matiere" :options="cities" optionLabel="matiere" placeholder="Sélectionner une matière" class="w-full md:w-56" />
        </div>
        <div class="flex gap-2">
            <Button class="w-full" type="button" label="Annuler" severity="secondary" @click="visible = false"></Button>
            <Button class="w-full" type="button" label="Sauvegarder" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>
