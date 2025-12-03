//LEVEL: EASY

//Display all the keys and values of a nested object

let objPerson = {
	name: 'vaibhav',
  phone: '98910066766',
  details: {
  	face: {
    	eyes: 'black',
      teeth: 'white'
    },
    middle: {
    	dimensions: {
      	waist: 60,
        chest: 60
      }
    }
  }
}

function displayNestedData(obj){
	for(const key in obj){
  	if(typeof obj[key] !== "object"){
    	console.log(key, obj[key])
    } else {
    	displayNestedData(obj[key])
    }
  }
}

displayNestedData(objPerson);