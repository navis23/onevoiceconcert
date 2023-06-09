export const useTicketStore = defineStore('TicketStore', {
    state : () => ({
        tickets : [] as any[],
        id_transaksi: '',
        kode_transaksi: '',
        kode_key_temp: '',
        nama: '',
        telepon: '',
        email: '',
        countReg: 0,
        countVip: 0,
        total: 0,
        status: '',
        bukti_trf: ''
    }),
    getters : {

    },
    actions : {

    }
})