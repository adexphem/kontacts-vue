<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Member List</h4>
      </li>
      <li class="loading" v-if="loading"></li>
      <li v-for="member in member_list" v-bind:key="member.id" class="collection-item">
        <div class="chip">{{member.dept}}</div>
        {{member.name}}
        <router-link
          class="secondary-content view"
          v-bind:to="{name: 'view-member', params: {member_id: member.member_id}}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large green">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "dashboard",
  data() {
    return {
      member_list: [],
      loading: false
    };
  },
  created() {
    this.loading = true;

    db.collection("members")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            member_id: doc.data().member_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };

          this.loading = false;
          this.member_list.push(data);
        });
      })
      .catch(error => (this.loading = false));
  }
};
</script>

<style>
.view {
  background: #26a69a;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 10px;
  color: white;
  text-align: center;
  font-size: 12px;
}

.collection.with-header .collection-item {
  padding-left: 15px;
}
</style>
