const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false });
// db.authenticate().then(()=> {  //logs out the db connection status
//     console.log("connection established");
// }).catch(err => {
//     console.log("unable to connect");
// });

var generateUrlTitle = function(title) {
    if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
      }
}

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},

    {
        getterMethods: { //define as part of model --- how is this different than defining as part of a property? do you access the two differently?
            route() {
            return '/wiki/' + this.urlTitle;
            }
        },
        hooks: {
            beforeValidate: (page) => {page.urlTitle = generateUrlTitle(page.title)}
        }
    }
);


const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
  };


  /*    getterMethods: {
        route() {
        return '/wiki/' + this.urlTitle;
        }
    },
    */