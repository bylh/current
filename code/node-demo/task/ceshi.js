function timer(timeout) {
    return new Promise(resolve => {
        setTimeout(() => resolve('timeout'), timeout);
    });
}
setInterval(async () => {
    console.log('开始');
    await timer(Math.floor(Math.random()*3000));
    console.log('选择');
    document.getElementsByClassName('SingleAnswer')[Math.floor(Math.random()*2)].click();
    await timer(Math.floor(Math.random()*2000));
    console.log('下一步');
    document.getElementsByClassName('NextButton')[0].click();
}, 
    8000 );

