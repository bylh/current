export interface Profile {
    userId: string,
    avatarUrl: string, // 头像url
    bgUrl: string,  // 背景url
    signature: string, // 描述
    introduction: string, // 介绍
    birthday: string, // 生日
    phone: string, // 手机号
    email: string, // 邮箱
    wechat: string, // 微信
}

export interface Coin {
    symbol: string; // 代币简称 如ETH
    pair: string; // 交易对
    rate: string; // 兑换率
    rate_percent: string; // 上涨下降比
}

export const PageTags = ['js', 'ts', 'node', 'angular', 'sql', 'html', 'css', 'mongo', 'react', 'others'];