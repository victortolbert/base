<template>
  <RenderlessTagInput :tags="tags" @update="newTags => $emit('update', newTags)">
    <div slot-scope="{ tags, removeTag, removeButtonEvents, inputProps, inputEvents }" class="tag-input">
      <span v-for="tag in tags" :key="tag" class="tag-input-tag">
        <span>{{ tag }}</span>
        <button type="button" class="tag-input-remove" v-on="removeButtonEvents(tag)">
          &times;
        </button>
      </span>
      <input class="tag-input-text" placeholder="Add tag..." v-bind="inputProps" v-on="inputEvents">
    </div>
  </RenderlessTagInput>
</template>

<script>
import RenderlessTagInput from '@/components/RenderlessTagInput/RenderlessTagInput7'

export default {
  name: 'InlineTagInput',
  components: {
    RenderlessTagInput,
  },
  model: {
    prop: 'tags',
    event: 'update',
  },
  props: {
    tags: { required: true },
  },
  data () {
    return {}
  },
  methods: {},
}
</script>
