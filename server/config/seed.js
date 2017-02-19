/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';
import Event from '../api/event/event.model';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        }, {
          provider: 'local',
          name: 'Joacim Jacobsen',
          email: 'jokke@example.com',
          password: 'test'
        }, {
          provider: 'local',
          name: 'Patrick',
          email: 'pondus@example.com',
          password: 'test'
        }, {
          provider: 'local',
          name: 'Beate',
          email: 'beate@example.com',
          password: 'test'
        }, {
          provider: 'local',
          name: 'Kevin',
          email: 'paasan@example.com',
          password: 'test'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });

      Event.find({}).remove()
        .then(() => {
          Event.create({
            title: "Lan party 1",
            startDatetime: new Date("2016/02/23"),
            endDatetime: new Date("2016/02/25"),
            address: "Karasjok",
            info: "Lan og mye morro!",
            price: 200,
            capacity: 100
          }, {
            title: "Lan party 2",
            startDatetime: new Date("2016/08/10"),
            endDatetime: new Date("2016/08/15"),
            address: "Karasjok",
            info: "Sommerlan",
            price: 400,
            capacity: 150
          }, {
            title: "Finnmark Gathering",
            startDatetime: new Date("2016/10/1"),
            endDatetime: new Date("2016/10/5"),
            address: "Alta",
            info: "ultra bra lan",
            price: 500,
            capacity: 500
          }, {
            title: "Minilan",
            startDatetime: new Date("2017/02/23"),
            endDatetime: new Date("2017/02/25"),
            address: "Alta",
            info: "Lan paa huset!",
            price: 200,
            capacity: 50
          })
          .then(() => console.log('finished populating events'))
          .catch(err => console.log('error populating events', err));
        });
  }
}
