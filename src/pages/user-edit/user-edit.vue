<template>
    <div>
      this is user-edit page
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
      return {

      }
  },
  computed: {
    ...mapState({
      projects: state => state.activity.projects,
    })
  },
  mounted(){

  },
  methods : {

  }
}
</script>
<style lang="scss" src="./user-edit.scss" scoped></style>
