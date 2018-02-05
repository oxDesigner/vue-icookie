# vue-icookie
一个用来在浏览器（IE9+）中操作cookie的vue插件；
依赖js-icookie，api基本一致； 
还未经严密测试，发现bug请及时联系280441190@qq.com

## 源码

把js-icookie挂在了Vue和Vue.prototype上面；Vue构造函数上面有js-icookie的所有方法，可使用Vue.iCookie.config，Vue.iCookie.set，Vue.iCookie.get，Vue.iCookie.remove；Vue实例上面只有get、set、remove；this.$iCookie.set，this.$iCookie.get，this.$iCookie.remove；

``` javascript
import iCookie from 'js-icookie';
const vueIcookie = {
    install(Vue, options) {
        Vue.iCookie = iCookie;
        Vue.prototype.$iCookie = {
            set: iCookie.set,
            get: iCookie.get,
            remove: iCookie.remove
        }
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueIcookie);
}
export default vueIcookie
```

## 安装

### 用script标签引入

下载[here](https://github.com/oxDesigner/vue-icookie/blob/master/dist/vueicookie.js)并引入:

``` html
<script src="*/vueicookie.js"></script>
```

### NPM
```
  $ npm i vue-icookie -S
  import iCookie from 'vue-icookie'
```


## 基本用法


### 全局配置

按照代码执行顺序，全局配置声明之后存入cookie才受全局配置影响；


``` javascript
Vue.iCookie.config({
	path: '/test', //只在/test路径和test的子路径下可读，默认为'/'，即在所有路径下可读；
	expires: '3y', //缓存有效期为3年，也可写成1y：1年、2m：2月、3d或者3(number)：3天、4h：4小时，默认为浏览器退出后缓存自动清除；
	domain: '.che300.com'  //缓存的可读域，默认为当前域，如你在www.che300.com下使用默认配置存入缓存，domain默认为www.che300.com；则只有在www.che300.com域名下才可以访问该缓存，若要让dingjia.che300.com也能访问该缓存，domain应该设为.che300.com，注意前面有“.”；
});
```



### 存入(以下范例默认没有设置全局配置，默认已经将Vue实例化，this为Vue实例)



#### 存入一个key，value对，path、domain，expires均为默认值；

``` javascript
this.$iCookie.set('key', 'value');
```

#### 存入一个key，value对，path，domain为默认值，有效期为7天；

``` javascript
this.$iCookie.set('key', 'value', { expires: 7 });
```
亦可写为
``` javascript
this.$iCookie.set('key', 'value', 7);
```

#### 存入一个key，value对，path为'/test'，domain为当前域，有效期为2个月；

``` javascript
this.$iCookie.set('key', 'value', { expires: '2m', path: '/test' });
```

#### 批量存，存入三个key，value对

``` javascript
this.$iCookie.set({
	'key1': 'value1',
	'key2': 'value2',
	'key3': 'value3'
});
```

#### 批量存带配置，存入三个key，value对，有效期为7天

``` javascript
this.$iCookie.set({
	'key1': 'value1',
	'key2': 'value2',
	'key3': 'value3'
},{
	'expires': 7
});
```

#### 顶替全局配置


其中key，value对的有效期为7天，path为/test，key1，value1对的有效期为3天，path为/

``` javascript
this.$iCookie.config({
	'expires': 3,
	'path': '/test'
});

this.$iCookie.set('key', 'value', {
	'expires': 7
});

this.$iCookie.set('key1', 'value1',{
	'path': '/'
});
```



### 读取(以下范例默认没有设置全局配置，默认已经将Vue实例化，this为Vue实例)



**读取里面有几个未解决的坑，等会说** 

#### 单个读取

```javascript
this.$iCookie.set('key', 'value');
this.$iCookie.get('key'); // => 'value'
this.$iCookie.get('key1'); // => undefined
```

#### 读取全部缓存

``` javascript
this.$iCookie.get(); // => { key: 'value' }
```

#### 读取多个缓存

``` javascript
this.$iCookie.set({
	'key1':'value1',
	'key2':'value2'
})
this.$iCookie.get(['key1','key2']); // => { 'key1': 'value1', 'key2': 'value2' }
```

#### 坑

``` javascript
this.$iCookie.set('key1', '我是默认 /');
this.$iCookie.set('key1', '我是设置 /test', {
	path: '/test'
});
this.$iCookie.get('key1'); // => '我是默认 /'
this.$iCookie.get(); // => {'key1': '我是默认 /'}
```

**如果存入同名cookie，不同路径或不同域，则两者都会存在于cookie中，读取的时候只能读取到其中一个，至于为什么请看源码，我测试过的浏览器都是只能读取到离当前路径最远的路径，因为document.cookie返回的cookie字符串，当前路径的在最前面，后面的顶替了前面的**

**解决方案： 不要存入同名cookie，我有什么办法？ 我也很绝望啊**

**设想： 2.0我可能会做成这样 =>**

``` html
<!--设想start-->
```
``` javascript
this.$iCookie.get(); // => {'/': {'key1': '我是默认 /'}, '/test': {'key1': '我是设置 /test'}}
```
``` html
<!--设想end-->
```

。。。。。。。。。。。。。。。这是另一个坑。。。。。。。。。。。。。。。。。。。

``` javascript
this.$iCookie.set('key1', {'a': 1});
this.$iCookie.get('key1'); // => '{"a": 1}'
```

**存入对象进去，只能拿到json字符串**

**解决方案： 请自行JSON.parse**

**设想： 2.0我可能会做成这样 =>**

``` html
<!--设想start-->
```
``` javascript
this.$iCookie.get('key1'); // => {"a": 1}  直接返回对象
```
``` html
<!--设想end-->
```

**其实存入非字符串进去，最后拿到的都是字符串，笑哭**



### 删除(以下范例默认没有设置全局配置，默认已经将Vue实例化，this为Vue实例)



**删除里面有也有几个未解决的坑，等会说** 

``` javascript
this.$iCookie.set('key', 1);
this.$iCookie.get('key'); // => 1
this.$iCookie.remove('key');
this.$iCookie.get('key'); // => undefined， 删除成功了
```

##### 坑

```javascript
this.$iCookie.set('key1', 'value1');
this.$iCookie.set('key2', 'value2', { path: '/test' });
this.$iCookie.remove('key1'); // 删除成功
this.$iCookie.remove('key2'); // 删除失败，并不是每次删除失败都报错，如果当前domain或当前path找到了这个cookie，但是domain或者path设置的不一致，删除不成功也不报错，只有当前domain或当前path找不到这个cookie才报错；
this.$iCookie.remove('key2', { path: '/test' }); // 删除成功 !
```

**remove在源码内部还是走set，其实删除cookie就是把他的过期时间设为昨天，set的时候path和domain是怎样的配置，remove的时候path和domain必须是相同配置才能删除成功，如果当前domain或当前path找到了这个cookie，但是domain或者path设置的不一致，删除不成功也不报错，只有当前domain或当前path找不到这个cookie才报错；**



## 作者



oxDesigner， 一个将近三十岁却依旧帅气的男人；
如果你发现了bug，请及时提交Issues，亦可联系280441190@qq.com；
如果你用着舒服，请给我一颗star

