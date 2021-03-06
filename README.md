BDD Assistant
=============

What is BDD Assistant?
----------------------

BDD Assistant is an open source project that pretends to facilitate the creation and execution of Behavior Driven Development (BDD) stories as a way to better define the requirements.
More info can be found in the [BDD Asssitant site](http://bddassistant.com).

Software is still in early stages.
We are looking for early adopters to help us out.
If you are interested in trying it out, please send an email to [viktor@farcic.com](mailto:viktor@farcic.com) for any help that you might need.


Running the application
-----------------------

### To run the application from the compressed release (bdd-assistant-X.X.X.tar.gz)
 
Download the bdd-assistant-X.X.X.tar.gz from the releases and uncompress. Run:

```bash
wget https://github.com/TechnologyConversations/TechnologyConversationsBdd/releases/download/0.5.0/bdd-assistant-0.5.0.tar.gz
tar -xzf bdd-assistant-0.5.0.tar.gz
cd bdd-assistant
target/universal/stage/bin/tcbdd
```

Open the [http://localhost:9000](http://localhost:9000) in you favorite browser.

### To compile and run the application from the release

Install **[Scala](http://www.scala-lang.org/download/)**, **[Play/Activator](http://www.playframework.com/download)** and **[SBT](http://www.scala-sbt.org/download.html)**

Download the release from the [GitHub releases page](https://github.com/TechnologyConversations/TechnologyConversationsBdd/releases).

```bash
sbt clean stage
target/universal/stage/bin/tcbdd
```

Open the [http://localhost:9000](http://localhost:9000) in you favorite browser.

### To compile and run the application from the latest code

Install **[Scala](http://www.scala-lang.org/download/)**, **[Play/Activator](http://www.playframework.com/download)** and **[SBT](http://www.scala-sbt.org/download.html)**

```bash
git clone https://github.com/TechnologyConversations/TechnologyConversationsBdd.git
sbt clean stage
target/universal/stage/bin/tcbdd
```

Open the [http://localhost:9000](http://localhost:9000) in you favorite browser.

### To run the application in development mode (re-compiles with every change to the code)

Install **[Scala](http://www.scala-lang.org/download/)**, **[Play/Activator](http://www.playframework.com/download)** and **[SBT](http://www.scala-sbt.org/download.html)**

```bash
git clone https://github.com/TechnologyConversations/TechnologyConversationsBdd.git
sbt run
```

Open the [http://localhost:9000](http://localhost:9000) in you favorite browser.

### To run the application from [Docker](https://www.docker.com/) container (experimental)

Install [Docker](https://www.docker.com/).

To run the main container:

```bash
docker run -d -p 9000:9000 --name bdd vfarcic/bdd
```

To run the main container with stories, composites and screenshots directories mapped outside the container:

```bash
STORIES_PATH=/data/bdd/data/stories
COMPOSITES_PATH=/data/bdd/composites
SCREENSHOTS_PATH=/data/bdd/screenshots
mkdir -p $STORIES_PATH $COMPOSITES_PATH $SCREENSHOTS_PATH
docker run -d -p 9000:9000 --name bdd \
  -v $STORIES_PATH:/opt/bdd/data/stories \
  -v $COMPOSITES_PATH:/opt/bdd/composites \
  -v $SCREENSHOTS_PATH:/opt/bdd/build/reports/tests \
  vfarcic/bdd
```

To run the application with MongoDB (still under development):

```bash
MONGODB_DATA_PATH=/var/lib/bdd/data/mongodb
docker run -d -p 27017:27017 -v $MONGODB_DATA_PATH:/data/db --name bdd_mongodb vfarcic/bdd_assistant_mongodb
```

Open the [http://localhost:9000](http://localhost:9000) in you favorite browser.

At the moment Docker container supports only PhantomJS browser


Running stories
---------------

In cases when running stories from the Web application is not a good option, an alternative runner can be executed from the command line.

To see the list of parameters, run the following:

```bash
sbt "test:run-main models.jbehave.JBehaveRunnerAssistant --help"
```

An example (used as part of our Travis setup):

```bash
sbt "test:run-main models.jbehave.JBehaveRunnerAssistant --story_path data/stories/tcbdd/**/*.story -P browser=phantomjs -P url=http://localhost:1234 -P widthHeight=1024,768 --composites_path composites/TcBddComposites.groovy"
```

### Running stories from Docker and PhantomJS

Docker vfarcic/bdd-runner-phantomjs can be used to run BDD stories using PhantomJS browser.

```bash
sudo docker run -t --rm vfarcic/bdd-runner-phantomjs
```

Running it without any argument outputs help. An example run with few arguments would be:

```bash
sudo docker run -t --rm vfarcic/bdd-runner-phantomjs \
  --story_path data/stories/tcbdd/stories/storyEditorForm.story \
  --composites_path /opt/bdd/composites/TcBddComposites.groovy \
  -P url=http://demo.bddassistant.com -P widthHeight=1024,768
```

Stories, composites and screenshots directories can be mapped outside the container as previously explained.


Development prerequisites
-------------------------

### Back-end

**[Scala](http://www.scala-lang.org/download/)**
**[Play/Activator](http://www.playframework.com/download)**
**[SBT](http://www.scala-sbt.org/download.html)**

### Front-end

**[NodeJS with NPM](http://nodejs.org/)**

```bash
npm install -g grunt-cli
npm install -g gulp
npm install -g bower
npm install -D gulp-jasmine
npm install
bower install
```


IDEA project
------------

Use the gen-idea sbt task to create Idea project files.

```bash
sbt gen-idea
```


Dependencies
------------

Front-end dependencies can be installed by running following

```bash
npm install
bower install
```

npm and bower will add two directories:

* public/node_modules
* public/bower_components


Development
-----------

Front-end files need to pass the process of concatenation, uglification, annotation, testing...

To prepare front-end files execute:

```bash
gulp
```

To continuously run gulp js task, execute:

```bash
gulp watch
```


Deployment to Heroku
--------------------

```bash
heroku create --stack cedar --buildpack https://github.com/ddollar/heroku-buildpack-multi.git
git push heroku master
```


Deployment to development environment
-------------------------------------

```bash
sbt run
```

Custom Steps
------------

To add custom steps to the application copy the steps JAR to the **steps** directory.
If you think that your steps might be useful to others, please fork the [steps repo](https://github.com/TechnologyConversations/TechnologyConversationsBddSteps), add your steps and create a pull request.


Unit Tests
----------

### Front-end

All front-end JS unit tests are run as part of **gulp**.
Alternative ways to run tests are described below.

Front-end unit testing

```bash
npm test
```

Front-end unit testing without installation and dependencies

```bash
grunt jasmine
```


### Back-end

Back-end unit testing

```bash
sbt ~test-quick
```


Functional Tests
----------------

Directory where PhantomJS, ChromeDriver and IEDriverServer are located must be in the system path.
