<script lang="ts">
import {ApiClient} from "@/plugins/API/client";

export default {
    data: () => {
        return {
            reset_password_dialog: false,
            reset_password: {
                old: null,
                new: null,
                confirm: null,
                loading: false,
                error: null,
            }
        }
    },
    methods: {
        save: async function () {
            if (this.reset_password.new != this.reset_password.confirm)
                return this.reset_password.error = "Les mots de passe doivent être identiques !"

            this.reset_password.loading = true;

            const res = await ApiClient.route.user.changePassword({
                old_password: this.reset_password.old,
                new_password: this.reset_password.new,
                confirm_password: this.reset_password.confirm,
            }).catch(err => {
                this.reset_password.error = err;
                return null;
            });

            console.log(res)

            if (res?.new_token) {
                localStorage.setItem('token', res.new_token);
            }

            this.reset_password.loading = false;
            this.reset_password_dialog = false;
        },
        close: function () {
            this.reset_password_dialog = false;
            this.reset_password = {
                old: null,
                new: null,
                confirm: null,
                loading: false,
            }
        }
    }
}
</script>

<template>
    <div class="flex grow flex-col p-4">
        <Card>
            <template #title>Informations sur votre compte</template>
            <template #content>
                <div class="flex flex-col w-full gap-4">
                    <div class="flex gap-4 text-center items-center">
                        <div class="bg-secondary px-2 py-1 rounded">Classe</div>
                        <p>MP2I</p>
                    </div>
                    <div class="flex gap-4 text-center items-center">
                        <div class="bg-secondary bg-opacity-70 px-2 py-1 rounded">Sujets envoyés</div>
                        <p>WIP</p>
                    </div>
                    <div class="flex gap-4 text-center items-center">
                        <div class="bg-secondary bg-opacity-70 px-2 py-1 rounded">Sujets téléchargés</div>
                        <p>WIP</p>
                    </div>
                    <div class="flex gap-4 text-center items-center">
                        <div class="bg-secondary bg-opacity-70 px-2 py-1 rounded">Sujets favoris</div>
                        <p>WIP</p>
                    </div>
                    <div>
                        <Button @click="reset_password_dialog = !reset_password_dialog" class="w-full" label="Changer de mot de passe" severity="secondary" size="sm" />
                    </div>
                </div>
            </template>
        </Card>

        <Dialog v-model:visible="reset_password_dialog" class="m-4" modal header="Changer de Mot de passe" :style="{ width: '25rem' }">
            <div class="flex w-full flex-col gap-1 mb-4">
                <label for="username">Ancien mot de passe</label>
                <Password input-class="w-full" :feedback="false" toggle-mask id="old-password" v-model="reset_password.old" />
            </div>
            <div class="flex w-full flex-col gap-1 mb-4">
                <label for="username">Nouveau mot de passe</label>
                <Password input-class="w-full" :feedback="false" toggle-mask id="new-password" v-model="reset_password.new" />
            </div>
            <div class="flex w-full flex-col gap-1 mb-4">
                <label for="username">Confirmation mot de passe</label>
                <Password input-class="w-full" :feedback="false" toggle-mask id="confirm-password" v-model="reset_password.confirm" />
            </div>

            <p class="text-red-500 my-3">{{ reset_password?.error}}</p>

            <div class="flex gap-2">
                <Button class="flex grow" type="button" label="Annuler" severity="secondary" @click="close"></Button>
                <Button :disabled="reset_password.loading || !reset_password.old || !reset_password.new || !reset_password.confirm" @click="save" class="flex grow" type="button" label="Confirmer"></Button>
            </div>
        </Dialog>

    </div>
</template>

<style scoped>

</style>