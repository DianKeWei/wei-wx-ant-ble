# wei-wx-ant-ble

- #### Notice : Since the original author doesn't update, it's up to me to update the api based on this.

- #### repository :

  - ##### Origin-author-url : https://github.com/zhaodahai/wx-ant-ble.git

  - #####  Gitee : https://gitee.com/DinaKeWei/wei-wx-ant-ble.git （better for chinese )

  - ##### Github : https://github.com/DianKeWei/wei-wx-ant-ble.git

  

### Usage

#### 1、引入SDK管理类和枚举
```js
  // 引入SDK管理类 微信小程序通过npm构建后
  import { BTManager, ConnectStatus } from 'wx-ant-ble';
  // 引入SDK管理类 支付宝小程序
  import { BTManager, ConnectStatus } from '../../wx-ant-ble/index.js';
```

#### 2、初始化蓝牙管理器 & 设置用户信息
```js
  // 初始化蓝牙管理器 单例模式
  this.bt = new BTManager({
    debug: true // 是否开启打印调试
  });
```

#### 3、注册回调
```js
  // 注册状态更新回调
  this.bt.registerDidUpdateConnectStatus(res => {
    // 参数结构注意查看log
    console.log('registerDidUpdateConnectStatus', res);
    if (res.connectStatus === ConnectStatus.connected) {
      this.setData({ isConnected: true });
      ...
    }else if (res.connectStatus === ConnectStatus.disconnected) {
      this.setData({ isConnected: false });
      ...
    }
  });
  // 注册发现外设回调，当扫描到设备时回调，或者达到超时时间回调。
  this.bt.registerDidDiscoverDevice(res => {
    // 参数结构注意查看log
    console.log('registerDidDiscoverDevice', res);
    ...
  });
  // 注册特征值改变回调，当监听的特征值改变时回调，或者读特征值时回调。
  this.bt.registerDidUpdateValueForCharacteristic(res => {
    // 参数结构注意查看log
    console.log('registerDidUpdateValueForCharacteristic', res);
    ...
  });
```
#### 4、扫描 & 停止扫描
```js
  // 开始扫描
  this.bt.scan({
    services: [],              // 主service的uuid列表
    allowDuplicatesKey: false, // 是否允许重复上报设备
    interval: 0,               // 上报新设备的间隔，默认为0
    timeout: 15000,            // 扫描超时时间，毫秒
    deviceName: '',            // 需要匹配的设备名称
    containName: ''            // 需要包含的设备名称
  }).then(res => {
    console.log('scan success', res);
  }).catch(e => {
    console.log('scan fail', e);
  });
  // 停止扫描
  this.bt.stopScan()
  .then(res => {
    console.log('stopScan success', res);
  }).catch(e => {
    console.log('stopScan fail', e);
  })
```
#### 5、连接 & 断开连接
```js
  // 连接设备
  this.bt.connect(device) // device应为registerDidDiscoverDevice注册的方法上报的设备对象
  .then(res => {
    console.log('connect success', res);
  }).catch(e => {
    console.log('connect fail', e);
  });
  // 断开连接
  this.bt.disconnect()
  .then(res => {
    console.log('disconnect success', res);
  }).catch(e => {
    console.log('disconnect fail', e);
  })
```
#### 5、Read & Notify & Write
```js
  // 读特征值，读到的值从registerDidUpdateValueForCharacteristic注册的方法上报
  this.bt.read({
    suuid: 'xxxx', // 特征对应的服务uuid
    cuuid: 'xxxx'  // 特征uuid
  }).then(res => {
    console.log('read success', res);
  }).catch(e => {
    console.log('read fail', e);
  })
```
```js
  // 向蓝牙模块写入数据
  this.bt.write({
    suuid: 'xxxx', // 特征对应的服务uuid
    cuuid: 'xxxx', // 特征uuid
    value: 'FFFF'  // 写入的数据
  }).then(res => {
    console.log('write success', res);
  }).catch(e => {
    console.log('write fail', e);
  })
```

```js
  // 监听/停止监听 特征值改变，改变特征值从registerDidUpdateValueForCharacteristic注册的方法上报
  this.bt.notify({
    suuid: 'xxxx',     // 特征对应的服务uuid
    cuuid: 'xxxx',     // 特征uuid
    state: true/false  // 是否监听
  }).then(res => {
    console.log('notify success', res);
  }).catch(e => {
    console.log('notify fail', e);
  })
```

