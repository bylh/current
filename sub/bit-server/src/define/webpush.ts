export const Payload = {
    notification: {
        title: "订阅成功",
        body: "之后您将在第一时间收到推送通知!",
        icon: "assets/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [{
            action: "explore",
            title: "Go to the site"
        }]
    }
};

export const PayloadTest = {
    notification: {
        title: "测试",
        body: "测试推送是否正常!",
        icon: "assets/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [{
            action: "explore",
            title: "Go to the site"
        }]
    }
};