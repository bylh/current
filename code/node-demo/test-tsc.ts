import * as moment from 'moment';
interface ICache{
    useCache:boolean;
    [propName:string]:any;
}
const cache:ICache = {useCache:true};
console.log('test123', cache, moment());
