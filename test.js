process.stdin.resume();
process.stdin.setEncoding('utf8');

var stdin = '';
var array = [];
var junk = [];
process.stdin.on('data', function (chunk) {
	for (var i = 0; i < chunk.length; i++) {
		if (chunk[i] === 7 || chunk[i] === 5 || chunk[i] % 5 === 0 || chunk[i] % 7 === 0) {
			junk.push(chunk[i]);
		}
		else {
			array.push(chunk[i]);
		}
	}
	console.log(array);
}).on('end', function() {
	var answer = 0;
	array.forEach(function(item){
		answer += item;
	});
	process.stdout.write(answer.toString() + '\n');
});
