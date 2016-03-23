/*function Weapon(name, position, type, atk, capacity, carryCapacity, weight, dualable);
 *for more detail please check the constructor */
const WEAPONS = {
	0 : new Weapon("Fire Axe", 2, 2, 70, 0, 0, 70, 0),
	1 : new Weapon("Crowbar",  2, 2, 50, 0, 0, 50, 0),
	2 : new Weapon("Pistol",   2, 1, 20, 15, 0, 25, 3),
	3 : new Weapon("Dual Pistol", 2, 1, 20, 30, 9, 20, 0)
};

const ITEMS = {
	0 : new Item("Pipe Bomb", 4),
	1 : new Item("Bile Bomb", 4)
}

const IMAGES = {
	0 : new ImageURL("https://choose-your-own-adventure-leohu.c9users.io/picture/loading.jpg", "#000")
};

const EVENTS = {
	0 : new RefreshDisplay("Please choose a map"),
	1 : new Choice([
			new Option(["Dead Center", new gotoLine(2)]),
			new Option(["Dark Carnival", new gotoLine(9)])
		]),
	2 : new UpdateOutput([
			"Here should come some story or conversation or what ever",
			"And Wange is going to add it so Leo will not care about it for now",
			"All Leo needs is to test if this object works."
		]),
	3 : new RefreshDisplay("Please choose a weapon"),
	4 : new Choice([
			new Option([WEAPONS[0].name,
				new gotoLine(5),
				new weaponEquip(0),
				new systemMessage("You Pickup a " + WEAPONS[0].name)
				]),
			new Option([WEAPONS[1].name,
				new gotoLine(5),
				new weaponEquip(1),
				new systemMessage("You Pickup a " + WEAPONS[1].name)
				]),
			new Option([WEAPONS[2].name,
				new gotoLine(5),
				new weaponEquip(2),
				new systemMessage("You Pickup a " + WEAPONS[2].name)
				]),
		]),
	5 : new RefreshDisplay("Are you going to open the door?"),
	6 : new Choice([
			new Option(["Yes", new gotoLine(7), new systemMessage("You opened the door.")]),
			new Option(["No", new gotoLine(9), new systemMessage("You just stood in front of the and did nothing.")])
		]),
	7 : new RefreshDisplay("There are zombies in the hall way!"),
	8 : new Choice([
			new Option(["Fight!", new gotoLine(13), new systemMessage("You decided to fight against the zombies")]),
			new Option(["Stay", new gotoLine(12), new systemMessage("Zombies came onto you and ate you.")])
		]),
	9 : new RefreshDisplay("Zombies are tyring to break in!"),
	10 : new Choice([
			new Option(["Fight!", new gotoLine(13), new systemMessage("You decided to fight against the zombies")]),
			new Option(["Stay", new gotoLine(11), new systemMessage("Zombies came onto you and ate you.")])
		]),
	11 : new RefreshDisplay("Game Over"),
	12 : new Choice([
			new Option(["Restart", new gotoLine(0), new initializeGame()])
		]),
	13 : new RefreshDisplay("Bots are killing the zombies in the hall way."),
	14 : new Choice([
			new Option(["Kill zombies with them", new gotoLine(15), new systemMessage("The way is clear.")]),
			new Option(["Go ahead and see what's happining", new gotoLine(11), 
				new systemMessage("Suddently, an incoming Charger charged you through a window from the eighth floor. The charger died... with you.")])
		]),
	15 : new RefreshDisplay("On the table, there is a " + ITEMS[0].name + " and a " + ITEMS[1].name + "on the table."),
	16 : new Choice([
			new Option(["Pickup the " + ITEMS[0].name, new gotoLine(17), new systemMessage("You picked up the " + ITEMS[0].name)]),
			new Option(["Pickup the " + ITEMS[1].name, new gotoLine(17), new systemMessage("You picked up the " + ITEMS[1].name)])
		]),
	17 : new RefreshDisplay("The elevator is still on!"),
	18 : new Choice([
			new Option(["Get in the elevator and go to the first floor", new gotoLine(19)]),
			new Option(["We are not suppose to use the elevator in a fire. Find another way!"], new gotoLine(11),
				new systemMessage("Sadly the stair is blocked. There is no other way to go. The hotel is now filled with fire. Survivors are failed to escape."))
			])
};


var inv = new Inventory(0, 2, 0, 0, 0, 0);

var save = new Save(0, false, inv);

function Weapon(name, position, type, atk, capacity, carryCapacity, cooldown, dualable) {
	this.name = name;
	this.position = position; //Inventory position of the weapon. 1 = mainArm, 2 = sideArm;
	this.type = type; // 1 = Gun, 2 = Melee;
	this.atk = atk;   // The base number of the damage this weapon gives;
	this.capacity = capacity; // ammo capacity;
	this.carryCapacity = carryCapacity; // total amount of ammo this weapon can carry;
	this.cooldown = cooldown; // the more heavy this weapon is, the less round of attack can be made;
	this.dualable = dualable; // if this weapon can be dual;
}

function Item(name, position) {
	this.name = name;
	this.position = position;
}

function ImageURL(URL, BGColor) {
	this.URL = URL;
	this.BGColor = BGColor;
	this.bodyBG = bodyBG;
	
	function bodyBG() {
		document.body.style.background = this.BGColor + " url('" + this.URL + "') no-repeat";
	}
}

function UpdateBG(id) {
	this.run = run;
	function run() {
		IMAGES[id].bodyBG();
	}
}

function initializeGame() {
	this.run = run;
	
	function run() {
		inv = new Inventory(0, 2, 0, 0, 0, 0);
		save = new Save(0, false, inv);
		document.getElementById("output").innerHTML = "";
	}
}


function systemMessage(input) {
	this.run = run;
	function run() {
		updateOutput();
		return false;
	}
	function updateOutput() {
		document.getElementById("output").innerHTML += "<p class=\"text-primary\">" + input + "</p>";
		document.getElementById('output').scrollTop += 20;
	}
	
}

function UpdateOutput(argu) {
	this.run = run;
	var counter = 0;
	var id;
	
	function run() {
		updateOutput();
		if (argu.length > 1) {
			id = setInterval(updateOutput, 500);
		}
		return true;
	}
	function updateOutput() {
		if (counter == argu.length) {
			clearInterval(id);
			save.progress++;
			next();
			counter = 0;
		} else if (counter > argu.length) {
			clearInterval(id);
		} else if (counter < argu.length) {
			document.getElementById("options").innerHTML = "";
			document.getElementById("display").innerHTML = "";
			document.getElementById("output").innerHTML += argu[counter] + "<br />";
			document.getElementById('output').scrollTop += 20;
			counter++;
		}
	}
}


function Inventory(mainArm, sideArm, deployableItem, throwableItem, medicalItem, holdingItem) {
	this.mainArm = mainArm;
	this.sideArm = sideArm;
	this.deployableItem = deployableItem;
	this.throwableItem = throwableItem;
	this.medicalItem = medicalItem;
	this.holdingItem = holdingItem;
}

function weaponEquip(weaponID) {
	this.run = run;
	function run() {
		if (weaponID < Object.keys(WEAPONS).length){
			if(WEAPONS[weaponID].position == 1) {
				inv.mainArm = weaponID;
			} else if(WEAPONS[weaponID].position == 2) {
				if (WEAPONS[weaponID].dualable > 0) {
					inv.sideArm = WEAPONS[weaponID].dualable;
				} else {
				inv.sideArm  = weaponID;
				}
			}
		}
	}
}





function Save(progress, eventBreak, inv) {
	this.progress = progress;
	this.eventBreak = eventBreak;
	this.inv = inv;
}


function next(buttonID) {
	save.eventBreak = false;
	triggerEvent();
}


function gotoLine(id) {
	this.run = run;
	function run() {
		save.progress = id;
	}
}

function triggerEvent() {
	while (!save.eventBreak && save.progress < Object.keys(EVENTS).length) {
		save.eventBreak = EVENTS[save.progress].run();
		if(!save.eventBreak) {
			save.progress++;
		}
	}
}

function Option(argu) {
	this.description = argu[0];
	this.print = print;
	this.run = run;
	function print(i) {
		document.getElementById("options").innerHTML += 
		"<a href=\"#\" class=\"btn btn-default  btn-success btn-block\" onclick=\"EVENTS[" + save.progress + "].next(" + i + ")\">" + this.description + "</a>";
		return false;
	}
	function run() {
		for (var i = 1; i < argu.length; i++) {
			argu[i].run();
			save.eventBreak = false;
			triggerEvent();
		}
	}
}


function Choice(argu) {
	this.run = run;
	this.next = next;
	function run() {
		document.getElementById("options").innerHTML = "";
		for (var i = 0; i < argu.length; i++) {
			argu[i].print(i);
		}
		return true;
	}
	
	function next(buttonID) {
		argu[buttonID].run();
	}
}

	

function RefreshDisplay(input) {
	this.run = run;
	function run() {
		document.getElementById("display").innerHTML = input + "<br />";
		return false;
	}
}