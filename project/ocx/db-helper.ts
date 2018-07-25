
import mongoose from 'mongoose';
class DBHelper {
    protected db: any = null;
    public async init() {
        try {
            await mongoose.connect('mongodb://bylh:439882@127.0.0.1:27018/web');
        } catch(err) {
            throw err;
        }
    
    }
    
}
export default new DBHelper();