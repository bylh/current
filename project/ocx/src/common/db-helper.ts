import mongoose, { Mongoose, Document } from 'mongoose';
import { Defer } from './common';
import Config from '../config';
export interface WebPushInfo { // 推送信息
    userId: string,
    pushSubscription: string
}

export type ModelType = 'user' | 'profile' | 'webpush' | 'article'; // 数据类型

// 数据库URL
export const CollectUri = `mongodb://${Config.Server.DB.User}:${Config.Server.DB.Pwd}@127.0.0.1:${Config.Server.DB.Port}/web`;

const Schema = mongoose.Schema;

// 推送
const webPushSchema = new Schema({
    userId: String,
    pushSubscription: String
});
const articleSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    html: String,
    md: String
});
const userSchema = new Schema({
    userId: String,
    pwd: String,
    isAdmin: {  // 是否为管理员
        type: Boolean,
        default: false
    },
    info: {
        avatarUrl: String, // 头像url
        bgUrl: String,  // 背景url
        description: String, // 描述
        age: String, // 年龄
        phone: String, // 手机号
        email: String, // 邮箱
        wechat: String, // 微信
    }

});

const webPushModel = mongoose.model('webpushes', webPushSchema);
const articleModel = mongoose.model('article', articleSchema);
export const userModel = mongoose.model('users', userSchema);

class DBHelper {
    protected db: Mongoose = null;

    // 初始化连接数据库
    public async init() {
        try {
            this.db = await mongoose.connect(CollectUri);
        } catch (err) {
            throw err;
        }
    }

    public getModel(type: ModelType): mongoose.Model<mongoose.Document> {
        let model: mongoose.Model<mongoose.Document> = null;
        switch (type) {
            case 'user':
                model = userModel;
                break;
            case 'profile':
                model = userModel;
                break;
            case 'webpush':
                model = webPushModel;
                break;
            case 'article':
                model = articleModel;
                break;
        }
        return model;
    }

    public async getOne(type: ModelType, conditions: any): Promise<mongoose.Document> {
        let model = this.getModel(type);
        let defer = new Defer<any>();
        model.findOne(conditions, (err, res) => {
            console.log('getOne(): res:', res, 'id:', 'err', err);
            defer.resolve(res);
        });
        return await defer.promise;;
    }

    public async getAll(type: ModelType, conditions?: any): Promise<Array<mongoose.Document>> {
        let defer = new Defer<any>();
        let model = this.getModel(type);

        model.find(conditions, (err, res) => {
            console.log('getAll(): res:', res, 'err', err);
            defer.resolve(res);
        });
        return await defer.promise;
    }

    public async set(type: ModelType, info: any): Promise<any> { // 区别于update，直接保存
        let data;
        if (type === 'user') {
            data = new userModel(info);
        } else if (type === 'webpush') {
            data = new webPushModel(info);
        } else if (type === 'article') {
            data = new articleModel(info);
        }
        try {
            console.log('保存的id：', data.id);
            await data.save();
        } catch (err) {
            throw err;
        }
        console.log('保存数据成功', info);
        return info;
    }

    public async update(type: ModelType, info: any, conditions: any = null) {
        if (type === 'user') {
            try {
                await userModel.update({
                    userId: info.userId,
                    pwd: info.pwd
                }, {title: info.title}, { upsert: true }, (err, raw) => console.log(err, raw));
            } catch (err) {
                throw err;
            }
        } else if (type === 'profile') {
            try {
                console.log('profile数据库更新', conditions, info);
                await userModel.update(conditions, info, { upsert: true }, (err, raw) => console.log(err, raw));
            } catch (err) {
                throw err;
            }
        } else if (type === 'article') {
            // console.log(info, conditions); 
            await articleModel.update(conditions, info, { upsert: true }, (err, raw) => console.log(err, raw));
        }
        console.log('保存数据成功', info);
        return info;
    }
}
export default new DBHelper();