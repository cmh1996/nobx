import Computed from './ComputedClass';

const computed = function(target,name,descriptor){
	const getter = descriptor.get;
	console.log(target)
	var computed = new Computed(target,getter);

	return{
		enumerable:true,
		configurable:true,
		get:function(){
			computed.target = this;
			return computed.get();
		}
	}
}

export default computed;