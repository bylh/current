
import mongoose from 'mongoose';
class DBHelper {
    protected db: any = null;
    public async init() {
        try {
            await mongoose.connect('mongodb://admin:439882@127.0.0.1:27018/admin');
        } catch(err) {
            throw err;
        }
    
    }
    
}
export default new DBHelper();