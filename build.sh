# run using:
# sudo ./build.sh

# change into the bash script directory, whatever path you are actually running it from
scriptdir=`dirname $BASH_SOURCE`
cd $scriptdir

# execute YUI compressor
# use -v for verbose output
java -jar lib/yuicompressor-2.4.2.jar \
--type js \
--charset UTF-8 \
--preserve-semi \
-o dist/jsWordyClock-min.js src/jsWordyClock.js

cp dist/jsWordyClock-min.js web