<script lang="ts">
import type {AutoCompleteCompleteEvent} from "primevue/autocomplete";
import {ApiClient} from "@/plugins/API/client";
import router from "@/router";


export default {
    data: () => {
        return {
            names: [],
            raw_names: [],
            searchNames: [],
            initialValues: {
                name: '',
                password: ''
            },
            wrong_auth: false,
        }
    },
    async mounted()
    {
        this.raw_names = (await ApiClient.route.users.getAll()).data;
        this.names = this.raw_names.map(x => `${x.last_name} ${x.first_name}`);
    },
    methods: {
        search: function (name: AutoCompleteCompleteEvent) {
            this.searchNames = this.names.filter(x => x.toLowerCase().includes(name.query?.toLowerCase()));
        },
        onFormSubmit: async function (data) {
            if (data.valid) {
                const name = this.raw_names.find(x => `${x.last_name} ${x.first_name}` === this.initialValues.name);

                const res = await ApiClient.route.user.isAuth({
                    password: this.initialValues.password,
                    first_name: name.first_name,
                    last_name: name.last_name,
                }).catch(() => null);

                if (!res)
                    this.wrong_auth = true;
                if (!res)return;

                localStorage.setItem("token", res.token);

                await router.push({name: "home"});
            }
        },
        resolver: function ({ values }) {
            const errors = {};

            if (!values.name) {
                errors.name = [{ message: 'Le nom et prénom est requis.' }];
            }

            if (!this.names.includes(values.name)) {
                errors.name = [{ message: 'Le nom et prénom n\'existe pas.' }];
            }

            if (!values.password) {
                errors.password = [{ message: 'Le mot de passe est requis.' }];
            }

            return {
                errors
            };
        },
    }
}
</script>

<template>
    <div class="flex p-12 grow">
        <div class="flex grow card items-center justify-center">
            <Panel class="flex flex-col grow max-w-[500px]">
                <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"  class="flex justify-center flex-col gap-4">
                    <div class="card flex-col flex justify-center">
                        <AutoComplete v-model="initialValues.name" class="w-full" dropdown name="name"  placeholder="NOM Prénom" :suggestions="searchNames" @complete="search"  />
                        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText v-model="initialValues.password" name="password" type="password" placeholder="Mot de Passe" />
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                    </div>
                    <Message v-if="wrong_auth" severity="error" size="small" variant="simple">Identifiant de connexion Invalide</Message>
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
