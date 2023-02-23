<template>
    <div class="overflow-auto"> 
        <v-card max-width="auto" tile flat class="my-5">
        <v-toolbar color="" flat height="60px" >
        <v-spacer></v-spacer>
            <h2>History Stok</h2>
            <v-spacer></v-spacer>
        </v-toolbar>
        </v-card>    
        <v-row class="m-4">          
            <v-col
            cols="12"
            sm="3"
            >
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="dateRangeText"
                        label="Tanggal"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date"
                    range
                    @input="closeCalender()"
                    ></v-date-picker>
                </v-menu>              
            </v-col>

            <v-col
            cols="12"
            sm="2"
            >

                <v-select
                :items="allMetode"
                v-model="metode"
                label="Status"
                outlined
                ></v-select>

            </v-col>   

            <v-col
            cols="12"
            sm="2">
            <v-btn
                rounded
                color="#04428D"
                small
                dark
                style="margin-top: 10px;"
                @click.prevent="fetchHistoryItem()"
                >
                Cari
                </v-btn>  
            </v-col>   

            <!-- search -->
            <v-col
            cols="12"
            sm="4"
            >     
                <v-text-field
                    solo
                    label="Kode/Nama Barang"
                    append-icon="mdi-magnify"
                    v-on:keyup.enter="search(1)"
                    class="mr-4 ml-4"
                    clearable
                    v-model="src"        
                ></v-text-field>
            </v-col>        
            <!-- search -->     

        </v-row>              
               

        <!-- tabel -->
        <template>
            <v-data-table
                :headers="dessertHeaders"
                :items="allData"
                :expanded.sync="expanded"
                item-key="name"
                show-expand
                class="elevation-1"
            >
                <template v-slot:item.admin="{ item }">
                    <p>{{item.admin.username}}</p>
                </template> 
                <template v-slot:item.item="{ item }">
                    <p v-if="item.item">{{item.item.nama}}</p>
                </template> 
                <template v-slot:item.action="{ item }">
                    <b-badge variant="success" class="lg" v-if="item.action === 'Laku'">LAKU</b-badge>          
                    <b-badge variant="warning" class="lg" v-if="item.action === 'Beli'">PEMBELIAN</b-badge>
                    <b-badge variant="danger" class="lg" v-if="item.action === 'Retur'">RETUR</b-badge>    
                </template>      
                <template v-slot:item.qty="{ item }">
                    <p style="font-weight: bold;" v-if="item.action === 'Laku'">- {{item.qty}}</p>          
                    <p style="font-weight: bold;" v-if="item.action === 'Beli'">+ {{item.qty}}</p>
                    <p style="font-weight: bold;" v-if="item.action === 'Retur'">- {{item.qty}}</p>    
                </template>                     
                <template v-slot:item.harga="{ item }">
                    <p>Rp {{getRp(item.harga)}}</p>
                </template>                                            
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <ul>
                            <li v-if="item.item">Kode_Barang : {{item.item.kodeBarang}}</li>
                            <!-- <li>Deskripsi : {{item.deskripsi}}</li> -->
                        </ul>
                    </td>
                </template>
            </v-data-table>
        </template>        
        <!-- tabel -->

    </div>
  
  </template>
  
  <script>
      import Swal from 'sweetalert2'
      import axios from 'axios'
  
    export default {
      data() {
        return {
            // search
            allMetode:['Laku','Beli','Retur','Semua'],
            metode:'Semua',
            src: '',
            date: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
            menu: false,
            loading: true,
            
            // data
            expanded: [],
            singleExpand: false,
            dessertHeaders: [
            { text: 'Tanggal', value: 'tanggal' },
            { text: 'Jam', value: 'jam' },
            { text: 'Admin', value: 'admin' },
            { text: 'Nama Item', value: 'item' },
            { text: 'Status', value: 'action' },
            { text: 'Qty', value: 'qty' },
            { text: 'Harga', value: 'harga' },
            { text: 'Deskripsi', value: 'data-table-expand'  },
            ],           
            allData:[],

            // list item
            dialog: false,
            fields:['KodeBarang','Item','Qty','Harga','Total'],
            items: [],    
        }
      },
      components:{

      },
      computed:{  
            dateRangeText () {
                return this.date.join(' ~ ')
            },        
            getRole(){
                return this.$store.state.userRole
            }           
      },    
      methods:{     
          closeCalender(){
            if(this.date.length === 2){
                this.menu = false
            }
          },           
          getRp(text){
            if(text){
                var number_string = text.toString()
                var sisa 	= number_string.length % 3,
                    rupiah 	= number_string.substr(0, sisa),
                    ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                        
                if (ribuan) {
                    text = sisa ? '.' : '';
                    rupiah += text + ribuan.join('.');
                }            
    
                return rupiah
            }
            },             
            formatRupiahEsc(angka){
                let al = "";
                if(angka=="" || angka==null || angka=="null" || angka==undefined){
                    al = "";
                } else {
                    al = Math.abs(angka.replace(/[^,\d]/g, '').toString());
                }
                return al;
            }, 
            openList(data){
                this.dialog = true
                this.items = data
            },
            fetchHistoryItem(){
                this.src = ''
                this.allData = []
                this.loading = true
                axios({
                    url: `${this.$store.state.url}/item/search/date/history?mulai=${this.date[0]}&akhir=${this.date[1]}`,
                    method: 'get',
                    headers:{
                        token : localStorage.getItem('token')
                    }
                })      
                        .then(({data})=>{                                    
                            console.log(data)                
                            this.allData = data
                            this.loading = false
                        })
                        .catch(err=>{
                            console.log(err)
                        })          
            },
            search(){
                this.allData = []
                this.loading = true                
                axios({
                    url: `${this.$store.state.url}/item/search/history?src=${this.src}`,
                    method: 'get',
                    headers:{
                        token : localStorage.getItem('token')
                    }
                })      
                        .then(({data})=>{                                    
              
                            this.allData = data
                            this.loading = false
                        })
                        .catch(err=>{
                            console.log(err)
                        })                
            }                          
      },
      watch:{
                         
      },
      created(){
        this.fetchHistoryItem()
      }
    }
  </script>