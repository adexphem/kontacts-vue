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
    <div class="loading" v-if="loading"></div>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'edit-member', params: {member_id: member_id}}"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
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
      notFound: { status: false },
      loading: false
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
            vm.position = doc.data().post;
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
      this.loading = true;
      db.collection("members")
        .where("member_id", "==", this.$route.params.member_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.loading = false;
            this.$router.push("/");
          });
        });
    }
  }
};
</script>
