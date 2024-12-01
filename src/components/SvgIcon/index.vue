<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$attrs" @click="handleClick" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs" @click="handleClick">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { isExternal } from '@/utils/is';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, {emit}) {
    const isExternalValue = computed(() => isExternal(props.iconClass));
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className;
      } else {
        return 'svg-icon';
      }
    });
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }));

    const handleClick = () => {
      emit('click');
    };

    return {
      isExternal: isExternalValue,
      iconName,
      svgClass,
      styleExternalIcon,
      handleClick
    };
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
