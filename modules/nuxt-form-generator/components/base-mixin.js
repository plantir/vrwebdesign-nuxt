import Vue from 'vue'
import FormControlls from './form-controlls/index'
export default Vue.extend({
    inject: ['$validator'],
    components: FormControlls,
    props: {
        item: {
            require: true,
            default: {},
            type: Object 
        },
        formData: {
            required: true
        },
        minimal: {
          type: Boolean,
          default: false
        }
    },
    data() {
        return {
            form_item: { ...this.item }
        }
    },
    watch: {
        item: {
            handler: function (value, oldValue) {
                if (JSON.stringify(value) == JSON.stringify(oldValue)) {
                    return
                }
                this.form_item = { ...value }
            },
            deep: true
        }
    }
})