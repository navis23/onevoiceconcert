<template>
    <div class="px-4 py-4 md:px-16 lg:px-24 xl:px-36 bg-gray-100">
        <div class="flex flex-col min-h-screen w-full justify-center items-center">
            <!-- header theme -->
            <h1 class="text-5xl md:text-6xl lg:text-7xl w-full font-bold tracking-tighter uppercase">dear <span class="text-sky-800">dreams</span> concert</h1>
            <h2 class="text-lg md:text-xl lg:text-2xl w-full font-semibold italic pt-3 pb-6 md:pb-10">Presented by One Voice Spensabaya | SMPN 1 Surabaya</h2>

            <!-- ticket hero -->
            <div class="grid w-full grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                <!-- hero card -->
                <div class="p-5 bg-white shadow-md rounded md:col-span-2">
                    <div class="flex flex-col md:flex-row gap-x-4 gap-y-2">
                        <div class="flex items-center gap-x-1 md:pb-3">
                            <Icon name="ph:clock-bold" class="text-base lg:text-2xl" />
                            <h3 class="text-sm font-semibold">
                                Jumat, 23 Juni 2023
                            </h3>
                        </div>
                        <div class="flex items-center gap-x-1 pb-3">
                            <Icon name="ph:map-pin-bold" class="text-base lg:text-2xl" />
                            <h3 class="text-sm font-semibold">
                                Gedung Kesenian Cak Durasim Surabaya
                            </h3>
                        </div>
                    </div>
                    <img src="~/assets/img/opera.jpg" class="object-cover h-80 w-full rounded" alt="">
                    <h3 class="font-semibold pt-3 uppercase text-lg">
                            Dear Dreams Concert by One Voice Spensabaya
                        </h3>
                </div>

                <!-- hero detail -->
                <div class="flex flex-col pb-8">
                    <nuxt-link :to="`/checkout/${uniqueSuffix}`">
                        <button class="mb-8 flex items-center justify-center gap-x-2 w-full rounded font-bold bg-blue-500 text-gray-100 shadow-md pr-3 pl-2 py-5 uppercase">
                            <Icon name="ph:ticket-bold" class="text-sm lg:text-3xl text-gray-100" />
                            pilih tiket
                        </button>
                    </nuxt-link>
                    <div class="relative flex flex-col bg-white shadow-md p-3 rounded">
                        <div class="absolute left-0 rounded-r-full py-2 pl-3 pr-7 bg-emerald-400 text-gray-700">
                            <h3 class="font-semibold">
                                Event Details
                            </h3>
                        </div>
                        <div class="mt-14">
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:play-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    Jumat, 23 Juni 2023 19.00 WIB
                                </h3>
                            </div>
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:pause-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    Jumat, 23 Juni 2023 23.00 WIB
                                </h3>
                            </div>
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:map-pin-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    Gedung Kesenian Cak Durasim Surabaya
                                </h3>
                            </div>
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:tag-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    Start from IDR 125,000
                                </h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const uniqueSuffix = 'trx' + Date.now() + uuidv4()

</script>

<style scoped>

</style>