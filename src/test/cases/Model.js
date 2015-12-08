/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

var should = require('should-promised'); //eslint-disable-line
var lib = require('firenze');
var config = require('../config');
var moment = require('moment');

describe('Model', function () {
  before(function (done) {
    this.db = new lib.Database(config);

    this.Posts = require('../collections/Posts')(this.db);
    this.postsData = require('../fixtures/posts');

    this.db.getAdapter().loadAllFixtures([
      {
        collection: new this.Posts(),
        rows: this.postsData
      }
    ]).then(function () {
      done();
    }).catch(function (error) {
      throw error;
    });
  });

  after(function (done) {
    this.db.close().then(done);
  });

  it('should create a new record, with timestamp', function (done) {
    var posts = new this.Posts();
    var post = posts.model({
      title: 'New Post'
    });

    var today = moment().format('YYYY-MM-DD');

    post.save().then(function (model) {
      model.get('title').should.eql('New Post');

      model.get('created').should.startWith(today);
      model.get('updated').should.startWith(today);

      done();
    }).catch(function (error) {
      throw error;
    });
  });

  it('should update an existing record, with timestamp', function (done) {
    var posts = new this.Posts();
    var post = posts.model({
      id: 1
    });

    var today = moment().format('YYYY-MM-DD');

    post.fetch().then(function (model) {
      model.get('title').should.eql('Hello World');

      model.set('title', 'Hello World updated');
      model.save().then(function (m) {
        moment(m.get('created')).format('YYYY-MM-DD HH:mm:ss').should.eql('2015-01-01 12:00:00');
        m.get('updated').should.startWith(today);
        done();
      });
    }).catch(function (error) {
      throw error;
    });
  });
});
