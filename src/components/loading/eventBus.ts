const EventBus:any = createApp({});
const state = reactive({
    needLoadingRequestCount: 0
});

EventBus.config.globalProperties.$state = state;
EventBus.mount(document.createElement('div'));

export default EventBus;
