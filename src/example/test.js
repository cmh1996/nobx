import {observable,autorun,computed,action} from '../index';

class testStore{
	@observable data = {
		a:1,
		b:2
	};
	@observable name = 'chambers';

	@computed get plus(){
		return (this.data[0]+this.name);
	}

	@action setData(val){
		this.name = val;
	}
}

const test = new testStore();

autorun(()=>{
	console.log(test.data.a)
})
test.data.a='wewewe';