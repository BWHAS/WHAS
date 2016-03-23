const CHOICES = {
	0 : new choice("What?!", [], [], []),
	1 : new choice("Please choose a map", ["Dead Center", "Dark Carnival"], [2, 2], [0, 0]),
	2 : new choice("Please choose a weapon", ["Fire Axe", "Crobar", "Pistol"], [3, 3, 3], [11, 12, 13]),
	3 : new choice("Are you going to open the door?", ["YES", "NO"], [4, 5], [0, 0]),
	4 : new choice("There are zombies in the hall way!", ["Fight!", "Stay"], [6, 0], [0, 1]),
	5 : new choice("Zombies are trying to break to door!", ["Fight!", "Stay"], [6, 0], [0, 1])
};

function inputHandler(input) {
	if (input < 0) {
		updateGame(1);
	} else if(input >= 0) {
		updateGame(input);
	}
}

function updateGame(input) {
	refreshDisplay(input);
	refreshOption(input);
}


function refreshDisplay(input) {
	document.getElementById("display").innerHTML = CHOICES[input].desc + "<br />";
}

function printDisplay(input) {
	document.getElementById("display").innerHTML += CHOICES[input].desc + "<br />";
}

function refreshOption(input) {
	document.getElementById("options").innerHTML = "";
	for (var i = 0; i < CHOICES[input].option.length; i++) {
		document.getElementById("options").innerHTML += 
		"<a href=\"#\" class=\"btn btn-default  btn-success btn-block\" onclick=\"gameChoose(" + i + ", " + input +")\">" + CHOICES[input].option[i] + "</a>";
	}
}	

function printOption(input) {
	for (var i = 0; i < CHOICES[input].option.length; i++) {
		document.getElementById("options").innerHTML += 
		"<a href=\"#\" class=\"btn btn-default  btn-success btn-block\" onclick=\"gameChoose(" + i + ", " + input +")\">" + CHOICES[input].option[i] + "</a>";
	}
}

function gameChoose(input, choiceID) {
	updateGame(CHOICES[choiceID].jumpto[input]);
}

function choice(desc, option, jumpto, event) {
	this.desc = desc;
	this.option = option;
	this.jumpto = jumpto;
	this.event = event;
}
