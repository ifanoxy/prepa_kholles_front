<script setup lang="ts">

import { RouterView } from 'vue-router'

</script>

<template>
    <div class="flex grow h-dvh flex-col">
        <nav class="flex bg-secondary h-28">

        </nav>
        <RouterView />
        <nav class="flex bg-secondary mt-auto h-28 bottom-0">

        </nav>
    </div>
</template>
