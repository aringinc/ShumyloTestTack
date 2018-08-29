$(document).ready(function() {
	var n = Math.floor(Math.random()*6) + 3;
	var m = Math.floor(Math.random()*8) + 3;
	var A = new Array(n);
	for (var i = 0; i < n; i++) {
		A[i] = new Array(m);
		for (j = 0; j < m; j++) {
			A[i][j] = Math.floor(Math.random()*4) + 1;
		}
	}

	console.log("row number: " + n);
	console.log("column number: " + m);
	var showField = (function() {
		var s = "";
		for (var i = 0; i < n ;i++) {
			for (var j = 0; j < m ;j++)
				var s = s + A[i][j] + " ";
			var s = s + "\n";
		}
		console.log(s);
	});

	var findElements = (function(x,y, tempArray) {
		var curElement = tempArray[x][y]
		tempArray[x][y] = 0
		$("#btn"+x+y).addClass("selected");
		if (x-1 >= 0 && tempArray[x-1][y] == curElement)
			findElements(x-1, y, tempArray);
		if (x+1 < n && tempArray[x+1][y] == curElement)
			findElements(x+1, y, tempArray);
		if (y-1 >= 0 && tempArray[x][y-1] == curElement)
			findElements(x, y-1, tempArray);
		if (y+1 < m && tempArray[x][y+1] == curElement)
			findElements(x, y+1, tempArray);
	});

	var createField = (function() {
		for (var i = 0; i < n ;i++) {
			$("#field").html($("#field").html() + "<div id='row"+i+"'></div>")
			for (var j = 0; j < m ;j++) {
				var img ="";
				switch (A[i][j]) {
					case 1:
						img = "<img src='img/1.png'></img>";
						break;
					case 2:
						img = "<img src='img/2.png'></img>";
						break;
					case 3:
						img = "<img src='img/3.png'></img>";
						break;
					case 4:
						img = "<img src='img/4.png'></img>";
						break;
				}
				$("#row"+i).html($("#row"+i).html() + "<button id='btn"+i+j+"'>"+img+"</button>");
				
			}
			var s = s + "\n";
		}
		$("button").off().on("click",function(e) {
				id = e.currentTarget.id;
				x = parseInt(id[id.length-2]);
				y = parseInt(id[id.length-1]);
				$("button").removeClass("selected");
				$("button").removeClass("mainSelected")
				var tempArray = JSON.parse(JSON.stringify(A));
				$("#btn"+x+y).addClass("mainSelected")
				findElements(x, y, tempArray);
			});
	})
	createField();
});