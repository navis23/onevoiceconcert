<template>
    <div class="px-4 md:px-10 lg:px-20 xl:px-32 bg-gray-50 min-h-screen">
        <Loading v-if="loadingOverlay" />
        <!-- navbar -->
        <div class="flex justify-between items-center py-2">
            <h1 class="text-xl md:text-3xl font-bold tracking-tighter uppercase">dear <span class="text-sky-800">dreams</span> concert</h1>
            <h1 class="text-xl md:text-3xl font-bold tracking-tighter uppercase">Admin area</h1>
        </div>

        <!-- top bar -->
        <div class="flex items-center justify-between py-5" >
            <div>
                <h1 class="text-2xl font-semibold leading-relaxed text-gray-800 ">
                    Data Order Tiket
                </h1>
            </div>
        </div>

        <!-- filter and search -->
        <div class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
            <div class="w-52 flex justify-center items-center">
                <button @click="searchData(1, totalData, searchField)" class="flex gap-x-1 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                    <Icon name="ph:list-magnifying-glass" class="text-lg lg:text-2xl" />
                    <span class="text-sm font-medium">Cari by Email</span>
                    <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                </button>
            </div>
            <div class="w-full flex items-center">
                <FormKit
                type="search"
                placeholder="Cari berdasarkan nama produk disini . . . "
                v-model="searchField" 
                @keydown.enter="searchData(1, totalData, searchField)" 
                @keydown.tab="searchData(1, totalData, searchField)"
                @blur="searchData(1, totalData, searchField)"
                :classes = "{
                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center w-full focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded',
                    outer :'$reset w-full pr-6 pl-3 formkit-outer formkit-disabled:opacity-50',
                    input : '$reset formkit-input appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base text-gray-100 placeholder-gray-400'
                }"
            />
            </div>
            
        </div>

        <!-- table -->
        <div class="overflow-auto py-6">
            <table class="w-full bg-slate-100">
                <thead>
                    <tr class="text-sm font-medium border-b-4 border-gray-50 bg-gray-200">
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">KODE ORDER</td>
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">DETAIL PEMESAN</td>
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">STATUS</td>
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">DETAIL TIKET</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">TOTAL</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tickets" :key="index" class="border-b-4 border-stone-50">
                        <td class="p-4 whitespace-normal w-32">
                            
                            <p class="font-semibold text-sm pb-2">
                                {{ item.kode_tiket }}
                            </p>
                            <p class="pb-1 text-xs">Kode Order :</p>
                            <p class="text-xs font-semibold uppercase">
                                {{ item.kode_unik.slice(-12) }}
                            </p>
                        </td>

                        <td class="p-4 whitespace-nowrap">
                            <div class="flex flex-col gap-y-1">
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:user-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-bold text-base">
                                        {{ item.nama }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:phone-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-semibold text-sm">
                                        {{ item.telepon }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:envelope-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-semibold text-sm">
                                        {{ item.email }}
                                    </h3>
                                </div>
                            </div>
                        </td>

                        <td class="p-4 whitespace-nowrap">
                            <div class="pb-3">
                                <span class="text-xs py-1 px-3 font-bold rounded-md uppercase" :class="item.status == 'unpaid' ? 'bg-red-200 bg-opacity-30 text-red-700' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                    {{ item.status }}
                                </span>
                            </div>
                            <div>
                                <p class="text-xs">Tanggal Order :</p>
                                <span class="text-xs font-semibold" >
                                    <ClientOnly>
                                        {{ new Date(item.updatedAt).toLocaleString('id-ID') }}
                                    </ClientOnly>
                                </span>
                            </div>
                        </td>
                        
                        <td class="p-4 whitespace-nowrap">
                            <div class="flex flex-col gap-y-3">
                                <div v-if="item.tiket_reg != 0" class="flex justify-between gap-x-1 text-xs font-semibold">
                                    <p>
                                        <span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ item.tiket_reg }}</span> tiket REG <span class="text-gray-500 italic">@125,000</span>
                                    </p>
                                    
                                </div>

                                <div v-if="item.tiket_vip != 0" class="flex justify-between gap-x-1 text-xs font-semibold">
                                    <p>
                                        <span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ item.tiket_vip }}</span> tiket VIP <span class="text-gray-500 italic">@150,000</span>
                                    </p>
                                    
                                </div>
                                
                            </div>
                        </td>

                        <td class="p-4 whitespace-nowrap text-center">
                            <span class="text-sm py-1 px-3 font-semibold rounded-md bg-gray-800 text-white" >
                                <ClientOnly>
                                    IDR {{ item.total.toLocaleString() }}
                                </ClientOnly>
                            </span>
                        </td>

                        <td class="py-2 px-4 whitespace-nowrap text-center">
                            <div class="flex flex-col gap-2 items-center justify-center">
                               
                                <button v-if="item.status == 'paid'" @click="openModalNota(item)" class="w-36 flex items-center justify-center gap-x-1 py-3 pl-3 pr-4 text-sm font-semibold rounded-md bg-emerald-200 bg-opacity-30 text-emerald-700 hover:bg-opacity-60">
                                    <Icon name="ph:eye-bold" class="text-sm lg:text-lg" />
                                    <span>Lihat Nota</span>
                                </button>

                                <button v-if="item.status == 'unpaid'" @click="openModalUpdate(item)" class="w-36 flex items-center justify-center gap-x-1 py-3 pl-3 pr-4 text-sm font-semibold rounded-md bg-yellow-200 bg-opacity-30 text-yellow-700 hover:bg-opacity-60">
                                    <Icon name="ph:pencil-simple-line-bold" class="text-sm lg:text-lg" />
                                    <span>Update Order</span>
                                </button>
                                
                            </div>
                        </td>
                        
                    </tr>
                </tbody>  
            </table>
            <!-- if empty data -->
            <div v-if="tickets.length == 0" colspan="6" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                <span class="font-medium"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                <span class="font-medium">Data tidak ditemukan </span>
            </div>  

            <!-- total data -->
            <div class="flex justify-between items-start pt-4 pb-2">
                <div class="flex items-center">
                    <p class="text-sm">
                        <span class="font-semibold text-sky-600  ">{{ currentPage }}</span> / {{ pages }} pages <span class="text-white bg-gray-800 rounded-lg text-xs font-semibold px-2 py-1 "> {{ totalData }} data </span>
                    </p>
                </div>
                <FormKit
                    v-model="optionPages"
                    @change="clickPage(1, optionPages, searchField)"
                    type="select"
                    :classes="{
                        inner : '$reset formkit-inner border formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex  items-center rounded-lg'
                    }"
                    :options="[
                        { label: '10', value: 10, },
                        { label: '25', value: 25, },
                        { label: '50', value: 50, },    
                        { label: '75', value: 75 },
                        { label: '100', value: 100, }
                    ]"
                />
            </div>

            <!-- pagination -->
            <div class="flex gap-x-3 justify-center">
                <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600"  @click="clickPage(1, optionPages, searchField)">
                    <Icon name="carbon:chevron-left" size="28" />
                </button>
                <button v-for="page in displayPages" class="flex items-center justify-center w-8 h-8 font-medium rounded-full" :class="page == currentPage ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-sky-600'" @click="clickPage(page, optionPages, searchField)">
                    {{ page }}
                </button>
                <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600" @click="clickPage(pages, optionPages, searchField)">
                    <Icon name="carbon:chevron-right" size="28" />
                </button>
            </div>
        </div>

        <!-- modal update -->
        <div v-if="modalUpdate" class="fixed top-0 left-0 w-full h-screen">
            <div class="relative flex flex-col items-center justify-center" >
                <div class="absolute -z-10 h-screen top-0 w-full bg-gray-800 rounded opacity-90" />
                <!-- invoice section -->
                <div class="p-2">
                    <div class="flex flex-col justify-center items-center w-[25rem] md:w-[30rem] h-screen">
                        <h2 class="text-3xl tracking-tight font-bold uppercase pb-2 text-center text-sky-200 drop-shadow-lg">update status bayar </h2>
                        <div class="flex flex-col items-center w-full mt-1 bg-white px-3 py-6 rounded">
                            <div class="flex flex-col gap-y-1 pb-3">
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:user-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-bold text-base">
                                        {{ nama }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:phone-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-semibold text-sm">
                                        {{ telepon }}
                                    </h3>
                                </div>
                                <div class="flex items-center gap-x-1">
                                    <Icon name="ph:envelope-bold" class="text-sm lg:text-lg" />
                                    <h3 class="font-semibold text-sm">
                                        {{ email }}
                                    </h3>
                                </div>
                            </div>
                            <p class="text-sm font-bold pb-2">Apakah pemesan sudah melakukan pembayaran?</p>
                            <p class="text-sm pb-2">Jika sudah klik <span class="font-bold ">sudah terbayar</span> untuk merubah status order tiket.</p>
                            <p class="text-sm">Nota pembayaran akan terkirim ke email pemesan.</p>
                        </div>
                        <div class="flex gap-3 pt-6">
                            <button @click="closeModalUpdate()" class="flex items-center justify-center gap-x-1 rounded font-bold text-xs bg-gray-400 text-gray-100 pr-3 pl-2 py-3 uppercase">
                                <Icon name="ph:arrow-bend-double-up-left-bold" class="text-sm lg:text-2xl text-gray-100" />
                                keluar
                            </button>
                            <button @click="updateStatusPaid()" class="flex items-center justify-center gap-x-1 rounded font-bold text-xs bg-blue-500 text-gray-100 pr-3 pl-2 py-3 uppercase">
                                <Icon name="ph:calendar-check-bold" class="text-sm lg:text-2xl text-gray-100" />
                                sudah terbayar
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>

        <!-- modal view nota -->
        <div v-if="paidStatusCheck" class="fixed top-0 left-0 w-full h-screen">
            <div class="relative flex flex-col items-center justify-center h-screen" >
                <div class="absolute -z-10 h-screen top-0 w-full bg-gray-800 rounded opacity-90" />
                <!-- invoice section -->
                    <!-- invoice section -->
                    <div class="p-2 pb-8" ref="pdfSection">
                        <div class="flex flex-col w-[25rem] md:w-[27rem]">
                            <div class="flex justify-start items-center mb-1 bg-white border-2 p-2 rounded">
                                <p class="text-xs font-semibold tracking-tight uppercase">
                                    {{ kode_key_temp }}
                                </p>
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
                                        Jenis Tiket
                                    </h3>
                                </div>
                                <div class="flex gap-4 mt-10">
                                    <div v-if="countReg != 0" class="flex justify-between gap-x-1 pb-3 text-sm font-semibold">
                                        <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countReg }}</span> tiket REG </p>
                                    </div>
        
                                    <div v-if="countVip != 0" class="flex justify-between gap-x-1 pb-3 text-sm font-semibold">
                                        <p class="text-xs"><span class="text-xs py-1 px-2 font-bold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">{{ countVip }}</span> tiket VIP</p>
                                    </div>
                                    
                                </div>
                            </div>
        
                            <div class="flex items-center justify-between mt-1 bg-white border-2 p-2 rounded">
                                <p class="font-bold text-sm uppercase">total</p>
                                <p class="font-bold text-sm uppercase">IDR {{ total.toLocaleString() }}</p>
                            </div>
                            <div class="flex flex-col items-center justify-center mt-1 bg-white border-2 p-2 rounded">
                                <p class="text-sm">URL Link download Bukti Bayar untuk Pembeli</p>
                                <a :href="`${urlHostWebsite}getyourticket/${id_transaksi}`" target="_blank" class="text-xs text-center py-2 italic font-semibold underline text-blue-600">{{ urlHostWebsite }}getyourticket/{{ id_transaksi }}</a>
                            </div>
        
                            <div class="flex flex-col items-center mt-1 bg-white border-2 p-2 rounded">
                                <p class="text-base font-bold pb-2">STATUS PAID / TERBAYAR</p>
                            </div>

                            <div v-if="emailSended" class="flex flex-col items-center mt-1 bg-white border-2 p-2 rounded">
                                <p class="text-base font-bold pb-2">Email Berhasil Terkirim</p>
                            </div>
                            
                        </div>
                    </div>
                    <div class="flex justify-end gap-3">
                        <button  @click="closeModalNota()" class="flex items-center justify-center gap-x-1 rounded font-bold text-sm bg-gray-400 text-gray-100 shadow-md pr-3 pl-2 py-3 uppercase">
                            <Icon name="ph:arrow-bend-double-up-left-bold" class="text-sm lg:text-2xl text-gray-100" />
                            Keluar
                        </button>
                        <button v-if="!hideAfterSendEmail" @click="sendEmailPaid()" class="flex items-center justify-center gap-x-1 rounded font-bold text-sm bg-blue-500 text-gray-100 shadow-md pr-3 pl-2 py-3 uppercase">
                            <Icon name="ph:paper-plane-tilt-bold" class="text-sm lg:text-2xl text-gray-100" />
                            Kirim Email
                        </button>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import emailjs from '@emailjs/browser';

useHead({
  title: 'Admin Area One Voice',
  
})

// default API url set
const urlHostApi = 'https://onevoice-api.enterbiner.com/'
const urlHostWebsite = 'https://onevoiceconcert.vercel.app/'

// mounted first data
onMounted( async () => {
        loadingOverlay.value = true
        await fecthTicket()
})

const loadingOverlay = ref(false)
const searchField = ref('');
const perPage = ref(0);
const currentPage = ref(0);
const pages = ref(0);
const totalData = ref(0);
const optionPages = ref(10);
const numShown = ref(5)

const modalUpdate = ref(false)
const paidStatusCheck = ref(false)

const emailSended =ref(false)
const hideAfterSendEmail = ref(false)

const yourCode = computed(() => {
    return kode_key_temp.value.slice(-12)
})



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

// fetching data
const fecthTicket = async () => {
    await axios.post( `${urlHostApi}tiket-api/api/ticket/daftar`, {}, {
    headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
    }
    })
    .then( res => {
        tickets.value = res.data.data
        perPage.value = res.data.limit
        currentPage.value = parseInt(res.data.page)
        pages.value = Math.ceil(res.data.total_data/perPage.value)
        totalData.value = parseInt(res.data.total_data)
        searchField.value = res.data.search
        setTimeout(() => loadingOverlay.value = false, 500)
        
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


// function page
// trigger function to fetch data table paginate and search
const clickPage = async (page : any, optionPages : any, search : any) => {
        await axios.post( `${urlHostApi}tiket-api/api/ticket/daftar?page=${page}&limit=${optionPages}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            tickets.value = res.data.data
            perPage.value = res.data.limit
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search

        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    const searchData = async  ( page = 1, total : any, search : any) => {
        if(search == '') page = 1, total = 10, optionPages.value = 10
        await axios.post( `${urlHostApi}tiket-api/api/ticket/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            tickets.value = res.data.data
            perPage.value = parseInt(res.data.limit)
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search
            optionPages.value = 10
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    // setting for paginate function
    const scrollTop = () => {
        let currentScroll = document.documentElement.scrollTop
        let int = setInterval(frame, 6)

        function frame() {
            if(0 > currentScroll)
                clearInterval(int)
            else {
                currentScroll = currentScroll - 12
                document.documentElement.scrollTop = currentScroll
            }
        }
    }

    const displayPages = computed (() => {
        const showNumber = Math.min(numShown.value, pages.value);
        let first = currentPage.value - Math.floor(showNumber / 2);
        first = Math.max(first, 1);
        first = Math.min(first, pages.value - showNumber + 1);
        return [...Array(showNumber)].map((k,i) => i + first);
    })

    const openModalUpdate = async (item : any) => {
        id_transaksi.value = item.id
        nama.value = item.nama
        email.value = item.email
        telepon.value = item.telepon
        modalUpdate.value = true
    }

    const openModalNota = async (item : any) => {
        id_transaksi.value = item.id
        kode_key_temp.value = item.kode_unik
        total.value = item.total
        countReg.value = item.tiket_reg
        countVip.value = item.tiket_vip
        nama.value = item.nama
        email.value = item.email
        telepon.value = item.telepon
        paidStatusCheck.value = true
        hideAfterSendEmail.value = false
        emailSended.value = false
    }

    const closeModalUpdate = async () => {
        id_transaksi.value = ''
        nama.value = ''
        email.value = ''
        telepon.value = ''
        modalUpdate.value = false
    }

    const closeModalNota = async () => {
        id_transaksi.value = ''
        kode_key_temp.value = ''
        countReg.value = 0
        countVip.value = 0
        total.value = 0
        nama.value = ''
        email.value = ''
        telepon.value = ''
        paidStatusCheck.value = false
        emailSended.value = false
    }

    const updateStatusPaid = async () => {
        await axios.post(`${urlHostApi}tiket-api/api/ticket/update`, {
            id : id_transaksi.value,
            status : 'paid'
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (res) => {
            await fecthTicket()
            id_transaksi.value = ''
            nama.value = ''
            email.value = ''
            telepon.value = ''
            modalUpdate.value = false
        })
        .catch( err => {
            console.log({error : err.message, msg : `error update process`})
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    }

    const sendEmailPaid = async () => {
        const linkNota = urlHostWebsite + 'getyourticket/' + id_transaksi.value
        loadingOverlay.value = true
        await emailjs.send('service_eca5s0n', 'template_1lmdifo', {
            nama : nama.value,
            email : email.value,
            message : linkNota
        }, 'alck6SHQ9HT-qHgD4')
        .then((result) => {
            emailSended.value = true
            hideAfterSendEmail.value = true
            console.log('SUCCESS!', result.text);
            setTimeout(() => loadingOverlay.value = false, 750)
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    }





</script>

<style scoped>

</style>