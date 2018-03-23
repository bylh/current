
NSURL *myLocationScheme = [NSURL URLWithString:@"iosamap://myLocation?sourceApplication=applicationName"]; 

if ([[UIDevice currentDevice].systemVersion integerValue] >= 10) { //iOS10以后,使用新API 
    [[UIApplication sharedApplication] openURL:myLocationScheme options:@{} completionHandler:^(BOOL success) { NSLog(@"scheme调用结束"); }]; 
} else { //iOS10以前,使用旧API
 [[UIApplication sharedApplication] openURL:myLocationScheme]; 
 }


 NSURL *url = [NSURL URLWithString:@"iosamap://navi?sourceApplication=applicationName&lat=36.547901&lon=104.258354&dev=1&style=2"];
 [[UIApplication sharedApplication] openURL:url];