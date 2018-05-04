import globalState from './globalState';

var cpIDCounter = 0;
class Computed{
	value = null;
	getter = null;
	target = null;
	obID = 0;
	autoRecomputed = false;
	constructor(target,getter){
		this.cpID = 'cp-'+(cpIDCounter++);
		this.target = target;
		this.getter = getter;
	}

	//重新取值并触发更新
	//这个函数也是ob的watcher之一，ob更新就会触发这个函数，从而做到observableData有变化时重新compute
	_reCompute(){
		this.value = this.getter.call(this.target);
		globalState.trigger(this.cpID);
	}

	_bindAutoReCompute(){
		//看看它有没有被绑定过，没有的话就把它收集起来，让它成为observable的观察者之一，然后重新计算它
		if(!this.autoRecomputed){
			this.autoRecomputed = true;
			globalState.beginCollect(this._reCompute,this);
			this._reCompute();
			globalState.endCollect();
		}
	}

	//当要取computed的值的时候会触发
	get(){
		this._bindAutoReCompute();
		//重新收集依赖
		globalState.collect(this.cpID);
		return this.value;
	}
}

export default Computed;