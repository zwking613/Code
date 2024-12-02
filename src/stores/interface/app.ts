export interface AppStateType {
    userInfo:UserInfoType | {},
    captchaImage:CaptchaImgType
}
export interface CaptchaImgType {
    img?:string
    uuid?:string
}
export interface UserInfoType {
    avatar: string;
    beginTime: string | null;
    createBy: number;
    createTime: string;
    deptId: number;
    deptName: string;
    email: string;
    endTime: string | null;
    id: number;
    isDeleted: boolean;
    loginDate: string;
    loginIp: string;
    nickname: string;
    password: string;
    phone: string;
    remark: string;
    roleIds: string | null;
    roleNames: string | null;
    roles: any; // 这里假设roles是一个复杂对象或数组，具体类型需要根据实际情况确定
    sex: string;
    status: string;
    updateBy: number;
    updateTime: string;
    username: string;
    [key:string]:any
}