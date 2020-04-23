<style lang="scss">
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
      &.required:after {
        content: '*';
        margin-right: 4px;
        color: #e91e63;
      }
    }
    .v-input {
      font-size: 13px;
      &.v-input--is-focused {
        .v-input__slot {
          @if variable-exists(primary-color) {
            border-color: $primary-color !important;
          } @else {
            border-color: var(--v-primary-base) !important;
          }
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
    .v-text-field--outlined fieldset {
      border-color: #e2e5ec !important;
    }
  }
}
</style>

<template>
  <section>
    <div v-for="err in errors.items">
      <v-alert
        type="error"
        :value="true"
        transition="scale-transition"
        dismissible
        outline
      >{{ err.msg }}</v-alert>
    </div>
    <div class="form-section" v-for="(row, sectionIndex) in formData" :key="sectionIndex">
      <template v-if="!row.hide">
        <h3 v-if="row.title">{{ row.title }}</h3>
        <template v-for="(field, fieldIndex) in row.rows">
          <template v-if="!field.hide">
            <component
              v-if="field.model.includes('.')"
              v-validate="field.validation"
              v-model="
                item[field.model.split('.')[0]][field.model.split('.')[1]]
              "
              :autocomplete="field.browserAutocomplete || 'off'"
              :disabled="field.disabled"
              :readonly="field.readonly"
              :items="field.items"
              :error-messages="errors.collect(field.model)"
              :name="field.model"
              :placeholder="field.placeholder"
              :suffix="field.suffix"
              :label="minimal ? field.label : null"
              :append-icon="field.appendIcon"
              :prepend-icon="field.prependIcon"
              :multiple="field.multiple"
              :chips="field.chips"
              :return-object="field.returnObject"
              :outlined="!minimal"
              :single-line="!minimal"
              :ref="field.ref"
              :key="fieldIndex"
              :is="field.component || `vr-${field.type}`"
              :field="field"
              :minimal="minimal"
              :data-vv-as="field.label"
              :type="field.inputType"
              :hint="field.hint"
              @input="change_field(field)"
            ></component>
            <component
              v-else
              v-validate="field.validation"
              v-model="item[field.model]"
              :autocomplete="field.browserAutocomplete || 'off'"
              :disabled="field.disabled"
              :readonly="field.readonly"
              :items="field.items"
              :error-messages="errors.collect(field.model)"
              :name="field.model"
              :placeholder="field.placeholder"
              :suffix="field.suffix"
              :label="minimal ? field.label : null"
              :append-icon="field.appendIcon"
              :prepend-icon="field.prependIcon"
              :multiple="field.multiple"
              :chips="field.chips"
              :return-object="field.returnObject"
              :outlined="!minimal"
              :single-line="!minimal"
              :ref="field.ref"
              :key="fieldIndex"
              :is="field.component || `vr-${field.type}`"
              :field="field"
              :minimal="minimal"
              :data-vv-as="field.label"
              :type="field.inputType"
              :hint="field.hint"
              @input="change_field(field)"
            ></component>
          </template>
        </template>
      </template>
    </div>
  </section>
</template>
<script>
import FormControlls from './form-controlls/index'
export default {
  inject: ['$validator'],
  components: FormControlls,
  props: {
    form: {
      default: () => {
        return {}
      }
    },
    value: {
      require: true
    },
    minimal: {
      default: false
    },
    formData: {
      required: true
    }
  },
  data() {
    return {
      item: this.value
    }
  },

  watch: {
    value: {
      handler: function(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) {
          return
        }
        this.item = { ...value }
      },
      deep: true
    },
    item: {
      handler: function() {
        this.$emit('input', this.item)
      },
      deep: true
    }
  },
  created() {
    this.form.moveToFirstError = this.moveToFirstError
    this.form.validate = this.validate
    this.form.resetError = this.resetError
    this.form.setError = this.setError
  },
  methods: {
    moveToFirstError() {
      if (this.errors.items[0].id) {
        const field = this.$validator.fields.find({
          id: this.errors.items[0].id
        })
        if (field) {
          this.$scrollTo(field.el, 1000, { offset: -150 })
        }
      } else {
        this.$scrollTo('body', 1000, { offset: -150 })
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        // inja bayad ye gohi bokhoram
        this.$validator.validateAll().then(async valid => {
          if (this.$validator.errors.items.length) {
            this.$validator.errors.items[0].regenerate()
            this.form.moveToFirstError()
            resolve(false)
          } else {
            resolve(valid)
            if (!valid) {
              this.form.moveToFirstError()
            }
          }
        })
      })
    },
    resetError() {
      this.errors.clear()
    },
    setError(err) {
      this.errors.add(err)
    },
    change_field(field) {
      if (field.onChange) {
        field.onChange(this.item[field.model])
      }
    }
  }
}
</script>
