<script lang="ts">
export default {
    emits: ['add_sujet'],
}
</script>

<template>
    <div class=" flex w-full gap-6 items-center justify-center">
        <div class="flex grow h-full">

        </div>
        <div class="aspect-square flex h-full">
            <div @click="$emit('add_sujet')" style="top: -2rem" class="relative bg-secondary rounded-full w-full h-full">
                <div class="rounded-full border-white border-[4px] flex h-full grow items-center justify-center">
                    <i style="font-size: 2.5rem" class=" pi pi-plus"></i>
                </div>
            </div>
        </div>
        <div class="flex grow h-full">

        </div>
    </div>
</template>

<style scoped>

</style>
