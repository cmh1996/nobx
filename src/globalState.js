var curObserver = null;
var curTarget = null;
var observerStack = [];
var targetStack = [];
var isCollecting = false;

const globalState = {
	//存储所有observable的全局ID和handler的映射关系
	_store:{},

	_addCurObserver(obID){
		this._store[obID] = this._store[obID] || {};
		this._store[obID].target = curTarget;
		this._store[obID].watchers = this._store[obID].watchers || [];
		this._store[obID].watchers.push(curObserver);
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
		if(curObserver){
			this._addCurObserver(obID);
		}
		//return false;
	},

	beginCollect(observer,target){
		isCollecting = true;
		observerStack.push(observer);
		targetStack.push(target);
		curObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
		curTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
	},

	endCollect(){
		isCollecting = false;
		observerStack.pop();
		targetStack.pop();
		curObserver = observerStack.length>0?observerStack[observerStack.length-1]:null;
		curTarget = targetStack.length>0?targetStack[targetStack.length-1]:null;
	}
}

export default globalState;