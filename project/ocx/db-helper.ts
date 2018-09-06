import mongoose, { Mongoose, Document } from 'mongoose';
import { Defer } from './common';
import Config from './config';
export interface WebPushInfo {
    userId: string,
    pushSubscription: string
}
// ${Config.Server.IP}
export const CollectUri = `mongodb://${Config.Server.DB.User}:${Config.Server.DB.Pwd}@127.0.0.1:${Config.Server.DB.Port}/web`;
const Schema = mongoose.Schema;
const webPushSchema = new Schema({
    userId: String,
    pushSubscription: String
});
const userSchema = new Schema({
    userId: String,
    pwd: String, // 可能用不到
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // }

})
const webPushModel = mongoose.model('webpushes', webPushSchema);
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
    public async findOne(type: string, conditions: any): Promise<boolean>{
        let defer = new Defer<boolean>();
        let model: mongoose.Model<mongoose.Document> = null;
        if(type === 'user') {
            model = userModel;
        } else if(type === 'webpush') {
            model = webPushModel;
        }
        model.findOne(conditions, (err, res) => {
            console.log('getOne(): res:', res, 'err', err);
            defer.resolve(res != null);
        });
        return await defer.promise;;
    }
    public async getOne(conditions: any) {
        let defer = new Defer<any>();
        webPushModel.findOne(conditions, (err, res) => {
            console.log('getOne(): res:', res, 'err', err);
            defer.resolve(res);
        });
        return await defer.promise;;
    }
    public async getAll(conditions?: any) {
        let defer = new Defer<any>();
        webPushModel.find(conditions, (err, res) => {
            console.log('getAll(): res:', res, 'err', err);
            defer.resolve(res);
        });
        return await defer.promise;;
    }
    public async set(info: any, type: 'user' | 'webpush' = 'webpush'): Promise<any> {
        let data;
        if (type === 'user') {
            data = new userModel(info);
        } else if (type === 'webpush') {
            data = new webPushModel(info);
        }
        try {
            await data.save();
        } catch (err) {
            throw err;
        }
        console.log('保存数据成功', info);
        return info;
    }
    public async update(info: any, type: 'user' | 'webpush' = 'webpush', conditions: any = null) {
        let data;
        if (type === 'user') {
            data = new userModel(info);
        } else if (type === 'webpush') {
            data = new webPushModel(info);
        }
        try {
            await userModel.update({
                userId: info.userId,
                pwd: info.pwd
            }, info, {upsert: true},(err, raw) => console.log(err, raw));
            // await data.update(info);
        } catch (err) {
            throw err;
        }
        console.log('保存数据成功', info);
        return info;
    }
}
export default new DBHelper();