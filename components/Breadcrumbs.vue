<template>
  <div class="breadcrumbs fs-6">
    <ol vocab="http://schema.org/" typeof="BreadcrumbList">
      <li property="itemListElement" typeof="ListItem">
        <nuxtLink property="item" typeof="WebPage" to="/">
          <span property="name">BeerFinda</span>
        </nuxtLink>
        <meta property="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
      >
        <nuxtLink property="item" typeof="WebPage" :to="crumb.path">
          <span property="name">{{
            $route.fullPath === crumb.path && title !== null
              ? title
              : crumb.title
          }}</span>
        </nuxtLink>
        <meta property="position" :content="index + 2" />
      </li>
    </ol>
  </div>
</template>

<script>
import { startCase, camelCase } from 'lodash'
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: startCase(camelCase(param.replace(/-/g, ' '))),
            ...match,
          })
        }
      })
      return crumbs
    },
  },
}
</script>

<style scoped>
.breadcrumbs {
  font-size: 0.9rem !important;
}
ol {
  list-style: none;
}
li {
  display: inline;
}
li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}
li:last-child:after {
  content: '';
}
li a {
  color: black;
}
li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
</style>