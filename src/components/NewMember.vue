<template>
  <div id="new-member">
    <h3>New Member</h3>
    <div class="row">
      <form @submit.prevent="saveMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" ref="member_id" v-model="member_id" required readonly>
            <label>Member ID:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Fullname:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
            <label>Member Position:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label>Department:</label>
          </div>
        </div>
        <button type="submit" class="btn green large">Save</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
        <div class="loading" v-if="loading"></div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "new-member",
  data() {
    return {
      member_id: null,
      name: null,
      position: null,
      dept: null,
      loading: false
    };
  },
  created() {
    this.generateId();
  },
  mounted() {
    this.loading = true;
    if (this.member_id != null) this.loading = false;
    this.$refs.member_id.focus();
  },
  methods: {
    saveMember() {
      this.loading = true;
      db.collection("members")
        .add({
          member_id: this.member_id,
          post: this.position,
          dept: this.dept,
          name: this.name
        })
        .then(docRef => {
          this.$router.push("/");
          this.loading = false;
        })
        .catch(error => console.log("Error encountrered ", error));
    },
    generateId() {
      this.member_id =
        "_" +
        Math.random()
          .toString(36)
          .substr(5, 10);
    }
  }
};
</script>
