import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: true
    }),
    actions: {
        setLoading(status: boolean) {
            this.isLoading = status
        },
        hideLoading() {
            const loadingWrapper = document.getElementById('loading-wrapper')
            if (loadingWrapper) {
                loadingWrapper.classList.add('fade-out')
                setTimeout(() => {
                    loadingWrapper.style.display = 'none'
                    this.isLoading = false
                }, 300)
            }
        }
    }
})