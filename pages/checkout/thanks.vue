<template>
    <div class="fixed top-0 left-0 w-full bg-gray-800 h-screen">
        <div class="relative flex flex-col items-center justify-center" >
            <img src="~/assets/img/testing.jpg" class="absolute -z-10 h-screen top-0 object-cover w-full rounded opacity-50" alt="" />
            <!-- invoice section -->
            <div class="p-2">
                <div class="flex flex-col justify-center items-center w-[25rem] md:w-[30rem] h-screen">
                    <h2 class="text-6xl tracking-tight font-bold uppercase pb-4 text-center text-sky-200 drop-shadow-lg italic">TERIMA KASIH </h2>
                    <div class="flex flex-col items-center w-full mt-1 bg-white p-3 rounded">
                        <p class="text-sm">Pemesanan tiket untuk event</p>
                        <p class="text-sm font-bold">Dear Dream Concert One Voice Spensabaya</p>
                        <p class="text-sm pb-2">telah berhasil diproses</p>
                        <p class="text-sm ">Silahkan hubungi kontak person dibawah</p>
                        <p class="text-sm ">Bu Lia 085336369334</p>
                        <p class="text-sm ">Bu Ria 082132551265</p>
                    </div>
                    <div class="flex pt-6">
                        <button @click="backHome()" class="flex items-center justify-center gap-x-2 rounded font-bold text-xs bg-blue-500 text-gray-100 pr-3 pl-2 py-3 uppercase">
                            <Icon name="ph:house-line-bold" class="text-sm lg:text-2xl text-gray-100" />
                            Kembali Ke Halaman Utama
                        </button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">

// ref data from pinia store in composabl
const storeTicket = useTicketStore()

const {
    id_transaksi,
    kode_transaksi,
    kode_key_temp,
    nama,
    telepon,
    email,
    countReg,
    countVip,
} = storeToRefs(storeTicket)

const backHome = async () => {
    nama.value = ''
    telepon.value = ''
    email.value = ''
    countReg.value = 0
    countVip.value = 0
    kode_key_temp.value = ''
    await navigateTo('/')
}

</script>

<style scoped>

</style>