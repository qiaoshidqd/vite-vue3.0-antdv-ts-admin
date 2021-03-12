export interface EmitType{
    /**
     *切换菜单栏
     */
    optionMenu: 'OPTION_MENU',
    /**
     * 打开菜单栏
     */
}

export interface UserInfo {
    // 用户id
    userId: string | number;
    // 用户名
    userName: string;
    // 真实名字
    realName: string;
    // 介绍
    desc?: string;
}