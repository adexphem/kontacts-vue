<template>
  <div id="view-member">
    <div class="content" v-show="notFound.status">Not Found</div>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Employee ID: {{member_id}}</li>
      <li class="collection-item">Employee Dept: {{dept}}</li>
      <li class="collection-item">Employee Post: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button class="btn red" @click="deleteMember">Delete</button>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-member",
  data() {
    return {
      member_id: null,
      dept: null,
      name: null,
      position: null,
      notFound: { status: false }
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("members")
      .where("member_id", "==", to.params.member_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.member_id = doc.data().member_id;
            vm.dept = doc.data().dept;
            vm.name = doc.data().name;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("members")
        .where("member_id", "==", this.$route.params.member_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.member_id = doc.data().member_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        })
        .catch(error => {
          this.notFound.status = true;
        });
    },
    deleteMember() {
      db.collection("members")
        .where("member_id", "==", to.params.member_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push("/");
          });
        });
    }
  }
};
</script>
