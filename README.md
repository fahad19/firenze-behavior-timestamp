# firenze-behavior-timestamp

[![Build Status](https://secure.travis-ci.org/fahad19/firenze-behavior-timestamp.png?branch=master)](http://travis-ci.org/fahad19/firenze-behavior-timestamp) [![Coverage Status](https://coveralls.io/repos/fahad19/firenze-behavior-timestamp/badge.svg?branch=master)](https://coveralls.io/r/fahad19/firenze-behavior-timestamp?branch=master) [![npm](https://img.shields.io/npm/v/firenze-behavior-timestamp.svg)](https://www.npmjs.com/package/firenze-behavior-timestamp) [![Join the chat at https://gitter.im/fahad19/firenze](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-1dce73.svg)](https://gitter.im/fahad19/firenze)

Timestamp behavior for [firenze.js](https://github.com/fahad19/firenze).

Automatically generate timestamps on certain fields, when saving records.

Install it with [npm](https://npmjs.com) or [Bower](http://bower.io):

```
$ npm install --save firenze-behavior-timestamp

$ bower install --save firenze-behavior-timestamp
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
# Contents

- [What it does](#what-it-does)
- [Usage](#usage)
  - [Node.js](#nodejs)
  - [Browser](#browser)
- [Testing](#testing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--docume:src/index.js-->
## What it does

When saving a new model, it will automatically populate timestamp as value on speficied field(s).

For example, when saving a post:

```js
var posts = new Posts();
var post = posts.model({
  title: 'Hello World'
});

post.save().then(function (model) {
  var created = model.get('created'); // `2015-01-01 12:00:00`
});
```

It will automatically save the value of current timestamp in `created` field.

## Usage

### Node.js

With [npm](https://npmjs.com):

```
$ npm install --save firenze-behavior-timestamp
```

Now you can require it as follows:

```js
var TimestampBehavior = require('firenze-behavior-timestamp');

// create your Database instance...

db.createCollectionClass({
  behaviors: [
    {
      'class': TimestampBehavior,
      options: {
        created: {
          on: 'create'                  // 'create', 'update', or 'always'
          format: 'YYYY-MM-DD HH:mm:ss' // 'object' for Date object, or moment.js format
        }
      }
    }
  ]
});
```

### Browser

Or [Bower](http://bower.io):

```
$ bower installl --save firenze-behavior-timestamp
```

Can be loaded in your HTML page as follows:

```js
<script src="bower_components/firenze/dist/firenze.full.min.js"></script>
<script src="bower_components/moment/min/moment.min.js"></script>
<script src="bower_components/firenze-behavior-timestamp/dist/firenze-behavior-timestamp.min.js"></script>

<script>
  // Timestamp behavior is available in `firenze.TimestampBehavior`
</script>
```

<!--/docume:src/index.js-->

# Testing

Tests are written with [mocha](http://mochajs.org/), and can be run via npm:

```
$ npm test
```

# License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
