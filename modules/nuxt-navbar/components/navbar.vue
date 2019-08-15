<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  border-bottom: 1px solid #ebedf2;
  background: #fff;
  .head-toolbar {
    display: flex;
    align-items: center;
  }
  .nav-tab {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    list-style-type: none;
    .nav-item {
      margin-left: 50px;
    }
    .nav-link {
      background-color: transparent;
      color: #6c7293;
      height: 56px;
      display: flex;
      box-sizing: content-box;
      align-items: center;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      span {
        font-weight: 500;
      }
      .v-icon {
        margin-left: 8px;
        transition: all 0.3s;
      }
      &:hover,
      &.nuxt-link-active {
        color: $primary-color;
        border-bottom: 3px solid $primary-color;
        .v-icon {
          color: $primary-color;
        }
      }
    }
  }
}
</style>

<template >
  <section>
    <div class="header">
      <div class="head-toolbar">
        <ul class="nav-tab">
          <li class="nav-item" v-for="(item,index) in items" :key="index">
            <nuxt-link :exact="item.exact" class="nav-link" :to="item.base + item.to">
              <v-icon>{{item.icon}}</v-icon>
              <span>{{ item.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    items: {
      required: true
    }
  }
}
</script>
