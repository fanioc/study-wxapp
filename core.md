# 自习联盟
## 目录构架

```
--pages
--util
--extend
--component
--image
--template

```

## 引入核心文件
全局核心函数：`util-core.js` 小程序的核心逻辑管理
``` javascript
getUserInfo(uid=0)
    // uid=0 获取自身uid,设置后获取他人userBasicInfo和关联的关注信息
    //先判断该uid的个人信息是否在golobalData.userInfo[uid]中存在，不存在则获取，存在则返回
    //（判断是否是第一次登入，第一次则进入欢迎界面。）

setTheme(theme=0,thisPage)
    //theme内容存放在constant中 0 为默认函数
    //thisPage为当前页面指针

getSession(reGet=0) //获取成功后的回调函数
    reGet==0
    //    如果golobalData中不存在session,则用code换取session,并存入golobalData.session中
    //    调用返回并存入golobalData.session
    reGet>=1
    //    用code向服务器获取session
    //    返回时，如果网络错误，提示
    //    调用返回并存入golobalData.session

getUserConfig(reGet=0){ 
    return {be_invited:1,bullet_not_show:'',show_class:"1",show_grade:"1",show_info_page:"1",show_province:"1",show_score:"1",study_hidden:"1"}
    reGet==0
        //如果golobalData.userConfig存在，返回golobalData.userConfig，不存在则getUserConfig(reGet++)
    reGet>=1
        //重新从服务器中读取，并将读取的个人设置信息传入golobaData.userConfig中，调用回调函数
}

getUserAuth(){
    return {userInfo=0,location=1}
}

setUserConfig(data) //data:{configName1:configValue1,configName2:configValue2}

APIrequest(method,data={},reGetSession=0){ // data数据不需要session  无数据的时候data={}
    if(reGetSession>=1)
        data.session = getSession(1)
    else if(reGetSession>3) //如果重试session超过三次，报错
        return APIerrCode(3102);
    data.session = getSession()
    wx.request({
        url:constans.URL.API + method,
        method:"POST",
        data:data,
        success(res){
            if(res.data.errCode==3102){ //session错误时，重新获取session并重试
                return APIrequest(method,data,++reGetSession)
            }
            return res.data.data;
        },
        fail(res){ 展示模态窗网络错误，retrun res.code;  }
    })
}

APIerrCode(code,showModel=0){

    if(typeof(constant.errCode[code])=='undefined')
        return "没有错误码";
    let errMsg = constant.errCode[code];
    if(showModel==1)
        wx.showModel()
    retrun errMsg;
}
```
全局常量函数：`util-constant.js` 小程序的全局常量
```
URL:{
    base:{master:"",debug:""},
    API:base.master+"xxx";
},
theme:[
    0:{nav:"",button:""},
    1:{nav:"",button:""},
    ...
],
errCode:[
    0:"成功",
    3102:""
],
```


全局自定义组件函数：`util-componet.js` 小程序的自定义组件函数
```

```


## 页面功能逻辑

#### 启动小程序时
```javascript
app.js
    var _core      =  require(...)
    var _util      =  require(...)
    var _constant  =  require(...)
    var _tool      =  require(...)
    var _component =  require(...)

    launch(){
        //小程序启动，全局调用一次
        loginStudy()
            //调用getSession(1)初始化session
        initUserInfo()
            //调用getUserInfo,getUserConfig，获取用户初始化信息
						if (userInfo[0].errCode == 3101)
						console.log('进入欢迎界面')	//进入欢迎界面
    },

    error(msg){ //生命周期函数
        showModel(msg) //向用户展示信息并告知用户错误信息，可以及时反馈
        //将错误信息发送到服务器
    },
    golobalData:{
        util:{
            core:_core,
            const:_constant,
            tool:_tool,
            com:_component,
            ...
        }
    }

```

#### 欢迎界面(pages/welcome)：
```
介绍小程序
确认基本设置
    设置用户的基本设置  默认接受用户的邀请，是否向他人展示个人信息
确认协议
    绑定微信授权按钮，判断用户是否愿意读取信息
    如果拒绝，更新userBasicInfo-设置个人信息nickName为未授权，头像为灰，其它为空
    如果同意：更新userBasicInfo
```

#### 课表页面(pages/schedule)：
```

```

#### 自习页面(pages/study)：
```
展示学习地图 || 展示排行榜
    
展示自习空教室
    选择学习地点内容，发起学习

展示学习信息{ //所有学习卡片

    个人展示|| 群展示
}

学习卡片：study_id学习卡片 path?study_id=xxx


```


#### 问答页面(pages/question)：
```

```


#### 我的页面(pages/me)：
```
展示个人信息：
{

}

设置
{
    弹幕设置
        弹幕不显示类型：type=x,x,x
        弹幕模式，海量-简单

    教务认证绑定
    更新教务信息

    学习设置
        是否展示学习信息
        时候接受学习邀请

    主题选择

    自定义课表设置
    清除自定义课表背景

    微信个人信息授权
        是否允许读取个人信息
        是否允许读取定位...
}   
```

#### 个人信息页面(pages/personal):
```

```