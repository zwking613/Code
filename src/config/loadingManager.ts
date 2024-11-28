import { createVNode, render } from 'vue';
import EventBus from '@components/loading/eventBus';
import Loading from '@components/loading/index.vue';

let loadingNode = null;

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
        render(null, loadingNode);
        document.body.removeChild(loadingNode);
        loadingNode = null;
    }
};
