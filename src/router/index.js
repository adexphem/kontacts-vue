import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import EditMember from '@/components/EditMember';
import ViewMember from '@/components/ViewMember';
import NewMember from '@/components/NewMember';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-member',
      component: NewMember
    },
    {
      path: '/edit/:member_id',
      name: 'edit-member',
      component: EditMember
    },
    {
      path: '/view/:member_id',
      name: 'view-member',
      component: ViewMember
    }
  ]
});
