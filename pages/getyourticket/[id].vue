<template>
    <div class="fixed top-0 left-0 w-full h-screen">
        <Loading v-if="loadingOverlay" />
            <div class="relative flex flex-col items-center justify-center" >
                <!-- invoice section -->
                    <!-- invoice section -->
                    <div class="p-2 pb-8" ref="pdfSection">
                        <h2 class="text-2xl w-[25rem] md:w-[27rem] font-bold uppercase pb-1 text-center text-emerald-600">BUKTI<span class="text-white">_</span>BAYAR</h2>
                        <div class="flex flex-col w-[25rem] md:w-[27rem]">
                            <div class="flex justify-between items-center mb-1 bg-gray-800 text-gray-100 p-2 rounded">
                                <p class="text-xs font-semibold tracking-tight uppercase">
                                    paid-{{ yourCode }}
                                </p>
                                <span class="text-sm py-1 px-3 font-bold bg-emerald-200 text-emerald-700 rounded-md uppercase">
                                    paid
                                </span>
                            </div>
                            <div class="relative flex flex-col bg-gray-800 text-gray-100 p-2 rounded">
                                <div class="absolute left-0 rounded-r-full py-1 pl-2 pr-5 bg-sky-200 text-gray-700">
                                    <h3 class="font-bold text-xs">
                                        Data Pembeli
                                    </h3>
                                </div>
                                <div class="mt-8">
                                    <div class="flex items-center gap-x-1 pb-1">
                                        <h3 class="font-semibold text-xs">
                                            Nama Lengkap : {{ show_nama }}
                                        </h3>
                                    </div>
                                    <div class="flex items-center gap-x-1 pb-1">
                                        <h3 class="font-semibold text-xs">
                                            Nomor Telepon : {{ show_telepon }}
                                        </h3>
                                    </div>
                                    <div class="flex items-center gap-x-1 pb-1">
                                        <h3 class="font-semibold text-xs">
                                            Alamat Email : {{ show_email }}
                                        </h3>
                                    </div>
                                </div>
                            </div>
        
                            <div class="relative flex flex-col mt-1 bg-gray-800 text-gray-100 p-2 rounded">
                                <div class="absolute left-0 rounded-r-full py-1 pl-2 pr-5 bg-sky-200 text-gray-700">
                                    <h3 class="font-bold text-xs">
                                        Jenis Tiket
                                    </h3>
                                </div>
                                <div class="flex gap-4 mt-10">
                                    <div v-if="show_countReg != 0" class="flex justify-between gap-x-1 pb-3 font-semibold">
                                        <p class="text-base"><span class="text-base py-1 px-2 font-bold bg-gray-200 text-gray-800 rounded-md">{{ show_countReg }}</span> tiket REG </p>
                                    </div>
        
                                    <div v-if="show_countVip != 0" class="flex justify-between gap-x-1 pb-3 font-semibold">
                                        <p class="text-base"><span class="text-base py-1 px-2 font-bold bg-gray-200 text-gray-800 rounded-md">{{ show_countVip }}</span> tiket VIP</p>
                                    </div>
                                    
                                </div>
                            </div>
        
                            <div class="flex items-center justify-between mt-1 bg-gray-800 text-gray-100 p-2 rounded">
                                <p class="font-bold text-sm uppercase">total</p>
                                <p class="font-bold text-sm uppercase">IDR {{ show_total.toLocaleString() }}</p>
                            </div>
                        
                            <div class="flex flex-col items-center mt-1 bg-gray-800 text-gray-100 p-2 rounded">
                                <p class="text-base text-emerald-300 font-bold">STATUS<span class="text-gray-800">x</span>PAID<span class="text-gray-800">x</span>/<span class="text-gray-800">x</span>TERBAYAR</p>
                                <p class="text-sm font-semibold pb-1">Tunjukkan Nota ini untuk ditukar tiket</p>
                            </div>
                            <div class="flex flex-col items-center mt-1 bg-gray-800 text-gray-100 p-2 rounded">
                                
                                <p class="text-xs font-semibold pb-1">Penukaran tiket ke panitia pada :</p>
                                <p class="text-xs font-semibold pb-1">21-22 Juni 2023 pukul 13.00 - 16.00</p>
                                <p class="text-xs font-semibold pb-1">Ruang Komite SMP Negeri 1 Surabaya Jl. Pacar 4-6 Surabaya</p>
                            </div>
                            <div class="flex flex-col items-center mt-1 bg-gray-800 text-gray-100 p-2 rounded">
                                
                                <p class="text-xs pb-1">Informasi lebih lanjut hubungi CP :</p>
                                <p class="text-xs ">Bu Lia 085336369334</p>
                                <p class="text-xs ">Bu Ria 082132551265</p>
                            </div>
                            
                        </div>
                    </div>
                    <div class="flex justify-end gap-3">
                        <button @click="goPrint()" class="flex items-center justify-center gap-x-2 rounded font-bold text-sm bg-blue-500 text-gray-100 shadow-md pr-3 pl-2 py-3 uppercase">
                            <Icon name="ph:printer-bold" class="text-sm lg:text-2xl text-gray-100" />
                            Cetak Bukti Bayar
                        </button>
                    </div>
                
            </div>
        </div>
</template>

<script setup lang="ts">
import axios from 'axios';

// default API url set
const urlHostApi = 'http://localhost:8181/'
const urlHostWebsite = 'http://localhost:3000/'

// ref data from pinia store in composabl
const storeTicket = useTicketStore()

const {
    tickets,
    id_transaksi,
    kode_transaksi,
    kode_key_temp,
    nama,
    telepon,
    email,
    countReg,
    countVip,
    total,
    status,
    bukti_trf
} = storeToRefs(storeTicket)

const yourTicket = ref()
const show_kode_key_temp = ref()
const show_nama = ref()
const show_telepon = ref()
const show_email = ref()
const show_countReg = ref(0)
const show_countVip = ref(0)
const show_total = ref(0)

const pdfSection = ref<HTMLElement | null>(null)

const loadingOverlay = ref(false)

const route = useRoute()

const paramsId = route.params.id
yourTicket.value = paramsId.toString()

const yourCode = ref()

// mounted first data
onMounted( async () => {
        loadingOverlay.value = true
        await fecthTicket()
})

// fetching data
const fecthTicket = async () => {
    await axios.post( `${urlHostApi}tiket-api/api/ticket/detail`, {
        id : yourTicket.value,
    }, {
    headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
    }
    })
    .then( res => {
        tickets.value = res.data.data
        show_kode_key_temp.value = res.data.data.kode_unik
        show_nama.value = res.data.data.nama
        show_telepon.value = res.data.data.telepon
        show_email.value = res.data.data.email
        show_countReg.value = res.data.data.tiket_reg
        show_countVip.value = res.data.data.tiket_vip
        show_total.value = res.data.data.total

        yourCode.value = show_kode_key_temp.value.slice(-12)
        setTimeout(() => {
            loadingOverlay.value = false
        }, 1000)
        
        // console.log('first load data',{
        //     'per' : perPage.value,
        //     'page' : currentPage.value,
        //     'pages' : pages.value,
        //     'total' : totalData.value,
        //     'search' : searchField.value,
        // })
    })
    .catch( err => {
        console.log({
            message : err.message || "some error while retreiving category data.",
            msg : `error fetch products process`
        })
    });
}

const goPrint = async () => {
    loadingOverlay.value = true
    await exportToPDF(`PAID-${yourCode.value}.pdf`,  pdfSection.value as HTMLElement)
    .then(() => {
        show_kode_key_temp.value = ''
        show_nama.value = ''
        show_telepon.value = ''
        show_email.value = ''
        show_countReg.value = 0
        show_countVip.value = 0
        show_total.value = 0
        setTimeout(() => {
            loadingOverlay.value = false, navigateTo('/getyourticket/gogogo')
        }, 2000)
        
    })
}



</script>

<style scoped>

</style>