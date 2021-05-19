const { User } = require('../models');

const userData = [{
    username: 'Jononathan',
    password: 'jkohn'

},
{
    username: 'Paul',
    password: 'Pauly'
},
{
    username: 'Dominic',
    password: 'Dominic1'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;