let fs = require('fs')

function get_file_content(){
  return new Promise(function (resolve, reject) {
    fs.readFile('../src/data.json', function(err,data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function test(){
	get_file_content().then(data => {
		let person = data.toString();
		person = JSON.parse(person);
		let rets = person.data;
		rets = 'gesger'
		console.log(rets)
		return rets;
	}).catch(err => console.log(err));
}

test();