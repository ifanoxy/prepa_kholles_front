<script lang="ts">
import { ref } from 'vue';
import type {AutoCompleteCompleteEvent} from "primevue/autocomplete";
import {ApiClient} from "@/plugins/API/client";


export default {
    data: () => {
        return {
            names: [],
            searchNames: [],
            initialValues: {
                name: '',
                password: ''
            }
        }
    },
    async mounted()
    {
        this.names = (await ApiClient.route.users.getAll()).data.map(x => `${x.last_name} ${x.first_name}`);
    },
    methods: {
        search: function (name: AutoCompleteCompleteEvent) {
            this.searchNames = this.names.filter(x => x.toLowerCase().includes(name.query?.toLowerCase()));
        },
        onFormSubmit: function (data) {
            if (data.valid) {
                console.log(this.initialValues)
            }
        },
    }
}
</script>

<template>
    <div class="flex p-12 grow">
        <div class="flex grow card items-center justify-center">
            <Panel class="flex flex-col grow max-w-[500px]">
                <Form v-slot="$form" :initialValues="initialValues" @submit="onFormSubmit"  class="flex justify-center flex-col gap-4">
                    <div class="card  flex justify-center">
                        <AutoComplete v-model="initialValues.name" class="w-full" dropdown name="name"  placeholder="NOM Prénom" :suggestions="searchNames" @complete="search" />
                        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText v-model="initialValues.password" name="mot-de-passe" type="password" placeholder="Mot de Passe" />
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="secondary" label="Se Connecter" />
                </Form>
                <template #header>
                    <div class="flex items-center gap-2">
                        <span class="font-bold">Connexion</span>
                    </div>
                </template>
            </Panel>
        </div>
    </div>
</template>

<style scoped>

</style>
