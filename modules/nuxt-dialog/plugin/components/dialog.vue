<style lang="scss">
.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
.dialog-wrapper {
  background: #fff;
  padding: 40px;
  width: 420px;
  max-width: 100%;
  border-radius: 4px;
  position: relative;
}
.dialog-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  .dialog-icon {
    display: flex;
    position: relative;
    box-sizing: content-box;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    margin: 1.25em auto 1.875rem;
    zoom: normal;
    border: 0.25em solid transparent;
    border-radius: 50%;
    line-height: 5rem;
    cursor: default;
    user-select: none;
    &:before,
    .v-icon {
      font-size: 3.75rem;
    }
    &.warning-icon {
      border-color: #facea8;
      color: #f8bb86;
      &:before {
        content: '!';
        margin-top: 8px;
      }
    }
    &.error-icon {
      border-color: #f27474;
      .v-icon {
        color: darken(#f27474, 20);
      }
    }
    &.success-icon {
      border-color: rgba(#a5dc86, 0.5);
      .v-icon {
        color: darken(#a5dc86, 20);
      }
    }
    &.info-icon {
      border-color: #9de0f6;
      color: #3fc3ee;
      &:before {
        content: 'i';
        margin-top: 8px;
      }
    }
    &.question-icon {
      border-color: #c9dae1;
      color: #87adbd;
      &:before {
        content: '؟';
        margin-top: 8px;
      }
    }
  }
}
.dialog-title {
  font-weight: 500;
  font-size: 1.175rem;
  color: #464457;
  margin: 0 0 1rem;
}
.dialog-message {
  color: #a7abc3;
  text-align: center;
}
.dialog-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 1.25rem auto 0;
}
.dialog-close {
  position: absolute;
  top: 8px;
  left: 8px;

  &:hover {
    color: #4b1897;
  }
}
.backdrop {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: -1;
}
</style>

<template>
  <section>
    <div v-for="dialog of dialogs" :key="dialog.id">
      <dialogWindow :dialog="dialog" @close="close" @hide="hide"></dialogWindow>
    </div>
  </section>
</template>

<script>
import dialogWindow from './dialog-window.vue'
export default {
  components: {
    dialogWindow
  },
  data() {
    return {
      data: {},
      dialogs: []
    }
  },
  methods: {
    commit(data) {
      this.data = data
      this.dialogs.push(data)
    },
    forceCloseAll() {
      this.dialogs.forEach((d, idx) => this.$delete(this.dialogs, idx))
    },
    hide({ dialog, data }) {
      dialog.show = false
      let dialogIndex = this.dialogs.findIndex(item => item.id == dialog.id)
      if (dialogIndex !== -1) {
        this.$delete(this.dialogs, dialogIndex)
      }
      this.data.resolve(data)
    },
    close({ dialog, data }) {
      dialog.show = false
      let dialogIndex = this.dialogs.findIndex(item => item.id == dialog.id)
      if (dialogIndex !== -1) {
        this.$delete(this.dialogs, dialogIndex)
      }
      this.data.reject(data)
    }
  }
}
</script>
