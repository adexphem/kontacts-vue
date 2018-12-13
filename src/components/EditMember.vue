<template>
  <div id="edit-member">
    <h3>Edit Member</h3>
    <div class="row">
      <form @submit.prevent="updateMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" ref="member_id" v-model="member_id" required readonly>
            <label class="active">Member ID:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label class="active">Fullname:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
            <label class="active">Member Position:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label class="active">Department:</label>
          </div>
        </div>
        <button type="submit" class="btn green large">Update</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
        <div class="loading" v-if="loading"></div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "edit-member",
  data() {
    return {
      member_id: null,
      dept: null,
      name: null,
      position: null,
      loading: false
    };
  },
  mounted() {
    this.loading = true;

    db.collection("members")
      .where("member_id", "==", this.$route.params.member_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.member_id = doc.data().member_id;
          this.name = doc.data().name;
          this.dept = doc.data().dept;
          this.position = doc.data().post;
          this.loading = false;
        });
      })
      .catch(error => console.log(error));
  },
  methods: {
    updateMember() {
      this.loading = true;

      db.collection("members")
        .where("member_id", "==", this.$route.params.member_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                name: this.name,
                post: this.position,
                dept: this.dept
              })
              .then(res => {
                this.loading = false;
                this.$router.push({
                  name: "view-member",
                  params: { member_id: this.member_id }
                });
              })
              .catch(error => console.log(error));
          });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
