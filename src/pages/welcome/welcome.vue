
<template>
    <div>
      this is welcome page
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
<style lang="scss" src="./welcome.scss" scoped></style>
