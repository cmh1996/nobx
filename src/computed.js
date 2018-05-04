import Computed from './ComputedClass';

const computed = function(target,name,descriptor){
	//target在这里是测试代码中的testStore
	//getter是computed包裹着的那个函数，在这里是function dataA(){...}
	const getter = descriptor.get;
	
	//实例化一个computed
	var computed = new Computed(target,getter);

	return{
		enumerable:true,
		configurable:true,
		get:function(){
			//computed.target = this;
			return computed.get();
		}
	}
}

export default computed;