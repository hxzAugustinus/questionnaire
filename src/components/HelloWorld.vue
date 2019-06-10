<template>
  <v-container>
    <div v-for="(item, index) in whatsNext" :key="index">
      {{item.text}}
    </div>
    <input v-bind:value='value' @input="$emit('input',$event.target.value)" />

    <component :is="otherCp"></component>

  </v-container>
</template>

<script>
export default {
  props: ['value', 'anBa'],
  data: () => ({
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }

    ],
    otherCp: 'a'
  }),
  methods: {
    test () {
      this.$emit('par', 1, { a: 1 })
    }
  },
}
</script>

<style>
</style>
