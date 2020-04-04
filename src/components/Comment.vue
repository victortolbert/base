<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.by">
        {{ comment.by }}
      </router-link>
      {{ comment.time | timeAgo }} ago
    </div>
    <div class="text" v-html="comment.text" />
    <div v-if="comment.kids && comment.kids.length" class="toggle" :class="{ open }">
      <a @click="open = !open">{{
        open
          ? '[-]'
          : '[+] ' + pluralize(comment.kids.length) + ' collapsed'
      }}</a>
    </div>
    <ul v-show="open" class="comment-children">
      <comment v-for="id in comment.kids" :id="id" :key="id" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Comment',
  props: ['id'],
  data () {
    return {
      open: true,
    }
  },
  computed: {
    comment () {
      return this.$store.state.comments[this.id]
    },
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies'),
  },
}
</script>

<style>
.comment-children .comment-children {
  margin-left: 1.5em;
}
.comment {
  border-top: 1px solid #eee;
  position: relative;
}
.comment .by,
.comment .text,
.comment .toggle {
  font-size: 0.9em;
  margin: 1em 0;
}
.comment .by {
  color: #828282;
}
.comment .by a {
  color: #828282;
  text-decoration: underline;
}
.comment .text {
  overflow-wrap: break-word;
}
.comment .text a:hover {
  color: #f60;
}
.comment .text pre {
  white-space: pre-wrap;
}
.comment .toggle {
  background-color: #fffbf2;
  padding: 0.3em 0.5em;
  border-radius: 4px;
}
.comment .toggle a {
  color: #828282;
  cursor: pointer;
}
.comment .toggle.open {
  padding: 0;
  background-color: transparent;
  margin-bottom: -0.5em;
}
</style>
