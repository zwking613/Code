export namespace App {
    export interface ReqLoginForm {
        username: string;
        password: string;
        code:string;
        uuid:string
    }
    export interface ResCaptchaImage {
        uuid:string
        img:string
    }
    export interface ResLogin {
        data: string;
    }
    export interface ReUpdateInfoForm {
        nickname: string
        phone: string
        email: string
        sex: string
    }

    export interface RePasswordForm {
        oldPassword: string,
        newPassword: string
    }

    export interface ResUserInfo {
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
}