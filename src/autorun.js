import globalState from './globalState';

const autorun = function(cb){
	globalState.beginCollect(cb);
	cb();
	globalState.endCollect();
}

export default autorun;