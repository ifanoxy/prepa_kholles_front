<script lang="ts">
import {ApiClient} from "@/plugins/API/client";
import {Buffer} from "buffer";

export default {
    props: ['reload'],
    watch: {
        async reload() {
            this.sujets = (await ApiClient.route.sujets.getAll()).data;
            for (const sujet of this.sujets)
                sujet.image = Buffer.from(sujet.image, "base64");
        }
    },
    data() {
        return {
            sujets: []
        }
    },
    async mounted() {
        this.sujets = (await ApiClient.route.sujets.getAll()).data;
        for (const sujet of this.sujets)
            sujet.image = Buffer.from(sujet.image, "base64");
    }
}
</script>

<template>
    <div class="flex-col w-full flex sm:flex-row sm:flex-wrap gap-4 p-4">
        <Card class="sm:flex-1 sm:min-w-[40%] lg:min-w-[30%]" v-for="sujet of sujets">
            <template #title>Kholle de {{ sujet.matiere.name }}</template>
            <template v-if="sujet.chapitre" #subtitle>{{ sujet.chapitre.name }}</template>
            <template #content>
                <Image preview image-class="aspect-video object-cover" :src="sujet.image">
                    <template #previewicon>
                        <i class="pi pi-search"></i>
                    </template>
                </Image>
            </template>
            <template #footer>
                <i class="text-sm">
                    Par {{ sujet.author.first_name + ' ' + sujet.author.last_name }}
                </i>
            </template>
        </Card>
    </div>
</template>

<style>
.p-card-body {
    height: 100%;
    display: flex;
    flex-grow: 1;
}

.p-card-content {
    display: flex;
    margin-top: auto;
}
</style>
