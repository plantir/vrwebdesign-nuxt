export class BaseService {
    constructor($axios, path) {
        this.$axios = $axios;
        this.path = path;
    }
    get(id) {
        return this.$axios.get(this.path + '/' + id);
    }
    save(obj) {
        return this.$axios.post(this.path, obj);
    }
    query(params) {
        return this.$axios.get(this.path, { params });
    }
    update(id, obj) {
        return this.$axios.put(this.path + '/' + id, obj);
    }
    delete(id) {
        return this.$axios.delete(this.path + '/' + id);
    }
    chart(obj) {
        return this.$axios.post(this.path + '/chart', obj);
    }
    recycle(id) {
        return this.$axios.put(this.path + '/' + id + '/recycle');
    }
    $get(id) {
        return this.$axios.$get(this.path + '/' + id);
    }
    $save(obj) {
        return this.$axios.$post(this.path, obj);
    }
    $query(params) {
        return this.$axios.$get(this.path, { params });
    }
    $update(id, obj) {
        return this.$axios.$put(this.path + '/' + id, obj);
    }
    $delete(id) {
        return this.$axios.$delete(this.path + '/' + id);
    }
    $chart(obj) {
        return this.$axios.$post(this.path + '/chart', obj);
    }
    $recycle(id) {
        return this.$axios.$put(this.path + '/' + id + '/recycle');
    }
}
