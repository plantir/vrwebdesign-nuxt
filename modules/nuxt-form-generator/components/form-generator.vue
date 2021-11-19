<style lang="scss">
#editItem {
  .sticky {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 64px !important;
    z-index: 5;
  }
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    border-bottom: 1px solid #ebedf2;
    background: #fff;
    h3 {
      margin: 0;
      padding: 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: #464457;
    }
    .head-toolbar {
      display: flex;
      align-items: center;
    }
    .btn-group {
      display: flex;
      position: relative;
      .v-menu__content {
        box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
        padding: 10px 0;
        .v-list__tile {
          height: 34px;
          font-size: 14px;
          .v-icon {
            font-size: 22px;
          }
        }
      }
      .action-btn {
        position: relative;
        &:after {
          display: block;
          content: ' ';
          border-left: 1px solid #ffffff;
          position: absolute;
          top: 3px;
          right: -1px;
          bottom: 3px;
          opacity: 0.3;
        }
      }
      .v-btn {
        margin: 0;
        border-radius: 0;
      }
      .btn-dropdown {
        padding: 0 8px;
        min-width: auto;
        border-right: 1px solid #fff;
        .v-icon {
          font-size: 14px;
        }
      }
    }
  }
  .content {
    padding: 25px;
    min-height: 400px;
  }
}
</style>

<template>
  <v-card ref="editItem" id="editItem">
    <div>
      <div class="header sticky">
        <div class="head-lable">
          <h3>{{ custom_title }}</h3>
        </div>
        <div class="head-toolbar">
          <div class="btn-group" v-if="withSave">
            <v-menu offset-y attach bottom left min-width="180">
              <v-btn class="btn-dropdown" depressed color="info" slot="activator">
                <v-icon>la-angle-down</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in action_list"
                  @click="action(item.action)"
                  :key="index"
                >
                  <v-icon class="pl-2">{{ item.icon }}</v-icon>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn @click="save" class="action-btn" depressed color="info">ذخیره</v-btn>
          </div>
          <v-btn flat color="accent" @click="goBack" v-if="withBack">
            <span>بازگشت</span>
            <v-icon class="pr-2">la-arrow-left</v-icon>
          </v-btn>
        </div>
      </div>
      <div ref="loaderWrapper" class="content">
        <v-layout row wrap>
          <v-flex lg2></v-flex>
          <v-flex lg8 xs12>
            <v-form-generator
              :form="form"
              v-model="initItem"
              :formData="formData"
              :minimal="minimal"
            ></v-form-generator>
          </v-flex>
          <v-flex lg2></v-flex>
        </v-layout>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import vFormGenerator from './v-form-generator'
import baseMixin from './base-mixin'
import { setTimeout } from 'timers'
import { NuxtAxiosResource } from '../../nuxt-axios/types'
import { NuxtLoaderElement } from '../../nuxt-loader/types'
import { AxiosResponse } from 'axios'
interface ISaveFunction {
  renew_after?: boolean
  exit_after?: boolean
}
export default Vue.extend({
  components: { vFormGenerator },
  props: {
    title: {
      type: String
    },
    service: {
      required: true,
      type: Object as () => NuxtAxiosResource
    },
    item: {
      require: true,
      default: {},
      type: Object
    },
    formData: {
      required: true
    },
    form: {
      default: () => {
        return {}
      }
    },
    minimal: {
      type: Boolean,
      default: false
    },
    loading: {},
    customSave: {
      type: Function
    },
    customExit: {
      type: Function
    },
    customDelete: {
      type: Function
    },
    beforeSave: {
      type: Function
    },
    beforeExit: {
      type: Function
    },
    beforeDelete: {
      type: Function
    },
    editUrl: {},
    withSave: {
      default: true
    },
    withBack: {
      default: true
    }
  },
  data() {
    let action_list = [
      { icon: 'la-save', action: 'save', title: 'ذخیره' },
      {
        icon: 'la-power-off',
        action: 'save & exit',
        title: 'ذخیره و خارج شدن'
      },
      // {
      //   icon: 'la-sync',
      //   action: 'save & create',
      //   title: 'ذخیره و ساخت جدید'
      // },
      { icon: 'la-arrow-left', action: 'back', title: 'بازگشت' }
    ]
    if (this.$route.params.id !== 'create') {
      action_list.splice(3, 0, {
        icon: 'la-trash',
        action: 'delete',
        title: 'حذف'
      })
    }
    return {
      initItem: this.item,
      freezItem: JSON.parse(JSON.stringify(this.item)),

      offset: { top: 64 },
      loader: <NuxtLoaderElement>(<unknown>null),
      action_list: action_list
    }
  },
  mounted() {
    if (this.loading) {
      this.loader = this.$loader.show(this.$refs.loaderWrapper)
    }
  },
  watch: {
    item: {
      handler: function(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) {
          return
        }

        this.initItem = { ...value }
      },
      deep: true
    },
    loading: function(value) {
      if (value) {
        this.loader = this.$loader.show(this.$refs.loaderWrapper)
      } else if (this.loader) {
        this.loader.hide()
      }
    }
  },
  methods: {
    async goBack() {
      if (this.customExit) {
        return this.customExit(this.item)
      }
      if (this.beforeExit) {
        await this.beforeExit()
      }
      this.$loader.destroy()
      return this.$router.go(-1)
    },
    async save({
      renew_after = false,
      exit_after = false
    }: ISaveFunction = {}) {
      if (this.beforeSave) {
        this.initItem = await this.beforeSave(this.initItem)
      }
      this.form
        .validate()
        .then(valid => {
          if (valid) {
            if (this.customSave) {
              return this.customSave(this.initItem, {
                renew_after,
                exit_after
              })
            }
            this.loader = this.$loader.show(this.$refs.loaderWrapper)
            let result: Promise<AxiosResponse<any>>
            if (this.initItem.id) {
              result = this.service.update(this.initItem.id, this.initItem)
            } else {
              result = this.service.save(this.initItem)
            }
            result
              .then(({ data, status }) => {
                this.$toast
                  .success()
                  .timeout(1000)
                  .showSimple('با موفقیت ذخیره شد')
                  .then(() => {
                    if (renew_after) {
                      if (this.$route.path.includes('create')) {
                        this.initItem = JSON.parse(
                          JSON.stringify(this.freezItem)
                        )
                        setTimeout(() => {
                          this.form.resetError()
                          this.$scrollTo(this.$refs.editItem, 1000)
                        }, 100)
                      } else {
                        this.$router.push('create')
                      }
                    } else if (exit_after) {
                      this.goBack()
                    } else if (status == 201) {
                      let route = this.$route.path.replace('create', data.id)
                      if (this.editUrl) {
                        route = this.editUrl.replace(/:[a-z]+/g, p => {
                          let param = p.replace(':', '')
                          return data[param]
                        })
                      } else {
                        let route = this.$route.path.replace('create', data.id)
                      }
                      this.$router.push(route)
                      this.initItem = data
                    } else {
                      this.initItem = data
                    }
                  })
              })
              .catch(err => {
                let msg
                try {
                  msg = err.response.data.message || err.response.data
                } catch (error) {
                  msg = 'خطایی رخ داده است'
                }
                this.$toast
                  .error()
                  .timeout(5000)
                  .showSimple(msg)
              })
              .then(() => {
                this.loader.hide()
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async delete() {
      if (this.customDelete) {
        return this.customDelete(this.initItem)
      }
      if (this.beforeDelete) {
        await this.beforeDelete()
      }
      this.$dialog.confirm().then(() => {
        this.service
          .delete(this.initItem.id)
          .then(res => {
            this.$toast
              .success()
              .timeout(1000)
              .showSimple('با موفقیت حذف شد')
              .then(() => {
                this.goBack()
              })
          })
          .catch(err => {
            this.$toast.error().showSimple('خطایی رخ داده است')
          })
      })
    },
    action(action_name) {
      switch (action_name) {
        case 'save':
          this.save()
          break
        case 'save & exit':
          this.save({ exit_after: true })
          break
        case 'save & create':
          this.save({ renew_after: true })
          break
        case 'delete':
          this.delete()
          break
        case 'back':
          this.goBack()
          break
        default:
          break
      }
    }
  },
  computed: {
    custom_title(): any {
      if (!this.title) {
        return null
      }
      let title = this.title.replace(/{{[a-z\.0-9_]+}}/g, p => {
        let param = p.replace(/{|}/g, '')
        let array_param = param.split('.')
        let title = this.initItem
        for (const param of array_param) {
          title = title[param]
        }
        return title
      })
      return title
    }
  }
})
</script>
