
jsWordyClockTest = TestCase("jsWordyClock");

jsWordyClockTest.prototype.setUp = function(){
	/*:DOC += <div id="container"></div>*/
	this.jsWordyClock = new JsWordyClock(document.getElementById('container'));
};

jsWordyClockTest.prototype.tearDown = function(){

};

jsWordyClockTest.prototype.testShouldRoundTimeToClosest5MinuteBlock = function() {
	assertEquals([1, 0], this.jsWordyClock.roundToClosest5Minutes(1, 0));
	assertEquals([1, 5], this.jsWordyClock.roundToClosest5Minutes(1, 3));
	assertEquals([1, 5], this.jsWordyClock.roundToClosest5Minutes(1, 5));
	assertEquals([1, 15], this.jsWordyClock.roundToClosest5Minutes(1, 17));
	assertEquals([1, 30], this.jsWordyClock.roundToClosest5Minutes(1, 29))
	assertEquals([1, 45], this.jsWordyClock.roundToClosest5Minutes(1, 44))
	assertEquals([1, 45], this.jsWordyClock.roundToClosest5Minutes(1, 46))
};

jsWordyClockTest.prototype.testShouldRoundToNextHourIfWithin2AndAHalfMinutes = function() {
	assertEquals([2,0], this.jsWordyClock.roundToClosest5Minutes(1, 58))
}

jsWordyClockTest.prototype.testShouldConvertTimeToWordsCorrectly = function() {
	assertEquals("it is about twenty past three", this.jsWordyClock.convertToWords(3, 20))
	assertEquals("it is about ten", this.jsWordyClock.convertToWords(10, 0))
	assertEquals("it is about ten past ten", this.jsWordyClock.convertToWords(10, 10))
	assertEquals("it is about a quarter past ten", this.jsWordyClock.convertToWords(10, 15))
}

jsWordyClockTest.prototype.testShouldDisplayTimeToNextHourIfPast30Minutes = function() {
	assertEquals("it is about ten to ten", this.jsWordyClock.convertToWords(9, 50))
	assertEquals("it is about a quarter to ten", this.jsWordyClock.convertToWords(9, 45))
}

jsWordyClockTest.prototype.testShouldRecognizeMidnight = function() {
	assertEquals("it is about midnight", this.jsWordyClock.convertToWords(0, 0))
	assertEquals("it is about five to midnight", this.jsWordyClock.convertToWords(23, 55))
}


jsWordyClockTest.prototype.testShouldRecognizeNoon = function () {
	assertEquals("it is about noon", this.jsWordyClock.convertToWords(12, 0))
	assertEquals("it is about ten past noon", this.jsWordyClock.convertToWords(12, 10))
}
    
jsWordyClockTest.prototype.testShouldBlankOutCharsThatDoNotMatchStrings = function() {
	var baseString = "xxxxxinternetxxxclockxxx"
	assertEquals("     internet   clock   ", this.jsWordyClock.blankOutTargetFromBase("internet clock", baseString))
}

jsWordyClockTest.prototype.testShouldWorkWithNewLines = function(){
	var baseString = "xxxxxinternet\nclockxxx";
	assertEquals("     internet\nclock   ", this.jsWordyClock.blankOutTargetFromBase("internet clock", baseString))
}

jsWordyClockTest.prototype.testActualUseCase = function() {
	var expectedResult = "IT IS ABOUT\n           \n           \n     TEN TO\n           \n           \n           \n           \nTEN        \n           "
	assertEquals(expectedResult, this.jsWordyClock.blankOutTargetFromBase("it is about ten to ten".toUpperCase(), this.jsWordyClock.clockFace));
}