### 使用create-react-app写的评论组件

#### 基本结构

--- src                                                                                       
------ components                                                       
----------- Comment.js                                                                                                              
----------- CommentInput.js                                                                                      
----------- CommentList.js                                                                              
------ containers                                                                                                                 
----------- CommentApp.js                                                                                                                 
----------- CommentInput.js                                                                                                      
----------- CommentList.js                                                                                                             
------ reducers                                                                                                                          ----------- comments.js                                                                                                                  
------ index.js                                                                                                                          
------ index.css   

组件主要包括两部分,上半部分是评论输入组件,下半部分是评论显示组件。containers中存放Smart组件,用于存取或处理一些数据;components中存放Dumb组件,根据props来进行渲染。

#### 组件划分

划分组件时,若一个组件要被复用,就应该做成Dumb组件,Dumb组件一般只依赖React和它本身的内容。只依赖Dumb组件无法构建完整的应用程序,还应该使用Smart组件进行一些数据处理,然后把数据通过props传递给Dumb组件,Dumb组件接受props并渲染出确定的结果。

#### 组件通信

##### 父组件向子组件通信
父组件可以通过props与子组件进行通信,是最简单的一种形式。

##### 子组件向父组件通信
父组件可以通过props给子组件传递一个回调函数,子组件调用该回调函数并传递一些数据,便可向父组件通信。

##### 兄弟组件间通信
如果嵌套不深的话,可以将共享的状态交给公共父组件保管,然后通过props传递; 

若嵌套深的话,

1. 使用context(不推荐)                                                                                                              
向父组件的context中放入一些状态,这样子组件都能直接访问这个状态而不需要通过中间组件的传递。context增加了组件之间的耦合性,而且因为里面的数据能被随意
修改,会导致程序的运行不可预料。                                                                                               
例:                                                                                                                      
```
class Parent extends Component{
  //在父组件中设置context
  getChildContext(){
      return{
        state
      }
  }
  ...
}

Parent.childContextTypes = {
  state: PropTypes.string
}

class Child extends Component{
  constructor(props, context){
    super(props, context);
  }
  render(){
    return(
      //子组件通过this.context访问context中的属性
      <h1>{this.context.state}</h1>
    )
  }
}

Child.contextTypes = {
  state: PropTypes.string
}
```

2. 发布订阅
一个地方发送消息,另一个地方接受做出变化的需求,可以利用观察者模式
```
class EventEmitter{
  _listeners = {}
  
  listen(eventName, handle){
    var listener = this._listeners[eventName];
    if(listener){
      listener.push(handle);
    }else{
      this._listeners[eventName] = [handle];
    }
  }
  
  remove(eventName, handle){
    var listener = this._listeners[eventName];
    if(listener){
      listener.filter((l) => l !== handle);
    }
  }  
  emit(eventName, ...args){
    var listener = this._listeners[eventName];
    if(listener && listener.length){
      for(let l of listener){
        l(...args);
      }
    }
  }
}

var event = new EventEmitter();
export default event
```
3. Redux

Redux主要包括三部分: action、reducer、store

#### action
action是一个对象, type属性是必须的, 可以传入其他数据; 一般通过`store.dispatch()`将action传到store, 它是store数据的唯一来源

#### reducer
reducer是一个**纯函数**, 接受旧的state和action, 根据action的type返回一个新的state。
根据业务逻辑可以分为多个reducer, 通过combineReducers将它们合并。
注意:
不要修改state, 应该是用`Object.assign()`新建一个副本或者使用es7的对象展开运算符`{...state, ...newState}`

#### store
store有以下职责:
1. 提供`getState()`方法获取state
2. 提供`dispatch(action)`方法更新state
3. 提供`subscribe(listener)`注册监听器, 返回的函数可以注销监听器

大致流程: 调用`store.dispatch()`, 将action对象传入,然后在内部会调用传入的reducer函数, 根据action的type类型, 返回一个新的state, 然后调用监听函数
重新渲染

#### React Redux

react-redux提供了Provider和connect

##### Provider
Provider是一个组件, 接受store作为props, 然后将它传入context中, 这样它的子组件就能通过`this.context`获取store了

##### connect
connect是一个高阶函数, 里面定义了一个Connect组件, 被包装组件作为他的子组件, 最后返回Connect组件。                                            
在Connect组件中,会从context中取出store并将stateProps、dispatchProps和传给Connect的props全部传给被包装组件, 还会在componentWillMount中注册监
听函数。这时被包装组件就可以调用传入的一些方法来通过reducer函数更新state, 监听到state发生变化, 会调用setState更新组件。


































