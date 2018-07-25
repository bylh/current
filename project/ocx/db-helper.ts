
import mongoose, { Mongoose } from 'mongoose';
class DBHelper {
    protected db: Mongoose = null;
    public async init() {
        try {
            this.db = await mongoose.connect('mongodb://bylh:439882@127.0.0.1:27018/web');
        } catch(err) {
            throw err;
        }
    
    }
    public async get() {
        
    }
    
}
export default new DBHelper();