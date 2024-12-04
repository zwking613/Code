import http from '@api/index'

export const getMenuList = () => http.get('/getRouters')