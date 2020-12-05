<template>
<div>
    <!-- Dashboard -->
    <div class="container" v-if="isAuth">
        <div class="row my-5" v-if="load">
            <div class="col-md-12">
                <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row mt-5">
            <div class="col-md-12">
                <p>{{userEmail}}||{{userUID}} </p>
                <button class="btn btn-info" v-on:click="logout" >Logout</button>
            </div>
            <div class="col-md-8 offset-md-2 col-sm-12" v-if="list.length >0">
                <p class="display-4">Here is a list of all shared thoughts</p>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Shared Thought</th>
                        <th scope="col">Date and Time</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <th scope="row">{{index+1}}</th>
                            <td>{{item.msg}}</td>
                            <td>{{item.date.toDate()}}</td>
                            <td><button type="button" class="btn btn-outline-danger btn-sm" v-on:click="deleteData(item.id)">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12 " v-else><p class="display-1">Oops!! No shared thoughts yet :(</p> </div>
        </div>         
    </div>
    <!-- Login Screen -->
    <div class="container" v-else>
        <div class="row">
            <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                <h1>Login Screen</h1>
                <input type="email" v-model="email" placeholder="Enter email" class="form-control my-3"/>
                <input type="password" v-model="password" placeholder="Enter Password" class="form-control my-3"/>
                <button v-on:click="login" class="btn btn-primary my-3">Login</button>

            </div>
        </div>
    </div>
</div>   
</template>
<script>
import firebase from '@/config/firebase.js'
export default {
    data: () =>({
        list:[],
        load:false,
        email:'',
        password:'',
        isAuth:false,
        userEmail:'',
        userUID:''
    }),
    mounted(){
        this.showdata();
        this.changeState()
    },
    methods: {
        logout(){
            console.log("logout Clicked")
            firebase.auth.signOut().then(() => {
                // Sign-out successful.
                console.log('User Logged Out!');
                }).catch(function(error) {
                // An error happened.
                console.log(error);
                });
            this.changeState()
        },
        login(){
            if(this.email.length>0 && this.password.length>0){
                firebase.auth.signInWithEmailAndPassword(this.email,this.password).catch((error)=> {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    alert(errorMessage)
                });
                this.changeState()
            }
            else{
                alert("Some fields are missing!")
            }
        },
        changeState(){
            firebase.auth.onAuthStateChanged((user) =>{
                    if (user) {
                        // User is signed in.
                        this.userEmail = user.email;
                        var emailVerified = user.emailVerified;
                        var photoURL = user.photoURL;
                        var isAnonymous = user.isAnonymous;
                        this.userUID = user.uid;
                        var providerData = user.providerData;
                        this.isAuth=true
                        // ...
                    } else {
                        // User is signed out.
                        this.isAuth=false
                    }
                    });
        },
        showdata() {
            this.load=true
            this.list=[]
            firebase.firestore.collection('thoughts').get().then(doc =>{
                this.load=false
                doc.forEach(dat =>{
                    let obj = dat.data()
                    obj['id']=dat.id
                    this.list.push(obj)
                })
            }).catch(e =>{
                this.load=false
                console.log(e)
            })
        },
        deleteData(id){
            if(confirm("Are you sure?")){
                firebase.firestore.collection('thoughts').doc(id).delete().then(()=>{
                    alert("delete Succesful")
                    this.showdata()
                }).catch(e =>{
                    console.log(e)
                })
            }

            console.log(id)
        }
    },
}
</script>
<style>
    tbody>tr:nth-child(even){
        background: linear-gradient(to right, rgb(51, 51, 51), rgb(221, 24, 24));
        color: white;
    }
</style>