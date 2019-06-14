<style lang="scss">
#vr-file-upload {
  width: 100%;
  border: 2px dashed #ebedf2;
  background: #fff;
  padding: 20px;
  margin-bottom: 34px;
  &.has-error {
    border-color: #ff5252;
  }
  .filepond--drop-label {
    cursor: pointer;
  }
  .filepond--root {
    margin: 0;
  }
  .filepond--panel-root {
    background: #fff;
  }
  .images {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin: 8px;
      width: 150px;
      flex: 0 0 150px;
      position: relative;
      i {
        position: absolute;
        left: 8px;
        top: 8px;
        &.la-check-circle {
          bottom: 25px;
          top: auto;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
        }
      }
      .v-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: 0.775rem;
        left: 0;
        right: 0;
        width: 130px;
      }
      img {
        max-width: 100%;
        border-radius: 12px;
      }
    }
  }
}
</style>

<template >
  <section id="vr-file-upload" :class="{'has-error':errorMessage.length}">
    <file-pond
      name="file"
      ref="pond"
      :server="upload_url"
      :allow-multiple="multiple"
      :labelIdle="label"
      :imageCropAspectRatio="imageCropAspectRatio"
      @processfile="handleFilePondInit"
    ></file-pond>
    <div class="images">
      <div v-for="(image, index) in images" :key="index">
        <v-icon @click="remove_image(index)" color="#fff">la-close</v-icon>
        <img :src="image" alt>
      </div>
    </div>
    <div class="error--text">{{errorMessage[0]}}</div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment-jalaali'
export default Vue.extend({
  props: {
    value: {},
    label: {
      default: 'عکس خود را بکشید و رها کنید'
    },
    multiple: {
      default: false
    },
    upload_url: {
      default: process.env.UPLOAD_URL || '/api/upload'
    },
    errorMessage: {},
    imageCropAspectRatio: {
      default: '1:1'
    }
  },
  data() {
    return {
      images: <String[]>this.value || []
    }
  },
  watch: {
    value: function(val) {
      if (!val) {
        let pond = this.$refs.pond as Vue & { removeFiles(): void }
        pond.removeFiles()
        this.images = []
        return
      }
      if (this.multiple) {
        this.images = val
      } else {
        this.images = [val]
      }
    }
  },
  methods: {
    handleFilePondInit(err, file) {
      if (this.multiple) {
        this.images.push(file.serverId)
        this.$emit('input', this.images)
      } else {
        this.images.splice(0, 1, file.serverId)
        this.$emit('input', this.images[0])
      }
    },
    remove_image(index) {
      if (this.multiple) {
        this.images.splice(index, 1)
        this.$emit('input', this.images || [])
      } else {
        this.images = []
        this.$emit('input', null)
      }
      let pond = this.$refs.pond as Vue & { removeFile(index: number): void }
      pond.removeFile(index)
    }
  }
})
</script>