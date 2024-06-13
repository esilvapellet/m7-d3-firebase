<template>
  <div class="usersView">
    <header class="py-3">
      <h2 class="text-center text-uppercase">Mantenedor usuarios</h2>
      <hr>
    </header>
    <main class="container">
      <FormComp />
      <hr class="py-2">
      <TableComp :users="users" />
    </main>
  </div>
</template>
<script>
import FormComp from '@/components/FormComp.vue'
import TableComp from '@/components/TableComp.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UsersView',
  components: {
    FormComp,
    TableComp
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    ...mapActions(["setUsers"])
  },
  mounted() {
    this.setUsers();
  },
}
</script>
<style scoped></style>
