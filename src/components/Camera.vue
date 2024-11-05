<script lang="ts">

export default {
    props: ['active'],
    emits: ['image_upload'],
    mounted() {
        this.createCameraElement();
    },
    beforeUnmount() {
        this.stopCameraStream();
    },
    data() {
        return {
            isCameraOpen: true,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            link: '#'
        }
    },
    methods: {
        createCameraElement() {
            this.isLoading = true;

            const constraints = (window.constraints = {
                audio: false,
                video: true
            });


            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.isLoading = false;
                    this.$refs.camera.srcObject = stream;
                })
                .catch(() => {
                    this.isLoading = false;
                    alert("May the browser didn't support or there is some errors.");
                });
        },

        stopCameraStream() {
            const tracks = this.$refs.camera.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });
        },
        valid() {
            this.$emit("image_upload", this.$refs.canvas.toDataURL());
        },
        takePhoto() {
            this.isPhotoTaken = !this.isPhotoTaken;

            const context = this.$refs.canvas.getContext('2d');
            context.drawImage(this.$refs.camera, 0, 0, 4 * 450, 4 * 337.5);

            if(!this.isPhotoTaken) {
                this.isShotPhoto = true;

                const FLASH_TIMEOUT = 50;

                setTimeout(() => {
                    this.isShotPhoto = false;
                }, FLASH_TIMEOUT);
            }
        },
    }
}
</script>

<template scoped>
    <div class="flex items-center justify-center h-full web-camera-container">
        <div class="max-w-80 flex items-center grow h-full">
            <div v-show="isCameraOpen && isLoading" class="camera-loading">
                <ul class="loader-circle">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="">
                <div class="flex flex-col gap-2">
                    <div v-if="isCameraOpen" v-show="!isLoading" class="flex" :class="{ 'flash' : isShotPhoto }">
                        <video class="rounded" v-show="!isPhotoTaken" ref="camera" autoplay></video>
                    </div>
                    <canvas class="w-full flex rounded" v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="4 * 450" :height="4 * 337.5"></canvas>

                    <Button :label="isPhotoTaken ? 'Reprendre' : 'Prendre une photo'" @click="takePhoto" icon="pi pi-camera" />
                    <Button @click="valid" :disabled="!isPhotoTaken" label="Valider" variant="outlined" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.web-camera-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .camera-loading {
        overflow: hidden;
        height: 100%;
        position: absolute;
        width: 100%;
        min-height: 150px;
        margin: 3rem 0 0 -1.2rem;

        ul {
            height: 100%;
            position: absolute;
            width: 100%;
            z-index: 999999;
            margin: 0;
        }

        .loader-circle {
            display: block;
            height: 14px;
            margin: 0 auto;
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            transform: translateX(-50%);
            position: absolute;
            width: 100%;
            padding: 0;

            li {
                display: block;
                float: left;
                width: 10px;
                height: 10px;
                line-height: 10px;
                padding: 0;
                position: relative;
                margin: 0 0 0 4px;
                background: #999;
                animation: preload 1s infinite;
                top: -50%;
                border-radius: 100%;

                &:nth-child(2) {
                    animation-delay: .2s;
                }

                &:nth-child(3) {
                    animation-delay: .4s;
                }
            }
        }
    }

    @keyframes preload {
        0% {
            opacity: 1
        }
        50% {
            opacity: .4
        }
        100% {
            opacity: 1
        }
    }
}
</style>
