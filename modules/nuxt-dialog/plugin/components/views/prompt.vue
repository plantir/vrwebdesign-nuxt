<style lang="scss">
.alert-dialog {
  padding: 40px;
  width: 420px;
  max-width: 100%;
}
</style>
<template>
  <div class="alert-dialog" v-if="dialog">
    <div class="dialog-header">
      <div v-if="dialog.type == 'warning'" class="dialog-icon warning-icon"></div>
      <div v-if="dialog.type == 'info'" class="dialog-icon info-icon"></div>
      <div v-if="dialog.type == 'question'" class="dialog-icon question-icon"></div>
      <div v-if="dialog.type == 'error'" class="dialog-icon error-icon">
        <v-icon>la-times</v-icon>
      </div>
      <div v-if="dialog.type == 'success'" class="dialog-icon success-icon">
        <v-icon>la-check</v-icon>
      </div>
      <h2 v-if="dialog.title" class="dialog-title">{{ dialog.title }}</h2>
      <v-icon @click="$emit('close', 'close dialog')" class="dialog-close">la-times</v-icon>
    </div>
    <div class="dialog-content">
      <div class="form-section">
        <div class="form-group">
          <v-textField
            v-model="prompt"
            v-validate="'required'"
            :error-messages="errors.collect('prompt')"
            name="prompt"
            outline
            single-line
          ></v-textField>
        </div>
      </div>
    </div>
    <div class="dialog-actions">
      <v-btn color="info" tile class="mx-1" @click="$emit('hide', prompt)">
        {{
        dialog.ok_txt
        }}
      </v-btn>
      <v-btn
        color="grey darken-1"
        dark
        tile
        class="mx-1"
        @click="$emit('close', 'close dialog')"
      >{{ dialog.cancel_txt }}</v-btn>
    </div>
    <div class="dialog-footer"></div>
  </div>
</template>

<script>
export default {
  props: ['dialog'],
  data() {
    return {
      prompt: dialog.prompt
    }
  }
}
</script>
