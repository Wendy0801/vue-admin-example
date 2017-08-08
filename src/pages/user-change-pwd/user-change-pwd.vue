<template>
    <div>
      this is user-change-pwd page
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
<style lang="scss" src="./user-change-pwd.scss" scoped></style>
