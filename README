#JsWordyClock
JsWordyClock is a JavaScript port of [Ken Lim's pyWordyClock](http://kenlim.github.com/pyWordyClock/), with the appropriate modifications for use on the web as an [Internet Clock](http://internetclocks.tumblr.com/). It's a word-based, approximate time clock, accurate to within about 3 minutes. It comes with its own JavaScript test suite.

##Usage:
There is a single constructor function called JsWordyClock. It takes two arguments:

_required_: an HTML element, used as the container for the clock
_optional_: a font size, in string form, including the measurement unit. Defaults to '1em' if omitted.

Include either src/jsWordyClock or dist/jsWordyClock-min.js on your web page:

    <script src="jsWordyClock-min.js"></script>

then create an instance of the clock like this:

    var div = document.getElementById('myClock');
    var clock = new JsWordyClock(div, '38px');


##Build/Minification:
Tools are included to create the minified version of the script. On *nix run the build.sh bash script in the root directory, which invokes the supplied YUI-Compressor and puts a copy of the minified script in both the dist and web directories. to run it use:

    ./build.sh

If you have any problems you may need to use:

    sudo ./build.sh

##Demo:
There is a complete working demo in the web directory. Just open the index.html file in a web browser.

##Tests
There is a test suite in the test directory. The lib directory contains the JsTestDriver test runner you will need to run the tests. To run the tests:

1. open a terminal window
2. cd into the root directory of the JsWordyClock repo
3. java -jar lib/JsTestDriver-1.2.2.jar --port 9876
4. open a browser at 127.0.0.1:9876
5. click the 'capture this browser' link
6. open a new terminal window
7. java -jar lib/JsTestDriver-1.2.2.jar --reset --config conf/jsTestDriver.conf --tests all
8. tests will be run in the captured browser (you may capture more than one at a time if you want) and the results reported in the terminal window you ran them from