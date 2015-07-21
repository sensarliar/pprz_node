# pprz_node

操作教程：
1,在term下运行redis-server；
2,在目录运行：
~/git/nmea_navsat_driver$ '/home/gaoming/git/nmea_navsat_driver/scripts/ivy_to_redis_test.py' 
采集短报文设备发回来的经纬度；并写入到redis数据库中
3,在目录下运行nodejs，也就是地图服务器
~/git/pprz_node$ node app.js
a new user connected
Subscribing user to new room: 24

4,打开手机，并用电脑介入wifi，再运行vpn；
5,运行google-chrome-stable浏览器，在地址栏中输入
localhost：3000
飞机号用24；
可以看到地图，并且有飞机图标，可以表示机头指向；
可以打开js控制台来演示；



模拟飞行程序：
在以上基础上，
1,运行./paparazzi,并运行simulation程序；
2,终止ivy_to_redis_test.py程序；
运行 ~/git/nmea_navsat_driver$ '/home/gaoming/git/nmea_navsat_driver/scripts/ivy_to_redis.py'程序；
3,重新打开googlemap，演示程序，飞机号用24; 


