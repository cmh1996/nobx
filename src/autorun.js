import dependenceManager from './dependenceManager';

const autorun = function(cb){
	dependenceManager.beginCollect(cb);
	cb();
	dependenceManager.endCollect();
}

export default autorun;