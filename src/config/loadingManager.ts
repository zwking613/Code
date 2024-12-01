import { createVNode, render } from 'vue';
import EventBus from '@components/RequestLoading/eventBus';
import Loading from '@components/RequestLoading/index.vue';

let loadingNode:Element | ShadowRoot | null = null;

export const showFullScreenLoading = () => {
    if (EventBus.config.globalProperties.$state.needLoadingRequestCount === 0) {
        loadingNode = document.createElement('div');
        loadingNode.setAttribute('id', 'loading');
        document.body.appendChild(loadingNode);
        render(createVNode(Loading), loadingNode);
    }
    EventBus.config.globalProperties.$state.needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
    if (EventBus.config.globalProperties.$state.needLoadingRequestCount <= 0) return;
    EventBus.config.globalProperties.$state.needLoadingRequestCount--;
    if (EventBus.config.globalProperties.$state.needLoadingRequestCount === 0) {
        render(null, loadingNode as Element);
        document.body.removeChild(loadingNode as Element);
        loadingNode = null;
    }
};
