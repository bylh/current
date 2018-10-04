+ chrome调试ios
ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html

+ android模拟器与电脑互传文件
http://www.blogjava.net/wangxinsh55/archive/2011/09/20/359046.html

+ 模拟器定位
"location": { "lat": 39.961228, "lng": 116.444817, "alt": 0, "hAccuracy": 40, "vAccuracy": null },

+ npm设置淘宝镜像
npm config set registry https://registry.npm.taobao.org


+ ios模拟器运行命令
ionic cordova run ios --target=iPhone-X

+ 列出xcode模拟器设备
instruments -s devices


+ git 命令
git rm -r --cached www
 git add .
 git commit -m "fixed untracked files\"
线上账户：
13260292283

nas 测试地址：n1S8P9Yj59rUXj4LtLJkLnynGjGWs3QZ6xG
    主地址： n1RPJhFBZobvrqR1RiebNbq8JJvwyfzu7jN

qwe13893561470


docker run --net=couchbase -p 4984-4985:4984-4985 -v /Users/lihuan/server:/tmp/config -d couchbase/sync-gateway /tmp/config/sync-gateway-template.json


exiftool -GPSLongitude=115.9863030910492 33.jpg
exiftool -GPSLatitude=40.06141875611381 33.jpg
city cun 37.33102717766525   -122.03066023575133


            item.w = img.naturalWidth;
			item.h = img.naturalHeight;
            self.updateSize();

            if(item.w == null || item.h == null) {
                item.w = img.naturalWidth;
                item.h = img.naturalHeight;
                self.updateSize();
			}

http://storage.zhtu.net/attraction/凤凰岭-7b2809f92612.jpg!attraction
http://public-dev.zhtu.net/photo/17600851442.perf-7cd1ff01d612.photo-0ae5bdc1b560.jpg!photo
http://public-dev.zhtu.net/attraction/ewqe-cover-50a18d9284c1.jpg!photo


分离单独的库
pushd current
git subtree split -P project/ocx -b ocx-only
popd

mkdir bit-server
pushd bit-server

git init
git pull current ocx-only

git remote add origin https://github.com/bylh/bit-server.git  // 本地仓库关联远程仓库，对应remove


git remote add -f bit-server https://github.com/bylh/bit-server.git // 子仓库的地址作为一个remote，方便记忆

git subtree add --prefix=sub/bit-server bit-server master     // --squash添加此参数不会提交信息
git subtree pull --prefix=sub/bit-server bit-server master        // --squash
git subtree push --prefix=sub/bit-server bit-server master

// 配置博客子resume文件中index.html引入static文件夹资源，需要将/static改为static否则会出问题

生成博客用generate-blob分支
博客更换主题：git clone https://github.com/iissnan/hexo-theme-next themes/next // 这样做无法提交因为有.git文件参考 https://jungui.tk/366 应该用下面的subtree方式

git subtree add --prefix=themes/next https://github.com/iissnan/hexo-theme-next.git master

