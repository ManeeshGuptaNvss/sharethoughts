<template>
 <div class="container">
   <div class="row">
     <div class="col-md-8 offset-md-2 mt-3">
       <textarea class="form-control" v-model="msg" id="hello" rows="6" placeholder="Share your thoughts here"></textarea>
     </div>
     <div class="col-md-4 offset-md-4">
        <button  v-if="loader" class="btn btn-success mt-3" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Updating...
        </button>
       <button v-else class="btn btn-success mt-3" v-on:click="addData">Share</button>
     </div>
   </div>
 </div>
</template>

<script>
// @ is an alias to /src
import firebase from '@/config/firebase.js'
export default {
  name: 'Home',
  components: {
  },
  data :() =>({
    msg:'',
    loader:false
  }),
  methods: {
    addData() {
      this.loader=true
      if(this.msg.length>0){
      let obj={
        msg: this.msg,
        date: new Date()
      }
      firebase.firestore.collection('thoughts').add(obj)
      .then((doc)=>{
        this.msg=''
        this.loader=false
        alert("Data Added")
      })
      .catch(e =>
       {console.log(e)
       this.loader=false
       })
      // console.log("button clicked")
      }
    else{
      this.loader=false
      alert('No data found')
    }
    }
  }
}
</script>
