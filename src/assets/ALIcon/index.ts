import { defineAsyncComponent } from 'vue'

const modules = import.meta.glob('./*.vue')

const ALIcon: { [key: string]: any } = {}

for (const path in modules) {
    const componentName = path.match(/\.\/(.*)\.vue$/)?.[1]
    ALIcon[componentName as string] = defineAsyncComponent((modules[path] as any))

}

export default ALIcon
