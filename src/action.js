const action = function(target,name,descriptor){
	const func = descriptor.value;
	return {
		get(){
			return (...args)=>{
				func.call(this,...args);
			}
		}
	}
}
export default action;