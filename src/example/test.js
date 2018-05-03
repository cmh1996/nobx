import {observable,autorun,computed} from '../index';

class testStore{
	@observable data = {a:9,b:[1,2]};
	@computed get dataA(){
		return this.data.a;
	}
}

const test = new testStore();

autorun(()=>{
	console.log(test.data.b,test.dataA);
})

test.data.a = '111';