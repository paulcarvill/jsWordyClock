// element should be an HTML element to append the clock to.
// two 'pre' elements are appended, both positioned absolutely, one over the other.
// fontsize should be a string, and include the unit of measurement e.g. '10px' or '1.5em'
var JsWordyClock = function(element, fontsize) {
	if (!element || typeof element !== 'object') {
		throw new Error('You need to supply an HTML element for me to append the clock to')
	}
	this.element = element;
	this.fontsize = fontsize;
	this.FACE_STYLE = '#ddd';
	this.CLOCK_STYLE = '#000';
	this.init();
}

JsWordyClock.prototype.init = function() {
	this.createElements()
	
	var now = this.getTime();
	this.hoursAndMinutes = this.roundToClosest5Minutes(now[0], now[1]);
	var wordyTime = this.convertToWords(this.hoursAndMinutes[0], this.hoursAndMinutes[1]);
	
	this.attachedFormattedText(this.clock, this.blankOutTargetFromBase(wordyTime.toUpperCase(), this.clockFace), this.CLOCK_STYLE);
	 
	var that = this;
	setTimeout(function(){ that.refresh() }, 60000);
}

JsWordyClock.prototype.getTime = function() {
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	return [hours, minutes]
}

JsWordyClock.prototype.attachedFormattedText = function(ele, text, style){
	if (ele.tagName == "PRE" && "outerHTML" in ele) {
		ele.outerHTML = '<PRE id="face" style="position:absolute;margin:0;">' + text + '</PRE>';
		var ele = document.getElementById('face');
		ele.id = "";
		this.addStyle(ele, style);
	} else {
		ele.innerHTML = text;
	}
	if (!this.element.style.minHeight) {
		this.element.style.minHeight = ele.offsetHeight + 'px'; // compensate for absolute positioning of clock face
	}
}

JsWordyClock.prototype.addStyle = function(ele, color) {
	ele.style.position = 'absolute';
	ele.style.margin = 0;
	ele.style.color = color;
}

JsWordyClock.prototype.createElements = function() {
	this.element.style.fontFamily = 'monospace';
	this.element.style.fontSize = this.fontsize || '1em';

	var face = document.createElement('pre');
	this.addStyle(face, this.FACE_STYLE);
	this.element.appendChild(face);
	this.attachedFormattedText(face, this.clockFace, this.FACE_STYLE);
 
	this.clock = document.createElement('pre');
	this.addStyle(this.clock, this.CLOCK_STYLE);
	this.element.appendChild(this.clock);
}

JsWordyClock.prototype.refresh = function() {
	var now = this.getTime();
	var newHoursAndMinutes = this.roundToClosest5Minutes(now[0], now[1]);
	if (newHoursAndMinutes != this.hoursAndMinutes) {
		this.clock.innerHTML = "";
		var wordyTime = this.convertToWords(newHoursAndMinutes[0], newHoursAndMinutes[1]);
		this.attachedFormattedText(this.clock, this.blankOutTargetFromBase(wordyTime.toUpperCase(), this.clockFace));
	}
	var that = this;
	setTimeout(function(){ that.refresh() }, 60000);
}

JsWordyClock.prototype.clockFace = "ITLISXABOUT\nACQUARTERDC\nTWENTYRFIVE\nHALFBTENFTO\nPASTEXSNINE\nONESIXTHREE\nFOURFIVETWO\nEIGHTELEVEN\nTENMIDNIGHT\nSEVENTYNOON";

JsWordyClock.prototype.minuteNameLookup = {
	0: '',
	5: 'five past ',
	10: 'ten past ',
	15: 'a quarter past ',
	20: 'twenty past ',
	25: 'twenty five past ',
	30: 'half past ',
	35: 'twenty five to ',
	40: 'twenty to ', 
	45: 'a quarter to ',
	50: 'ten to ',
	55: 'five to '
}
 
JsWordyClock.prototype.hourNameLookup = {
	0: 'midnight',
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'noon',
	13: 'one',
	14: 'two',
	15: 'three',
	16: 'four',
	17: 'five',
	18: 'six',
	19: 'seven',
	20: 'eight',
	21: 'nine',
	22: 'ten',
	23: 'eleven',
	24: 'midnight'
}

JsWordyClock.prototype.roundToClosest5Minutes = function(hours, minutes) {
	var mins = Math.round(minutes / 5) * 5;
	
	if (mins === 60) {
		return [(hours + 1), 0]
	} else {
		return [hours, mins]
	}
}

JsWordyClock.prototype.convertToWords = function(hours, minutes) {
	if (minutes > 30) {
		hours = hours + 1;
	}
	var timeInWords = "it is about " + (minutes ? this.minuteNameLookup[minutes] : '') + this.hourNameLookup[hours];
	return timeInWords
}

JsWordyClock.prototype.convertToRegex = function(timeInWordsToConvert){
	var words = timeInWordsToConvert.split(' ');
	for(var i = 0, j = words.length; i < j; i++) {
 		words[i] = '(' + words[i] + ')';
	}
	return new RegExp('[\\s\\S]*' + words.join('[\\s\\S]*') + '[\\s\\S]*')
}

JsWordyClock.prototype.blankOutTargetFromBase = function(target, baseText) {
	var targetRegex = this.convertToRegex(target);
	var blankedString = baseText.replace(/./g, " ");
	var matcher = baseText.match(targetRegex); // returns ['fullmatch', 'full', 'match']
	var outputArray = blankedString.split('');
	var concatenatedOutput = "";
	var counter = 0;
 
	for (var i = 1, j = matcher.length - 1; i <= j; i++) {
		var index = baseText.indexOf(matcher[i], counter); // start formlast found position
		concatenatedOutput += outputArray.slice(counter, index).join('');
		concatenatedOutput += matcher[i];
		counter = index + matcher[i].length;
	}
	concatenatedOutput += outputArray.slice(counter, outputArray.length).join('');
	return concatenatedOutput
}