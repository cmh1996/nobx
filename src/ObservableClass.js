import dependenceManager from './dependenceManager';

var obIDCounter = 0;
class Observable{
	constructor(value){
		this.obID = 'ob-'+(obIDCounter++);
		if(Array.isArray(value)){
			this._wrapArrayProxy(value);
		}else{
			this.value = value;
		}
	}

	get(){
		dependenceManager.collect(this.obID);
		return this.value;
	}

	set(value){
		if(Array.isArray(value)){
			this._wrapArrayProxy(value);
		}else{
			this.value = value;
		}
		this.trigger();
	}

	trigger(){
		dependenceManager.trigger(this.obID);
	}

	//如果是数组的话，还要做一层拦截
	_wrapArrayProxy(value){
		this.value = new Proxy(value,{
			set:(target,key,value)=>{
				target[key] = value;
				if(key!=='length'){
					this.trigger();
				}
				return true;
			}
		})
	}
}

export default Observable;