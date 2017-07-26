[{
	id: '/#sieroi3892ry',
	name: 'Peter',
	room: 'Room X'

}]
//addUser(id,name,room)

//removeUser(id)
//getUser(id)//will return object above
//getUserList(room)


class Users{
	constructor (){
		this.users=[];
	}
	addUser(id,name,room){
		let user={id,name,room};
		this.users.push(user);
		return user;
	}

	removeUser(id){
		let user=this.users.filter((user)=>user.id===id)[0];
			if(user){
				this.users =this.users.filter((user)=> user.id!==id);
			}
		return user;
	}
	getUser(id){
		return this.users.filter((user)=>user.id===id)[0];

	}
	getUserList(room){
		let users=this.users.filter((user)=> user.room === room);
		let namesArray= users.map((user)=>user.name);
		return namesArray;
	}
}

module.exports= {Users};

// class Person {
// 	constructor(name,room){
// 	this.name=name;
// 	this.age=age;
// 	}

// 	getUserDescription(){
// 		return `${this.name} is ${this.age} year(s) old.`;
// 	}

// }

// let me= new Person();
// let description=me.getUserDescription();
// console.log(decription);



