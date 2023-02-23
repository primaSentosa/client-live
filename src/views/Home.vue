<template>
  <div class="overflow-auto"> 
        <v-card max-width="auto" tile flat class="my-5">
          <v-toolbar color="" flat height="60px" >
          <v-spacer></v-spacer>
            <h2>Dashboard</h2>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>    
        <v-row class="m-4">
            <v-col
            cols="12"
            sm="4"
            >
            <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date1"
                    label="Tanggal Mulai"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="date1"
                @input="menu1 = false"
                ></v-date-picker>
            </v-menu>
            </v-col>            
            <v-col
            cols="12"
            sm="4"
            >
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date2"
                        label="Tanggal Akhir"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date2"
                    @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>              
            </v-col>   
            <v-col
              cols="12"
              sm="2">
              <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="getByDate()"
                >
                Cari
                </v-btn>  
            </v-col>         
        </v-row>      

        <!-- dashboard -->

        <Sales />
        <br />
        <Item />

        <!-- dashboard -->
  </div>

</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import Sales from '../components/Dashboard/sales.vue'
    import Item from '../components/Dashboard/item.vue'

  export default {
    data() {
      return {
        // search
        src: '',
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu2: false,
        loading: true,

      }
    },
    components:{
      Sales,
      Item
    },
    computed:{  
        getRole(){
          return this.$store.state.userRole
        }           
    },    
    methods:{                   
        getByDate(){
            this.src = ''
            this.loading = true
            axios({
                url: `${this.$store.state.url}/item/search/date/history?mulai=${this.date1}&akhir=${this.date2}`,
                method: 'get',
                headers:{
                    token : localStorage.getItem('token')
                }
            })      
                    .then(({data})=>{                       
                        this.allItem = data
                        this.loading = false
                    })
                    .catch(err=>{
                        console.log(err)
                    })            
        },                    
    },
    watch:{
                       
    },
    created(){
        this.getByDate()       
    }
  }
</script>