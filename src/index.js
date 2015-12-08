/* eslint-disable new-cap */

import f from 'firenze';
import moment from 'moment';

let Behavior = f.Behavior;
let P = f.Promise;

// ## What it does
//
// When saving a new model, it will automatically populate timestamp as value on speficied field(s).
//
// For example, when saving a post:
//
// ```js
// var posts = new Posts();
// var post = posts.model({
//   title: 'Hello World'
// });
//
// post.save().then(function (model) {
//   var created = model.get('created'); // `2015-01-01 12:00:00`
// });
// ```
//
// It will automatically save the value of current timestamp in `created` field.
//
// ## Usage
//
// ### Node.js
//
// With [npm](https://npmjs.com):
//
// ```
// $ npm install --save firenze-behavior-timestamp
// ```
//
// Now you can require it as follows:
//
// ```js
// var TimestampBehavior = require('firenze-behavior-timestamp');
//
// // create your Database instance...
//
// db.createCollection({
//   behaviors: [
//     {
//       'class': TimestampBehavior,
//       options: {
//         created: {
//           on: 'create'                  // 'create', 'update', or 'always'
//           format: 'YYYY-MM-DD HH:mm:ss' // 'object' for Date object, or moment.js format
//         }
//       }
//     }
//   ]
// });
// ```
//
// ### Browser
//
// Or [Bower](http://bower.io):
//
// ```
// $ bower installl --save firenze-behavior-timestamp
// ```
//
// Can be loaded in your HTML page as follows:
//
// ```js
// <script src="bower_components/firenze/dist/firenze.full.min.js"></script>
// <script src="bower_components/moment/min/moment.min.js"></script>
// <script src="bower_components/firenze-behavior-timestamp/dist/firenze-behavior-timestamp.min.js"></script>
//
// <script>
//   // Timestamp behavior is available in `firenze.TimestampBehavior`
// </script>
// ```
//

export default class Timestamp extends Behavior {
  beforeSave(model) {
    let allowedOn = [
      'create',
      'update',
      'always'
    ];
    let defaultOn = 'always';

    let isNew = model.isNew();
    for (let field in this.options) {
      let fieldOptions = this.options[field];

      let on;
      if (typeof fieldOptions.on === 'undefined' || allowedOn.indexOf(fieldOptions.on)) {
        on = defaultOn;
      } else {
        on = fieldOptions.on;
      }

      if (!isNew && on === 'create') {
        continue;
      }

      let format = 'YYYY-MM-DD HH:mm:ss';
      if (typeof fieldOptions.format !== 'undefined' && fieldOptions.format === 'object') {
        format = fieldOptions.format;
      }

      if (format === 'object') {
        model.set(field, new Date());
        continue;
      }

      model.set(field, moment().format(format));
    }

    return new P.resolve(true);
  }
}
