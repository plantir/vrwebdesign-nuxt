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
    label {
      cursor: pointer;
    }
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
      flex: 0 0 30%;
      padding: 8px;
    }
    .image-wrapper {
      margin: 8px;
      // width: 150px;
      // flex: 0 0 150px;
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
    .button-wrapper {
      margin: 0 8px;
      .set-default {
        position: relative;
        top: 0;
        bottom: 0;
        margin: auto;
        font-size: 0.775rem;
        left: 0;
        right: 0;
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
        <div class="image-wrapper">
          <v-icon @click="remove_image(index)" color="#fff">la-close</v-icon>
          <v-icon v-if="set_default && image.is_default" color="#fff">la-check-circle</v-icon>
          <img v-if="is_object" :src="image[image_src]" alt />
          <img v-else :src="image" alt />
        </div>
        <div v-if="set_default" class="button-wrapper">
          <v-btn
            class="set-default"
            @click="set_default_image(image)"
            color="primary"
            outlined
            block
          >انتخاب به عنوان عکس اصلی</v-btn>
        </div>
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
    multiple: {
      default: false
    },
    upload_url: {
      default: process.env.UPLOAD_URL || '/api/upload'
    },
    is_object: {
      default: false
    },
    image_src: {
      default: 'src'
    },
    set_default: {
      default: false
    },
    errorMessage: {},
    imageCropAspectRatio: {
      default: '1:1'
    }
  },
  data() {
    return {
      label: 'عکس خود را بکشید و رها کنید'
    }
  },
  methods: {
    handleFilePondInit(err, file) {
      if ((<any>this).multiple) {
        if ((<any>this).is_object) {
          (<any>this).images.push({ [(<any>this).image_src]: file.serverId })
        } else {
          (<any>this).images.push(file.serverId)
        }
        this.$emit('input', (<any>this).images)
      } else {
        if ((<any>this).is_object) {
          (<any>this).images.splice(0, 1, { [(<any>this).imgae_src]: file.serverId })
        } else {
          (<any>this).images.splice(0, 1, file.serverId)
        }
        this.$emit('input', (<any>this).images[0])
      }
    },
    remove_image(index) {
      if ((<any>this).multiple) {
        (<any>this).images.splice(index, 1)
        this.$emit('input', (<any>this).images || [])
      } else {
        (<any>this).images = []
        this.$emit('input', null)
      }
      let pond = this.$refs.pond as Vue & { removeFile(index: number): void }
      pond.removeFile(index)
    },
    set_default_image(image) {
      (<any>this).images.map(item => {
        item.is_default = false
      })
      image.is_default = true
    }
  },
  computed: {
    images: {
      get() {
        if ((<any>this).multiple) {
          return (<any>this).value || []
        } else {
          return [(<any>this).value]
        }
      },
      set(value) {
        return value
      }
    }
  }
})
</script>