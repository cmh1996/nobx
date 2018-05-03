import dependenceManager from './dependenceManager';

var cpIDCounter = 0;
class Computed{
	value = null;
	getter = null;
	target = null;
	obID = 0;
	hasBindAutoReCompute = false;
	constructor(target,getter){
		this.cpID = 'cp-'+(cpIDCounter++);
		this.target = target;
		this.getter = getter;
	}

	_reCompute(){
		this.value = this.getter.call(this.target);
		dependenceManager.trigger(this.cpID);
	}

	_bindAutoReCompute(){
		if(!this.hasBindAutoReCompute){
			this.hasBindAutoReCompute = true;
			dependenceManager.beginCollect(this._reCompute,this);
			this._reCompute();
			dependenceManager.endCollect();
		}
	}

	get(){
		this._bindAutoReCompute();
		dependenceManager.collect(this.cpID);
		return this.value;
	}
}

export default Computed;