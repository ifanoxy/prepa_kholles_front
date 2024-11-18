<script lang="ts">
export default {
    emits: ['add_sujet'],
}
</script>

<template>
    <div class=" flex w-full gap-6 items-center justify-center">
        <div class="flex grow h-full p-4 justify-center flex-col items-center">
            <div class="flex flex-col items-center m-2" @click="() => $router.push('/')">
                <i class="pi pi-file" style="font-size: 1.75rem" />
                <div class="mt-[-0.25rem] translate-y-[0.5rem] bg-white h-0.5 w-5 rounded" v-if="$route.name == 'home'"></div>
            </div>
        </div>
        <div class="aspect-square flex h-full">
            <div @click="$emit('add_sujet')" style="top: -2rem" class="relative bg-secondary rounded-full w-full h-full">
                <div class="rounded-full border-white border-[4px] flex h-full grow items-center justify-center">
                    <i style="font-size: 2.5rem" class=" pi pi-plus"></i>
                </div>
            </div>
        </div>
        <div class="flex grow h-full p-4 justify-center flex-col items-center">
            <div class="flex flex-col items-center m-2" @click="() => $router.push('/account')">
                <i class="pi pi-user" style="font-size: 1.75rem" />
                <div class="mt-[-0.25rem] translate-y-[0.5rem] bg-white h-0.5 w-5 rounded" v-if="$route.name == 'account'"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
