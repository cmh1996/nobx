var nowObserver = null;
var nowTarget = null;
var observerStack = [];
var targetStack = [];
var isCollecting = false;

const dependenceManager = {
	//存储所有observable的全局ID和handler的映射关系
	_store:{},

	_addNowObserver(obID){
		this._store[obID] = this._store[obID] || {};
		this._store[obID].target = nowTarget;
		this._store[obID].watchers = this._store[obID].watchers || [];
		this._store[obID].watchers.push(nowObserver);
	},

	trigger(obID){
		var ds = this._store[obID];
		if(ds && ds.watchers){
			ds.watchers.forEach((d)=>{
				d.call(ds.target || this);
			})
		}
	},

	collect(obID){
		if(nowObserver){
			this._addNowObserver(obID);
		}
		return false;
	},

	beginCollect(observer,target){
		isCollecting = true;
		observerStack.push(observer);
		targetStack.push(target);
		nowObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
		nowTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
	},

	endCollect(){
		isCollecting = false;
		observerStack.pop();
		targetStack.pop();
		nowObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
		nowTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
	}
}

export default dependenceManager;