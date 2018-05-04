import globalState from './globalState';

var obIDCounter = 0;
class Observable{
	constructor(value){
		this.obID = 'ob-'+(obIDCounter++);
		if(Array.isArray(value)){
			this._proxyArray(value);
		}else{
			this.value = value;
		}
	}

	get(){
		globalState.collect(this.obID);
		return this.value;
	}

	set(value){
		if(Array.isArray(value)){
			this._proxyArray(value);
		}else{
			this.value = value;
		}
		this.trigger();
	}

	trigger(){
		globalState.trigger(this.obID);
	}

	//如果是数组的话，还要做一层拦截
	_proxyArray(value){
		this.value = new Proxy(value,{
			set:(target,key,value,receiver)=>{
				const oldValue = Reflect.get(target,key,receiver);
				const result = Reflect.set(target,key,value,receiver);
				if (key === "length" || value !== oldValue) {
					this.trigger();
		        }
				return result;
			}
		})
	}
}

export default Observable;