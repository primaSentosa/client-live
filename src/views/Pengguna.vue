<template>
    <div class="overflow-auto"> 
          <v-card max-width="auto" tile flat class="my-5">
            <v-toolbar color="" flat height="60px" >
            <v-spacer></v-spacer>
              <h2>Pengguna</h2>
              <v-spacer></v-spacer>                                  
                <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm()"
                >
                Tambah Pengguna
                </v-btn>  
            </v-toolbar>
          </v-card>       
          
          <!-- tabel pengguna -->
           <v-simple-table
                fixed-header
                height="400px"
            >
                <template v-slot:default >
                <thead>
                    <tr>                     
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Username</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Email</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Role</h5>
                    </th>
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Action</h5>
                    </th>                                                            
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in allAdmin"
                    :key="item._id"
                    >
                    <td><h5>{{ item.username }}</h5></td>
                    <td><h5>{{ item.email }}</h5></td>
                    <td>
                        <b-badge variant="primary" class="lg" v-if="item.role === 'Admin'">ADMIN</b-badge> 
                        <b-badge variant="success" class="lg" v-if="item.role === 'Kasir'">KASIR</b-badge>          
                        <b-badge variant="warning" class="lg" v-if="item.role === 'Super'">SUPER</b-badge>     
                    </td>
                    <td>
                      <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openFormEdit(item)"
                      >
                      EDIT
                      </v-btn>  
                      <v-btn
                      style="margin-left: 10px;"
                      rounded
                      color="#a30606"
                      small
                      dark
                      @click.prevent="deleteAdmin(item._id)"
                      >
                      DELETE
                      </v-btn>                        
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>   
          <!-- tabel pengguna -->

          <!-- form Tambah Pengguna -->
            <v-dialog
            v-model="dialog"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Tambah Pengguna
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" md="10">
                        <v-text-field
                            v-model="username"
                            label="Username"    
                            outlined                        
                            clearable
                            v-on:keyup.enter="tambahItem()"
                        ></v-text-field>      
                    </v-col>
                    <v-col cols="12" md="10">
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            v-on:keyup.enter="tambahItem()"
                        ></v-text-field>      
                    </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="9">                  
                            <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Passoword"
                                hint="At least 6 characters"
                                counter
                                @click:append="show1 = !show1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">                  
                            <v-select
                            v-model="role"
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            label="Role"
                            required
                            ></v-select>
                        </v-col>                
                    </v-row>       
                </v-container>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                >
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="tambahItem()"
                >
                    Tambah
                </v-btn>
                </v-card-actions>
            </v-card>
            </b-overlay>
            </v-dialog>                 
          <!-- form Tambah Pengguna -->

    <!-- form edit user -->
    <v-dialog
    v-model="dialog2"
    width="1000"
    >      
      <v-card >
        <v-card-title class="text-h5 grey lighten-2 mb-4">
          Edit User
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" md="10">
                    <v-text-field
                        v-model="username"
                        label="Username"    
                        outlined                        
                        clearable
                        v-on:keyup.enter="editUser()"
                    ></v-text-field>      
                </v-col>
                <v-col cols="12" md="10">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        v-on:keyup.enter="editUser()"
                    ></v-text-field>      
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="9">                  
                  <b-button v-b-toggle.collapse-1 variant="outline-secondary">Reset Password</b-button>
                  <b-collapse id="collapse-1" class="mt-2">              
                    <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Passoword"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                  </b-collapse>                
                </v-col>
                <v-col cols="12" md="3">                  
                    <v-select
                    v-model="role"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Jabatan"
                    required
                    ></v-select>
                </v-col>                
            </v-row>                    
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog2 = false"
          >
            Batal
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editUser()"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>       
    <!-- form edit user -->             

    </div>
  
  </template>
  
  <script>
    import { mapActions, mapGetters } from 'vuex'
      import Swal from 'sweetalert2'
      import axios from 'axios'

  
    export default {
      data() {
        return {
            // search
            src:'',

            // form
            loading2:false,
            dialog: false,
            username:'',
            email:'',
            password:'',
            items: ['Kasir','Admin','Super'],
            role:'Kasir'    ,
            idTemp: '',
            
            dialog2: false,
            // rules
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            show1: false,
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 6 || 'Min 6 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            },                                                                              
        }
      },
        components:{

        },
        computed:{  
        ...mapGetters({
                allAdmin: 'admin/getAllItem',
                totalAdmin: 'admin/getTotalItem',
                loading: 'admin/getLoading',
            }),                 
            getRole(){
            return this.$store.state.userRole
            }  
        },    
        methods:{     
            ...mapActions({
                fetchAdmin: 'admin/fetchAction',
            }),         
            openForm(){
                this.username = ''
                this.email = ''
                this.password = ''
                this.dialog = true
            },
            tambahItem(){
                this.loading2 = true        
                axios({
                    url: `${this.$store.state.url}/user/admin/register`,
                    method: 'post',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:{
                        username :this.username,
                        email: this.email,
                        password: this.password,
                        role: this.role
                    }
                    })
                    .then(({data}) =>{
                        this.username = ''
                        this.email = ''
                        this.password = ''
                        this.role = 'Kasir'
                        this.loading2 = false      
                        this.fetchAdmin()                        
                    })
                    .catch(err=>{
                            this.loading2 = false
                            console.log()
                                Swal.fire({
                                icon: 'error',
                                title: 'isi data dengan lengkap !',
                                text: err.errors,
                                })                                 
                    })    

            },
            openFormEdit(item){
                this.username = item.username
                this.email = item.email                
                this.role = item.role
                this.idTemp = item._id
                this.dialog2 = true
            },                
            editUser(){
                if(this.password === ''){
                    this.password = '-'
                }
                this.loading2 = true        
                axios({
                    url: `${this.$store.state.url}/user/admin/${this.idTemp}`,
                    method: 'put',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:{
                        username :this.username,
                        email: this.email,    
                        password:this.password    ,                
                        role: this.role
                    }
                    })
                    .then(({data}) =>{
                        this.username = ''
                        this.email = ''
                        this.password = ''
                        this.role = 'Kasir'
                        this.loading2 = false      
                        this.fetchAdmin()   
                        this.dialog2 = false                     
                    })
                    .catch(err=>{
                            this.loading2 = false
                            console.log()
                            if(err.response.data.errors[0] === 'kode sudah terdaftar !'){
                                Swal.fire({
                                icon: 'error',
                                title: 'kode sudah terdaftar !',
                                text: err.errors,
                                })                        
                            }else{
                                Swal.fire({
                                icon: 'error',
                                title: 'isi data dengan lengkap !',
                                text: err.errors,
                                })         
                            }
                    })    
            },
            deleteAdmin(id){
                Swal.fire({
                    title: 'Apakah anda yakin akan menghapus?',
                    showDenyButton: true,
                    confirmButtonText: `Batal`,
                    denyButtonText: `Ya,Hapus`,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                            
                    } else if (result.isDenied) {
                        axios({
                        url: `${this.$store.state.url}/user/${id}`,
                        method: 'delete',
                        headers:{
                            token : localStorage.getItem('token')
                        }
                        })
                        .then((respone) =>{
                            if(this.src !== ''){
                                this.search()
                            }else{
                                this.fetchAdmin()       
                            }
                            Swal.fire('deleted!', '', 'success')
                        })                   
                    }
                })            
                }                 
            },
            watch:{
                            
            },
            created(){
            this.fetchAdmin()
            }      
    }
  </script>