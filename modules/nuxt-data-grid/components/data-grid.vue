<style lang="scss">
.expand-transition-enter-active,
.expand-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebedf2;
  min-height: 60px;
  align-items: center;
  position: relative;
  padding: 0 25px;
  .head-label {
    display: flex;
    align-items: center;
    h3 {
      margin: 0;
      padding: 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: #464457;
    }
    .v-icon {
      padding-left: 0.75rem;
      font-size: 1.675rem;
      color: #2c77f4;
    }
  }
}
.slash:after {
  content: '';
  width: 83%;
  height: 2px;
  background: #737373;
  position: absolute;
  transform: rotate(45deg) translate(-2px, -2px);
}
.toolbar {
  display: flex;
  align-items: center;
  .v-btn--icon {
    margin: 0;
  }
  .add-new {
    font-weight: 700;
  }
}

.data-table-search {
  overflow: hidden;
  transition: 0.2s;
  // display: flex;
  // flex-wrap: wrap;
  > div {
    padding: 25px;
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
}
.search-field {
  > div {
    padding: 25px;
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
}
.theme--light.v-table tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &:hover {
    background: rgba(200, 200, 200, 0.15);
  }
}
.v-pagination__navigation .v-icon {
  font-size: 1.675rem;
  font-weight: 300;
}
.v-table__overflow {
  overflow: initial;
}
.v-datatable thead th.column {
  font-weight: 700;
  font-size: 1rem;
  color: #6c7293 !important;
  &.sortable {
    padding: 0 8px;
  }
  &.active {
    color: $primary-color !important;
    i {
      color: $primary-color !important;
    }
  }
  i {
    color: #6c7293 !important;
    margin-left: 4px;
    margin-bottom: 4px;
  }
}

.footer-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 25px;
}
.page-size-wrapper {
  display: flex;
  align-items: center;
  div.item-size {
    margin-left: 30px;
    color: #646c9a;
  }
}
.page-size {
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.25rem;
  padding: 0.45rem 1rem;
  border-radius: 0 !important;
  border: 0 !important;
  color: #93a2dd !important;
  background: #f0f3ff;
  padding: 0 8px;
  min-height: 30px;
  display: flex;
  min-width: 60px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  i.v-icon {
    font-size: 14px;
  }
}
.page-size-item {
  font-size: 12px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  .more-action {
    position: relative;
    .v-btn {
      margin: 0;
    }
  }
  > * {
    margin: 0 3px;
  }
  .v-icon {
    color: #93a2dd !important;
    font-size: 1.475rem;
  }
  .v-btn {
  }
  .v-btn--icon:before {
    // display: none;
  }
}

.more-action-list {
  // .v-menu__content {
  //   box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
  //   padding: 10px 0;
  //   background: #fff;
  // }
  padding: 12px 0;
  .v-list__tile {
    height: 34px;
    font-size: 14px;
    color: #a7abc3;
    .v-icon {
      font-size: 22px;
      color: #a7abc3 !important;
    }
  }
}
</style>
<template>
  <div>
    <div class="head">
      <slot name="header">
        <div class="head-label">
          <v-icon>{{ title.icon }}</v-icon>
          <h3 class="head-title">{{ title.text }}</h3>
        </div>

        <div class="toolbar">
          <slot name="toollbar_right"></slot>
          <v-tooltip bottom v-if="withDateFilter">
            <template v-slot:activator="{ on }">
              <v-btn @click="showDateFilter = !showDateFilter" v-on="on" flat icon>
                <v-icon :class="{ slash: !showDateFilter }">la-calendar</v-icon>
              </v-btn>
            </template>
            <span>فیلتر زمان</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="resetFilter" v-on="on" flat icon>
                <v-icon>la-recycle</v-icon>
              </v-btn>
            </template>
            <span>حذف فیلتر ها</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="showFilter = !showFilter" v-on="on" flat icon>
                <v-icon :class="{ slash: !showFilter }">la-filter</v-icon>
              </v-btn>
            </template>
            <span>مخفی کردن فیلتر ها</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="refresh" v-on="on" flat icon>
                <v-icon>la-refresh</v-icon>
              </v-btn>
            </template>
            <span>تازه کردن اطلاعات</span>
          </v-tooltip>
          <v-tooltip bottom v-if="withRecycle">
            <template v-slot:activator="{ on }">
              <v-btn @click="recycle" v-on="on" flat icon>
                <v-icon
                  :color="
                    filter.some(item => item.includes('is_deleted'))
                      ? 'green'
                      : 'black'
                  "
                >restore_from_trash</v-icon>
              </v-btn>
            </template>
            <span>بازیابی رکوردها</span>
          </v-tooltip>

          <slot name="header_add">
            <v-btn v-if="withAdd" @click="_add" class="add-new" color="primary" round outline>
              <v-icon>add</v-icon>
              <span>ایجاد جدید</span>
            </v-btn>
          </slot>
          <slot name="toollbar_left"></slot>
        </div>
      </slot>
    </div>
    <div class="data-table-search">
      <transition
        name="fade"
        enter-active-class="fade-enter-active"
        leave-active-class="fade-leave-active"
      >
        <v-layout v-if="showDateFilter" row wrap>
          <slot name="dateFilters">
            <v-flex xs3 pa-2>
              <vr-date-picker
                hide-details
                single-line
                outline
                v-model="data_filters['created_at:>']"
                valueFormat="YYYY-MM-DD"
                label="تاریخ شروع"
              ></vr-date-picker>
            </v-flex>
            <v-flex xs3 pa-2>
              <vr-date-picker
                hide-details
                single-line
                outline
                v-model="data_filters['created_at:<']"
                :min="data_filters['created_at:>']||null"
                valueFormat="YYYY-MM-DD"
                label="تاریخ پایان"
              ></vr-date-picker>
            </v-flex>
          </slot>
        </v-layout>
      </transition>
      <slot name="filters">
        <transition
          name="fade"
          enter-active-class="fade-enter-active"
          leave-active-class="fade-leave-active"
        >
          <v-layout v-if="showFilter" row wrap>
            <v-flex xs3 v-if="withSearch">
              <v-text-field
                hide-details
                single-line
                outline
                v-model="search"
                append-icon="search"
                label="Search"
              ></v-text-field>
            </v-flex>
            <v-flex
              :class="`xs${item.size || 3}`"
              pa-2
              v-for="(item, index) in filters"
              :key="index"
            >
              <template v-if="item.type == 'select'">
                <v-select
                  single-line
                  hide-details
                  outline
                  v-model="data_filters[item.model]"
                  :items="item.items"
                  :prepend-inner-icon="item.icon"
                  :name="item.model"
                  :label="item.label"
                  :multiple="item.multiple"
                  :chips="item.chips"
                ></v-select>
              </template>
              <template v-else-if="item.type == 'date'">
                <vr-date-picker
                  hide-details
                  single-line
                  outline
                  v-model="data_filters[item.model]"
                  :prepend-inner-icon="item.icon"
                  :valueFormat="item.vlueFormate"
                  :format="item.format"
                  :name="item.model"
                  :label="item.label"
                ></vr-date-picker>
              </template>
              <template v-else>
                <v-text-field
                  hide-details
                  single-line
                  outline
                  v-model="data_filters[item.model]"
                  :prepend-inner-icon="item.icon"
                  :name="item.model"
                  :label="item.label"
                ></v-text-field>
              </template>
            </v-flex>
          </v-layout>
        </transition>
      </slot>
    </div>
    <div>
      <slot name="action-header"></slot>
    </div>
    <v-data-table
      :headers="custom_headers"
      v-model="selected"
      hide-actions
      :items="rows"
      :pagination.sync="pagination"
      :total-items="total_items"
      :loading="loading"
      :select-all="selectAll"
      :search="search"
    >
      <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
      <template v-slot:headers="props">
        <tr>
          <th width="5%" v-if="selectAll">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <template v-for="header in props.headers">
            <th
              v-if="header.sortable"
              :key="header.text"
              :width="header.width"
              :class="[
                'column sortable',
                pagination.descending ? 'desc' : 'asc',
                header.value === pagination.sortBy ? 'active' : '',
                header.align == 'right'
                  ? 'text-xs-right'
                  : header.align == 'left'
                  ? 'text-xs-left'
                  : 'text-xs-center'
              ]"
              @click="changeSort(header.value)"
            >
              <v-icon small>la-arrow-up</v-icon>
              {{ header.text }}
            </th>
            <th
              v-else
              :key="header.text"
              :width="header.width"
              :class="[
                'column',
                ,
                header.align == 'right'
                  ? 'text-xs-right'
                  : header.align == 'left'
                  ? 'text-xs-left'
                  : 'text-xs-center'
              ]"
            >{{ header.text }}</th>
          </template>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td v-if="selectAll">
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <slot name="items" :props="props" :item="props.item"></slot>

          <td v-if="!withoutAction" class="text-xs-center">
            <div class="action">
              <slot name="actions_right" :item="props.item"></slot>
              <slot
                name="actions"
                :_recycle="_recycle"
                :_edit="_edit"
                :_delete="_delete"
                :item="props.item"
              >
                <div v-if="actions" class="more-action">
                  <v-menu
                    class="data-grid-action"
                    bottom
                    right
                    min-width="180"
                    :nudge-right="20"
                    nudge-bottom="20"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn icon depressed flat :ripple="false">
                        <v-icon v-on="on">la-ellipsis-v</v-icon>
                      </v-btn>
                    </template>
                    <v-list class="more-action-list">
                      <v-list-tile
                        @click="action.cb(props.item)"
                        v-for="(action, index) in actions"
                        :key="index"
                      >
                        <v-icon class="pl-2">{{ action.icon }}</v-icon>
                        <v-list-tile-title>
                          {{
                          action.title
                          }}
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </div>
                <v-btn v-if="!hideActionEdit" icon depressed flat :ripple="false">
                  <v-icon @click="_edit(props.item)">la-edit</v-icon>
                </v-btn>
                <span v-if="filter.some(item => item.includes('is_deleted'))">
                  <v-btn v-if="!hideActionRecycle" icon depressed flat :ripple="false">
                    <v-icon @click="_recycle(props.item)">la-recycle</v-icon>
                  </v-btn>
                </span>
                <span v-else>
                  <v-btn v-if="!hideActionDelete" icon depressed flat :ripple="false">
                    <v-icon @click="_delete(props.item)">la-trash</v-icon>
                  </v-btn>
                </span>
              </slot>
              <slot name="actions_left" :item="props.item"></slot>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
      <template v-slot:no-data>
        <div class="text-xs-center">متاسفم, چیزی برای نمایش وجود ندارد :(</div>
      </template>
    </v-data-table>
    <div class="footer-wrapper">
      <v-pagination
        v-model="pagination.page"
        :length="lastPage"
        :total-visible="7"
        circle
        color="info"
      ></v-pagination>
      <div class="page-size-wrapper">
        <div class="item-size">
          نمایش {{ start_item | persianDigit }} تا
          {{ end_item | persianDigit }} از {{ total_items | persianDigit }}
        </div>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div class="page-size" v-on="on">
              {{ pagination.rowsPerPage }}
              <v-icon>la-angle-up</v-icon>
            </div>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in [5, 10, 20, 100]"
              :key="index"
              @click="pagination.rowsPerPage = item"
            >
              <v-list-tile-title>
                <span class="page-size-item">{{ item }}</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      default: () => {
        return {}
      }
    },
    filters: {
      default: () => []
    },
    defaultFilters: {
      default: () => []
    },
    defaultSort: {},
    headers: {
      required: true,
      default: () => []
    },
    selectAll: {
      default: false
    },
    value: {
      default: () => []
    },
    withAdd: {
      default: true
    },
    editMode: {
      default: 'state'
    },
    service: {},
    editComponent: {
      default: null
    },
    editUrl: {
      default: null
    },
    createUrl: {
      default: null
    },
    withoutAction: {
      default: false
    },
    withDateFilter: {
      default: true
    },
    pageSize: {
      default: 10
    },
    serverPagination: {
      default: true
    },
    watchFilters: {
      type: Boolean,
      default: true
    },
    items: {
      default: () => []
    },
    withSearch: {
      default: false
    },
    withRecycle: {
      default: false
    },
    hideActionEdit: {},
    hideActionDelete: {},
    hideActionRecycle: {},
    actions: {},
    queryService: {
      type: Function
    },
    deleteService: {
      type: Function
    },
    recycleService: {
      type: Function
    },
    syncUrl: {
      default: true
    },
    dataGrid: {
      default: () => {
        return {}
      }
    },
    defaultSort: {
      type: String,
      default: null
    }
  },
  watch: {
    pagination: {
      handler() {
        this.sort = this.pagination.sortBy
        if (this.pagination.descending) {
          this.sort = '-' + this.sort
        }
        this._query()
      },
      deep: true
    },
    items: {
      handler() {
        this.rows = [...this.items]
      },
      deep: true
    },
    data_filters: {
      handler() {
        this.filter = []
        for (const filter_name in this.data_filters) {
          if (this.data_filters[filter_name]) {
            let oprand = 'like'
            let name = filter_name
            let value = this.data_filters[filter_name]
            if (filter_name.includes(':')) {
              name = filter_name.split(':')[0]
              oprand = filter_name.split(':')[1]
            }
            this.filter.push(`${name}:${value}:${oprand}`)
          }
        }
        if (this.watchFilters) {
          this._query()
        }
      },
      deep: true
    },
    value: {
      handler() {
        this.selected = this.value
      },
      deep: true
    },
    selected: {
      handler() {
        this.$emit('input', this.selected)
      },
      deep: true
    }
  },
  data() {
    let filter = []
    if (this.defaultFilters) {
      for (const filter_name in this.defaultFilters) {
        if (this.defaultFilters[filter_name]) {
          filter.push(
            `${filter_name}:${this.defaultFilters[filter_name]}:${this
              .defaultFilters.op || '='}`
          )
        }
      }
    }
    return {
      showFilter: true,
      showDateFilter: false,
      dateFilterHeight: 0,
      sort: this.defaultSort,
      pagination: {
        page: 1,
        rowsPerPage: this.pageSize,
        descending: false,
        sortBy: this.defaultSort
      },
      data_filters: { ...this.defaultFilters },
      total_items: 0,
      lastPage: 0,
      loading: true,
      rows: [...this.items],
      selected: [...this.value],
      filter: filter,
      search: null
    }
  },
  mounted() {
    this._initialParams()
    this._query()
    this.dataGrid.refresh = () => {
      this.refresh()
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.rows.slice()
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    _initialParams() {
      if (!this.syncUrl) {
        return
      }
      let params = this.$route.query
      if (params.page) {
        this.pagination.page = +params.page
      }
      if (params.perPage) {
        this.pagination.rowsPerPage = +params.perPage
      }
      if (params.sort) {
        if (params.sort.includes('-')) {
          this.pagination.descending = true
          this.sort = this.pagination.sortBy = params.sort.replace('-', '')
        } else {
          this.sort = this.pagination.sortBy = params.sort
        }
      }
      if (params.filters) {
        let parsed_filters = JSON.parse(params.filters)
        this.data_filters = {}
        for (const item of parsed_filters) {
          let [a, b, c] = item.split(':')
          let model = `${a}:${c}`
          if (this.filters.find(item => item.model == model)) {
            this.data_filters[model] = b
            continue
          }
          model = `${a}`
          if (this.filters.find(item => item.model == model)) {
            this.data_filters[model] = b
            continue
          }
        }
      }
    },
    _query() {
      if (!this.serverPagination) {
        this.loading = false
        return
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.loading = true
        let params = {
          page: this.pagination.page,
          perPage: this.pagination.rowsPerPage
        }
        if (this.sort) {
          params.sort = this.sort
        }
        if (this.filter && this.filter.length) {
          params.filters = JSON.stringify(this.filter)
        }
        if (this.syncUrl) {
          this.$router.replace({ query: params })
        }
        let service = this.queryService
          ? this.queryService(params)
          : this.service.$query(params)
        service
          .then(res => {
            this.rows = res.data
            this.loading = false
            this.total_items = res.total
            this.lastPage = res.lastPage
          })
          .finally(() => {
            this.loading = false
          })
      }, 100)
    },
    _delete(item) {
      this.$dialog
        .confirm({
          title: 'حذف آیتم',
          message: 'آیا از حذف این آیتم اطمینان دارد؟'
        })
        .then(confirm => {
          if (!confirm) {
            return
          }
          let service = this.deleteService
            ? this.deleteService(item.id)
            : this.service.$delete(item.id)
          service
            .then(() => {
              this.$toast.success().showSimple('آیتم با موفقت حذف شد')
              this._query()
            })
            .catch(err => {
              this.$toast.error().showSimple('خطایی رخ داده است')
            })
        })
    },
    _recycle(item) {
      this.$dialog
        .confirm({
          title: 'بازیابی آیتم',
          message: 'آیا از بازیابی این آیتم اطمینان دارد؟'
        })
        .then(confirm => {
          if (!confirm) {
            return
          }
          let service = this.recycleService
            ? this.recycleService(item.id)
            : this.service.$recycle(item.id)
          service
            .then(() => {
              this.$toast.success().showSimple('آیتم با موفقت بازیابی شد')
              this._query()
            })
            .catch(err => {
              this.$toast.error().showSimple('خطایی رخ داده است')
            })
        })
    },
    _edit(item) {
      if (this.editMode == 'dialog' && this.editComponent) {
        this.$dialog
          .show({
            component: this.editComponent,
            scope: { item: { ...item } }
          })
          .then(newItem => {
            if (!newItem) {
              return
            }
            this.service
              .update(item.id, newItem)
              .then(res => {
                this.$toast.success().showSimple('با موفقیت به روز رسانی شد')
              })
              .catch(err => {
                this.$toast.error().showSimple('خطایی رخ داده است')
              })
          })
        return
      }
      if (this.editUrl) {
        let url = this.editUrl.replace(/:[a-zA-Z_]+/g, p => {
          let param = p.replace(':', '')
          return item[param]
        })
        this.$router.push(url)
        return
      }
      this.$router.push(this.$route.path + '/' + item.id)
    },
    _add() {
      if (this.editMode == 'dialog' && this.editComponent) {
        this.$dialog
          .show({
            component: this.editComponent,
            scope: { item: {} }
          })
          .then(newItem => {
            if (!newItem) {
              return
            }
            this.service
              .save(newItem)
              .then(res => {
                this.$toast.success().showSimple('با موفقیت ایجاد شد')
              })
              .catch(err => {
                this.$toast.error().showSimple('خطایی رخ داده است')
              })
          })
        return
      }
      if (this.createUrl) {
        let url = this.createUrl.replace(/:[a-z]+/g, p => {
          let param = p.replace(':', '')
          return item[param]
        })
        this.$router.push(url)
        return
      }
      this.$router.push(this.$route.path + '/create')
    },
    refresh() {
      this._query()
    },
    recycle() {
      let is_deleted_index = this.filter.findIndex(item =>
        item.includes('is_deleted')
      )
      if (is_deleted_index !== -1) {
        this.filter.splice(is_deleted_index, 1)
      } else {
        this.filter.push('is_deleted:1')
      }
      this._query()
    },
    resetFilter() {
      this.data_filters = { ...this.defaultFilters }
      this.sort = null
      this.pagination.sortBy = null
    }
  },

  computed: {
    custom_headers() {
      let headers = this.headers.map(item => {
        if (item.sortable == null) {
          item.sortable = true
        }
        return item
      })
      let action_exist = headers.some(item => item.name == 'action')
      if (!action_exist && !this.withoutAction) {
        headers.push({
          text: '',
          name: 'action',
          align: 'center',
          sortable: false,
          width: '10%'
        })
      }
      return headers
    },
    start_item() {
      return (this.pagination.page - 1) * this.pagination.rowsPerPage + 1
    },
    end_item() {
      let end_item = this.pagination.page * this.pagination.rowsPerPage
      return end_item > this.total_items ? this.total_items : end_item
    }
  }
}
</script>
