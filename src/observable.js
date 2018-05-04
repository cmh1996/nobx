import Observable from './ObservableClass';

//把原对象的get和set代理到$nobx这个代理对象上
function extendObservableProperty(obj,key){
	const $nobx = new Observable(obj[key]);
	Object.defineProperty(obj,key,{
		get(){
			return $nobx.get();
		},
		set(value){
			return $nobx.set(value);
		}
	});
	//递归深层来代理
	if(typeof obj[key] === 'object'){
		for(let i in obj[key]){
			if(obj[key].hasOwnProperty(i)){
				extendObservableProperty(obj[key],i);
			}
		}
	}
}

//遍历对象中的每个key
function extendObservable(obj){
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			extendObservableProperty(obj,key);
		}
	}
}

//修饰器
function observable(target,name,descriptor){
	/*
	当装饰器用于类属性时，
	descriptor将变成一个叫“类属性描述符”的东西，其区别在于没有value和get或set，
	且多出一个initializer属性，类型是函数，
	在类构造函数执行时，initializer返回的值作为属性的值
	*/
	var value = descriptor.initializer.call(this);
	if(typeof value === 'object'){
		extendObservable(value);
	}
	var $nobx = new Observable(value);
	return {
		enumerable:true,
		configurable:true,
		get:function(){
			return $nobx.get();
		},
		set:function(value){
			if(typeof value === 'object'){
				extendObservable(value);
			}
			return $nobx.set(value);
		}
	}
}


export default observable;