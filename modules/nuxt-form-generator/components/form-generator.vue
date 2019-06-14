<style lang="scss">
#editItem {
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
    .form-section {
      h3 {
        display: block;
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0;
        margin: 1rem 0 1rem 0;
        color: #464457;
      }
      .form-group {
        display: flex;
        > label {
          flex: 0 0 25%;
          color: #646c9a;
          padding: 12px;
        }
        .v-input {
          font-size: 13px;
          &.v-input--is-focused {
            .v-input__slot {
              border-color: $primary-color !important;
            }
          }
          .v-input__slot {
            min-height: 38px;
            border-width: 1px !important;
            border-color: #e2e5ec !important;
            align-items: center;
          }
          .v-input__prepend-inner {
            margin-top: 6px;
          }
          .v-input__append-inner {
            margin-top: 6px;
          }

          .v-label {
            top: 7px;
            font-size: 13px;
          }
          input {
            margin-top: 0;
          }
        }
        .v-input--selection-controls {
          margin-top: 0;
          padding-top: 0;
          .v-label {
            top: 0;
          }
        }
        .v-messages {
          min-height: 18px;
        }
        .v-text-field__suffix {
          background: #f5f5f5;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -12px;
          min-width: 40px;
          border-radius: 4px 0 0 4px;
        }
      }
    }
  }
}
</style>

<template>
  <v-card id="editItem">
    <div sticky-container>
      <div v-sticky sticky-offset="offset" sticky-side="top" class="header">
        <div class="head-lable">
          <h3>{{custom_title}}</h3>
        </div>
        <div class="head-toolbar">
          <div class="btn-group">
            <v-menu offset-y attach bottom left min-width="180">
              <v-btn class="btn-dropdown" depressed color="info" slot="activator">
                <v-icon>la-angle-down</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="(item,index) in action_list"
                  @click="action(item.action)"
                  :key="index"
                >
                  <v-icon class="pl-2">{{item.icon}}</v-icon>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn @click="save" class="action-btn" depressed color="info">ذخیره</v-btn>
          </div>
          <v-btn flat color="accent" @click="goBack">
            <span>بازگشت</span>
            <v-icon class="pr-2">la-arrow-left</v-icon>
          </v-btn>
        </div>
      </div>
      <div ref="loaderWrapper" class="content">
        <v-layout row wrap>
          <v-flex xl3 lg2></v-flex>
          <v-flex xl6 lg8 xs12>
            <div class="form-section" v-for="(item, sectionIndex) in formData" :key="sectionIndex">
              <h3>{{item.title}}</h3>
              <template v-for="(field, fieldIndex) in item.rows">
                <component
                  v-if="field.model.includes('.')"
                  :key="fieldIndex"
                  :is="field.component || `form-controll-${field.type}`"
                  v-validate="field.validation"
                  :error-messages="errors.collect(field.model)"
                  :name="field.model"
                  :field="field"
                  v-model="form_item[field.model.split('.')[0]][field.model.split('.')[1]]"
                ></component>
                <component
                  v-else
                  :key="fieldIndex"
                  :is="field.component || `form-controll-${field.type}`"
                  v-validate="field.validation"
                  :name="field.model"
                  :error-messages="errors.collect(field.model)"
                  :field="field"
                  v-model="form_item[field.model]"
                ></component>
              </template>
            </div>
          </v-flex>
          <v-flex xl3 lg2></v-flex>
        </v-layout>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Sticky from 'vue-sticky-directive'
import FormControlls from './form-controlls/index'
import { setTimeout } from 'timers'
import { NuxtAxiosResource } from '~/modules/nuxt-axios/types'
import { NuxtLoaderElement } from '~/modules/nuxt-loader/types'
import { AxiosResponse } from 'axios'
interface ISaveFunction {
  renew_after?: boolean
  exit_after?: boolean
}
export default Vue.extend({
  directives: { Sticky },
  components: FormControlls,
  props: {
    title: {
      required: true,
      type: String
    },
    service: {
      required: true,
      type: Object as () => NuxtAxiosResource
    },
    formData: {
      required: true
    },
    item: {
      default: {},
      type: Object as () => any
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
      {
        icon: 'la-refresh',
        action: 'save & create',
        title: 'ذخیره و ساخت جدید'
      },
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
      form_item: { ...this.item },
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
        this.form_item = { ...value }
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
        return this.customExit(this.form_item)
      }
      if (this.beforeExit) {
        await this.beforeExit()
      }
      this.$loader.destroy()
      let current_route = <string>this.$router.currentRoute.name
      let name = current_route.split('-')[0]
      this.$router.push({ name })
    },
    async save({
      renew_after = false,
      exit_after = false
    }: ISaveFunction = {}) {
      if (this.beforeSave) {
        this.form_item = await this.beforeSave(this.form_item)
      }
      this.$validator
        .validateAll()
        .then(valid => {
          if (valid) {
            if (this.customSave) {
              return this.customSave(this.form_item, {
                renew_after,
                exit_after
              })
            }
            this.loader = this.$loader.show(this.$refs.loaderWrapper)
            let result: Promise<AxiosResponse<any>>
            if (this.form_item.id) {
              result = this.service.update(this.form_item.id, this.form_item)
            } else {
              result = this.service.save(this.form_item)
            }
            result
              .then(({ data, status }) => {
                this.form_item = data
                this.initItem = data
                this.$toast
                  .success()
                  .timeout(1000)
                  .showSimple('با موفقیت ذخیره شد')
                  .then(() => {
                    if (renew_after) {
                      if (this.$route.path.includes('create')) {
                        this.form_item = JSON.parse(
                          JSON.stringify(this.freezItem)
                        )
                      } else {
                        this.$router.push('create')
                      }
                    } else if (exit_after) {
                      this.goBack()
                    } else if (status == 201) {
                      let route = this.$route.path.replace(
                        'create',
                        this.form_item.id
                      )
                      this.$router.push(route)
                    }
                  })
              })
              .catch(err => {
                this.$toast.error().showSimple('خطایی رخ داده است')
              })
              .then(() => {
                this.loader.hide()
              })
          } else {
            const field = this.$validator.fields.find({
              id: (<any>this).errors.items[0].id
            })
            if (field) {
              this.$scrollTo(field.el, 1000, { offset: -150 })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async delete() {
      if (this.customDelete) {
        return this.customDelete(this.form_item)
      }
      if (this.beforeDelete) {
        await this.beforeDelete()
      }
      this.$dialog.confirm().then(() => {
        this.service
          .delete(this.form_item.id)
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
      let title = this.title.replace(/{{[a-z]+}}/g, p => {
        let param = p.replace(/{|}/g, '')
        return this.initItem[param]
      })
      return title
    }
  }
})
</script>