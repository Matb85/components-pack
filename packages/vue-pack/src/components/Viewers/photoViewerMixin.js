import { mixin } from "@matb85/base-pack";

export default {
  mounted() {
    const handler = mixin.mounted.bind({ ref: this.$refs.img, el: this.$el, getdimensions: mixin.getdimensions });
    this.$root.$on(this.trigger, (data) => handler(data));
  },
  methods: {
    close() {
      return mixin.close(this.$refs.img, this.$el);
    },
    getdimensions: mixin.getdimensions,
  },
};
