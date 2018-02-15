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

```
3. Redux
































