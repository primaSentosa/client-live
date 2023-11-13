<template>
    <div class="container">
        <div class="col-12">
            <div class="main-bar border p-3">      
                <div class="grid border-bottom pb-3 d-flex justify-content-center">
                    <div style="margin-top:20px">
                        <h3>SUPPLIER</h3>
                    </div>
                </div>  

                <div class="row post-layout mt-3 ">
                    <div class="col-12 post-layout-center pt-2">
                        <div class="created">
                            <div class="by-user">
                                <p class="date">Nama : <span class="name"> {{data.nama}}</span></p>
                            </div>             
                            <div class="by-user">
                                <p class="date">No Telpon : <span class="name"> {{data.noHp}}</span></p>
                            </div>                                                         
                            <div class="by-user">
                                <p class="date">Alamat : <span class="name"> {{data.alamat}}</span></p>
                            </div>                                
                        </div>
                    </div>
                </div>
                <hr>

                <div style="margin-top:20px">
                    <v-tabs color="red accent-4" left >
                    <v-tab :href="History" @click="fetchHistory()">History Pembelian</v-tab>                                      

                    <!-- History -->
                    <v-tab-item :value="History" >                 
                        <!-- tabel pembelian -->
                        <v-simple-table
                                fixed-header
                                height="400px"
                            >
                            <template v-slot:default >
                            <thead>
                                <tr>
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Tanggal</h5>
                                </th>       
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Jam</h5>
                                </th>                                          
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Admin</h5>
                                </th>
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Customer</h5>
                                </th>
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Metode</h5>
                                </th>         
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Total Harga</h5>
                                </th>
                                <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                                    <h5>Item</h5>
                                </th>                                        
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="item in allData"
                                :key="item._id"
                                @click="openFormEdit(item)"
                                >           
                                <td>{{ item.tanggal }}</td>
                                <td>{{ item.jam }}</td>
                                <td>{{ item.admin.username }}</td>
                                <td>{{ item.customer.nama }}</td>
                                <td>
                                    <b-badge variant="success" class="lg" v-if="item.metode === 'Tunai'">TUNAI</b-badge>          
                                    <b-badge variant="danger" class="lg" v-if="item.metode === 'Bon'">BON</b-badge>    
                                </td>
                                <td>Rp {{ getRp( item.totalHarga) }}</td>
                                <td>
                                    <v-btn
                                    rounded                      
                                    small
                                    dark
                                    @click.prevent="openList(item.listItem)"
                                    >
                                    ALL ITEM
                                    </v-btn>  
                                </td>
                                
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>   
                        <!-- tabel pembelian -->
                    </v-tab-item>                
                    <!-- History -->
                    </v-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'



export default {
    name:'detailClub',
    components: {

    },
    computed: {
        isLogin(){
        return this.$store.state.isLogin
        },
        id(){
            return this.$store.state.userId
        }
    },
    data() {
        return {
            formEdit: false,
            data: '',             
            allItem: [],

        }
    },
    methods:{  
        onContext(ctx) {
            this.context = ctx
        },  
        changePosisi(pos){
            this.posisi = pos
        },  
        changeCat(cat){
            this.category = cat
        },     
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.onUpload()
        },        
        fetchClub(){
            axios({
                url: `https://server-live-d54d413311de.herokuapp.com/club/${this.$route.params.id}`,
                method: 'get',
                })
                .then(({data})=>{
                    this.data = data
                })
                .catch(err=>{
                    console.log(err)
                })
        },
       
    },
    created(){

    }

}
</script>

<style scoped>
label{
    font-weight:700;
}
.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 2.07692308rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.voting-container {
    position: relative;
    min-height: 150px;
}

.comments-headers .answer-count {
    font-weight: 500;
    color: #3c4146;
    font-size: 18px;
    margin-bottom: 0;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 15px;
  color: #9199a1;
}
.by-user .name {
  color: #cc0000;
}
/* .css-1hwy0bb:hover{
  transform: scale(1.05)
} */
.css-1hwy0bb {
    background: #fff;
    padding: 0 0.8% 3%;
    width: 20%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    border-radius: 5px; 
}
.css-1h1ufj {
    background-color: transparent;
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0px auto;
}
.css-1c0vu8l {
    position: relative;
    height: 0px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding-bottom: 100%;
    width: 100%;
    text-overflow: ellipsis;
    background: rgb(246, 246, 246);
    transition: box-shadow 0.25s ease 0s;
    overflow: hidden;
}
</style>