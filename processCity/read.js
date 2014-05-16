var fs = require('fs');
var lazy = require("lazy");
var request =  require("request");

var CITY={};


var getDistance = function(from,to){

	return 0;
};

var processMileage=function(){
	console.log("I am in processMileage");
	console.log(JSON.stringify(CITY));
};//END OF processMileage....



var n = 1;
 new lazy(fs.createReadStream('city.csv'))
 .lines
 .forEach(function(line){
	var c1 = line.toString();
	var c2 =  c1.split(",");
		if(c2[0]){
			var city = c2[1];
			request("http://api.map.baidu.com/geocoder/v2/?address="+city+"&output=json&ak=5Ncu8OIBukFnwtMVcZ12jhC6",function(err,res){
				
				//{"status":0,"result":{"location":{"lng":122.16987209835,"lat":30.036010302554},"precise":0,"confidence":12,"level":"\u57ce\u5e02"}}
				if(res.body){
					var bb = JSON.parse(res.body);
					if(bb.result && bb.result.location){
						n = n + 1;
						console.log(c2[0]);
						console.log(c2[1]);
						console.log(JSON.stringify(bb.result.location));
						
						CITY[c2[0]]={};

						CITY[c2[0]].number      = c2[0];
						CITY[c2[0]].name        = c2[1];
						CITY[c2[0]].location    = JSON.stringify(bb.result.location);


						if(n===322){
							console.log(n+"   request...end");
							processMileage();
						}

					}
				}else{
					console.log("ERR!");
				}
			});
			//console.log(c2[0]+"\t"+c2[1]);
		}
 }).on('pipe',function(){
			 console.log("END")
 });
