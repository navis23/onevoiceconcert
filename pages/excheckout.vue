<template>
    <div class="px-4 md:px-10 lg:px-20 xl:px-32 bg-gray-100 min-h-screen">
        <!-- navbar -->
        <div class="flex justify-between items-center py-2">
            <h1 class="text-xl md:text-3xl font-bold tracking-tighter uppercase">dear <span class="text-sky-800">dreams</span> concert</h1>
            <nuxt-link to="/">
                <button class="flex items-center justify-center gap-x-1 rounded font-semibold bg-gray-800 text-gray-100 shadow-md pr-5 pl-3 py-2">
                    <Icon name="ph:power-bold" class="text-sm lg:text-2xl text-gray-100" />
                    <span class="text-sm">HOME</span>
                </button>
            </nuxt-link>
        </div>

        <!-- main form area -->
        <div class="flex flex-col w-full pt-10 pb-4">
            <h3 class="text-lg font-bold pb-4">
                Form Pemesanan Tiket
            </h3>
            <div class="grid w-full grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 xl:gap-12" >
                <!-- form transactions -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4 bg-white shadow-md rounded md:col-span-2">
                    <!-- form biodata -->
                    <div class="relative bg-gray-700 rounded text-gray-50 p-4">
                        <div class="flex flex-col gap-y-1 pb-4">
                            <label for="nama" class="font-semibold">Nama Pemesan</label>
                            <input type="text" name="nama" id="nama" v-model="nama" class="rounded text-gray-800 px-2 py-2 text-sm h-12 border-2 " placeholder="Isi nama lengkap anda">
                        </div>
                        <div class="flex flex-col gap-y-1 pb-4">
                            <label for="telepon" class="font-semibold">Nomor Telepon</label>
                            <input type="text" name="telepon" id="telepon" v-model="telepon" class="rounded text-gray-800 px-2 py-2 text-sm h-12 border-2 " placeholder="Isi nomor telepon anda">
                        </div>
                        <div class="flex flex-col gap-y-1 pb-4">
                            <label for="email" class="font-semibold">Alamat Email</label>
                            <input type="text" name="email" id="email" v-model="email" class="rounded text-gray-800 px-2 py-2 text-sm h-12 border-2 " placeholder="Isi alamat email anda">
                        </div>
                        <p class="absolute bottom-4 right-4 text-xs"><span class="text-xs py-1 px-2 font-bold bg-gray-200 bg-opacity-30 text-gray-200 rounded-md">trx-skdj283291u23</span></p>
                    </div>

                    <!-- choose ticket -->
                    <div class="md:px-4">
                        <p class="font-semibold text-lg pb-3">Pilih Tiket</p>
                        <div class="flex items-center justify-between py-3 px-4 mb-4 rounded border-2 border-gray-200 shadow-md">
                            <div class="flex flex-col">
                                <p class="font-bold text-lg uppercase">Tiket Reg</p>
                                <p class="font-semibold text-base">IDR 100,000</p>
                            </div>
                            <div class="flex items-center justify-evenly gap-x-3">
                                <button class="rounded-full" @click="minReg()">
                                    <Icon name="ph:minus-bold" class="text-2xl rounded-full font-bold bg-red-600 text-white p-1" />
                                </button>
                                <p class="font-semibold text-lg">{{ countReg }}</p>
                                <button class="rounded-full" @click="plusReg()">
                                    <Icon name="ph:plus-bold" class="text-2xl rounded-full font-bold bg-emerald-400 p-1" />
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-3 px-4 mb-4 rounded border-2 border-gray-200 shadow-md">
                            <div class="flex flex-col">
                                <p class="font-bold text-lg uppercase">Tiket VIP</p>
                                <p class="font-semibold text-base">IDR 150,000</p>
                            </div>
                            <div class="flex items-center justify-evenly gap-x-3">
                                <button class="rounded-full" @click="minVip()">
                                    <Icon name="ph:minus-bold" class="text-2xl rounded-full font-bold bg-red-600 text-white p-1" />
                                </button>
                                <p class="font-semibold text-lg">{{ countVip }}</p>
                                <button class="rounded-full" @click="plusVip()">
                                    <Icon name="ph:plus-bold" class="text-2xl rounded-full font-bold bg-emerald-400 p-1" />
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between py-3 px-4 mb-4 rounded border-2 border-gray-200 shadow-md">
                            <div class="flex flex-col">
                                <p class="font-bold text-lg uppercase">Tiket VvIP</p>
                                <p class="font-semibold text-base">IDR 200,000</p>
                            </div>
                            <div class="flex items-center justify-evenly gap-x-3">
                                <button class="rounded-full" @click="minVvip()">
                                    <Icon name="ph:minus-bold" class="text-2xl rounded-full font-bold bg-red-600 text-white p-1" />
                                </button>
                                <p class="font-semibold text-lg">{{ countVvip }}</p>
                                <button class="rounded-full" @click="plusVvip()">
                                    <Icon name="ph:plus-bold" class="text-2xl rounded-full font-bold bg-emerald-400 p-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- detail transactions -->
                <div class="flex flex-col">
                    <!-- detail trx bio -->
                    <div class="relative flex flex-col bg-white shadow-md p-3 rounded">
                        <div class="absolute left-0 rounded-r-full py-2 pl-3 pr-7 bg-emerald-400 text-gray-700">
                            <h3 class="font-semibold">
                                Data Pembeli
                            </h3>
                        </div>
                        <div class="mt-14">
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:user-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    {{ nama }}
                                </h3>
                            </div>
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:phone-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    {{ telepon }}
                                </h3>
                            </div>
                            <div class="flex items-center gap-x-1 pb-3">
                                <Icon name="ph:envelope-bold" class="text-sm lg:text-xl" />
                                <h3 class="font-semibold text-sm">
                                    {{ email }}
                                </h3>
                            </div>
                            
                        </div>
                    </div>

                    <!-- detail trx ticket -->
                    <div class="relative flex flex-col mt-4 bg-white shadow-md p-3 rounded">
                        <div class="absolute left-0 rounded-r-full py-2 pl-3 pr-7 bg-emerald-400 text-gray-700">
                            <h3 class="font-semibold">
                                Detail Transaksi
                            </h3>
                        </div>
                        <div class="mt-14">
                            <div v-if="countReg != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                <p><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countReg }}</span> tiket REG <span class="text-gray-500 italic">@100,000</span></p>
                                <p class="font-semibold">IDR {{ SubtotalReg.toLocaleString() }}</p>
                            </div>

                            <div v-if="countVip != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                <p><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countVip }}</span> tiket VIP <span class="text-gray-500 italic">@150,000</span></p>
                                <p class="font-semibold">IDR {{ SubtotalVip.toLocaleString() }}</p>
                            </div>
                            
                            <div v-if="countVvip != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                <p><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countVvip }}</span> tiket VVIP <span class="text-gray-500 italic">@200,000</span></p>
                                <p class="font-semibold">IDR {{ SubtotalVvip.toLocaleString() }}</p>
                            </div>
                            
                        </div>
                    </div>

                    <!-- total trx -->
                    <div class="flex items-center justify-between mt-4 bg-white shadow-md p-3 rounded">
                        <p class="font-bold text-lg uppercase">total</p>
                        <p class="font-bold text-lg uppercase">IDR {{ totalAll.toLocaleString() }}</p>
                    </div>

                    <!-- error notif reminder -->
                    <div v-if="bioValid || ticketValid" class="flex items-center justify-center gap-x-2 mt-4 bg-red-600 text-gray-100 shadow-md p-3 rounded">
                        <Icon v-if="bioValid || ticketValid" name="ph:shield-warning-bold" class="text-sm lg:text-2xl text-gray-100" />
                        <p v-if="bioValid" class="font-semibold text-sm">Lengkapi biodata anda terlebih dahulu</p>
                        <p v-if="ticketValid" class="text-sm">Pilih tiket anda terlebih dahulu</p>
                    </div>

                    <button  @click="confirmOrder()" class="mt-8 flex items-center justify-center gap-x-2 w-full rounded font-bold bg-blue-500 text-gray-100 shadow-md pr-3 pl-2 py-5 uppercase">
                        <Icon name="ph:ticket-bold" class="text-sm lg:text-3xl text-gray-100" />
                        pesan tiket
                    </button>
                </div>
            </div>
        </div>

        <!-- confirm ticket -->
        <div v-if="confirmTicket" class="fixed top-0 left-0 w-full bg-gray-100 h-screen">
            <div class="flex flex-col items-center justify-center" >
                <!-- invoice section -->
                <div class="p-2 pb-8" ref="pdfSection">
                    <h2 class="text-base w-[25rem] md:w-[27rem] font-bold uppercase pb-1 text-center">INVOICE ORDER</h2>
                    <div class="flex flex-col w-[25rem] md:w-[27rem]">
                        <div class="flex justify-end items-center mb-1 bg-white border-2 p-2 rounded">
                            <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-emerald-200 bg-opacity-30 text-emerald-600 rounded-md">trx-skdj283291u23</span></p>
                        </div>
                        <div class="relative flex flex-col bg-white border-2 p-2 rounded">
                            <div class="absolute left-0 rounded-r-full py-1 pl-2 pr-5 bg-emerald-400 text-gray-700">
                                <h3 class="font-semibold text-xs">
                                    Data Pembeli
                                </h3>
                            </div>
                            <div class="mt-8">
                                <div class="flex items-center gap-x-1 pb-1">
                                    <h3 class="font-semibold text-xs">
                                        Nama Lengkap : {{ nama }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1 pb-1">
                                    <h3 class="font-semibold text-xs">
                                        Nomor Telepon : {{ telepon }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1 pb-1">
                                    <h3 class="font-semibold text-xs">
                                        Alamat Email : {{ email }}
                                    </h3>
                                </div>
                            </div>
                        </div>
    
                        <div class="relative flex flex-col mt-1 bg-white border-2 p-2 rounded">
                            <div class="absolute left-0 rounded-r-full py-1 pl-2 pr-5 bg-emerald-400 text-gray-700">
                                <h3 class="font-semibold text-xs">
                                    Detail Transaksi
                                </h3>
                            </div>
                            <div class="mt-10">
                                <div v-if="countReg != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                    <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countReg }}</span> tiket REG  <span class="text-gray-500 italic">@100,000</span></p>
                                    <p class="font-semibold text-xs">IDR {{ SubtotalReg.toLocaleString() }}</p>
                                </div>
    
                                <div v-if="countVip != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                    <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countVip }}</span> tiket VIP <span class="text-gray-500 italic">@150,000</span></p>
                                    <p class="font-semibold text-xs">IDR {{ SubtotalVip.toLocaleString() }}</p>
                                </div>
                                
                                <div v-if="countVvip != 0" class="flex justify-between gap-x-1 pb-3 text-sm">
                                    <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countVvip }}</span> tiket VVIP <span class="text-gray-500 italic">@200,000</span></p>
                                    <p class="font-semibold text-xs">IDR {{ SubtotalVvip.toLocaleString() }}</p>
                                </div>
                                
                            </div>
                        </div>
    
                        <div class="flex items-center justify-between mt-1 bg-white border-2 p-2 rounded">
                            <p class="font-bold text-sm uppercase">total</p>
                            <p class="font-bold text-sm uppercase">IDR {{ totalAll.toLocaleString() }}</p>
                        </div>
    
                        <div class="flex flex-col items-center mt-1 bg-white border-2 p-2 rounded">
                            <p class="text-sm font-bold pb-2">Dear Dream Concert One Voice Spensabaya</p>
                            <p class="text-xs ">Pembayaran<span class="text-white">_</span>via transfer rekening ke :</p>
                            <p class="text-xs font-bold">No Rek 5725002308</p>
                            <p class="text-xs pb-2">BCA a/n Nugraheni Widiyatni</p>
                            <p class="text-xs ">Bukti transfer harap dikirim via Chat WA ke</p>
                            <p class="text-xs ">Bu Lia 085336369334</p>
                            <p class="text-xs ">Bu Ria 082132551265</p>
                        </div>
                        
                    </div>
                </div>
                <div class="flex justify-end gap-3">
                    <button  @click="cancelOrder()" class="flex items-center justify-center gap-x-2 rounded font-bold text-sm bg-gray-400 text-gray-100 shadow-md pr-3 pl-2 py-3 uppercase">
                        <Icon name="ph:x-circle-bold" class="text-sm lg:text-2xl text-gray-100" />
                        Batalkan
                    </button>
                    <button  @click="goPrint()" class="flex items-center justify-center gap-x-2 rounded font-bold text-sm bg-blue-500 text-gray-100 shadow-md pr-3 pl-2 py-3 uppercase">
                        <Icon name="ph:shopping-cart-bold" class="text-sm lg:text-2xl text-gray-100" />
                        Order Ticket
                    </button>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { exportToPDF } from '#imports'

const bioValid = ref(false)
const ticketValid = ref(false)
const confirmTicket = ref(false)
const orderNotif = ref(false)
const pdfSection = ref<HTMLElement | null>(null)

// ref data from pinia store in composabl
const storeTicket = useTicketStore()

const {
    id_transaksi,
    kode_transaksi,
    nama,
    telepon,
    email,
    countReg,
    countVip,
    countVvip,
} = storeToRefs(storeTicket)

const SubtotalReg = computed(() => {
    return countReg.value * 100000
})
const SubtotalVip = computed(() => {
    return countVip.value * 150000
})
const SubtotalVvip = computed(() => {
    return countVvip.value * 200000
})

const totalAll = computed(() => {
    return SubtotalReg.value + SubtotalVip.value + SubtotalVvip.value
})

const minReg = () => {
    if(countReg.value <= 0){
        countReg.value = 0
    } else {
        countReg.value--
    }
}

const plusReg = () => {
    countReg.value++
}

const minVip = () => {
    if(countVip.value <= 0){
        countVip.value = 0
    } else {
        countVip.value--
    }
}

const plusVip = () => {
    countVip.value++
}

const minVvip = () => {
    if(countVvip.value <= 0){
        countVvip.value = 0
    } else {
        countVvip.value--
    }
}

const plusVvip = () => {
    countVvip.value++
}

const confirmOrder = () => {
    
    if(nama.value == '', telepon.value == '', email.value == '' ){
        bioValid.value = true
        setTimeout(() => bioValid.value = false, 2000)
    } else if(totalAll.value == 0) {
        ticketValid.value = true
        setTimeout(() => ticketValid.value = false, 2000)
    } else {
        confirmTicket.value = true
    }
}

const cancelOrder = () => {
    confirmTicket.value = false
}

const goPrint = () => {
    exportToPDF('my-pdf-file.pdf',  pdfSection.value)
    nama.value = ''
    telepon.value = ''
    email.value = ''
    countReg.value = 0
    countVip.value = 0
    countVvip.value = 0
    confirmTicket.value = false
}

</script>

<style scoped>

</style>