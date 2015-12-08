var TimestampBehavior = require('../../');

module.exports = function (db) {
  return db.createCollection({
    table: 'posts',

    alias: 'Post',

    displayField: 'title',

    schema: {
      id: {
        type: 'increments'
      },
      title: {
        type: 'string'
      },
      slug: {
        type: 'text'
      }
    },

    behaviors: [
      {
        class: TimestampBehavior,
        options: {
          created: {
            on: 'create'
          },
          updated: {
            on: 'always'
          }
        }
      }
    ],

    modelClass: require('../models/Post')
  });
};
