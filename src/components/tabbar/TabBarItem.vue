<template>
  <div class="tab-bar-item">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :class="{ active: isActive }">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  height: 49px;
}

.tab-bar-item img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.active {
  color: red;
}
</style>
