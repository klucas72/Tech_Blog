const { User } = require('../models');

const userData = [{
    username: 'Jonathan',
    password: '$2b$10$5nY/wyqcbfBmKMuRW/j2AeAfcMCBZ.W4JllxFFehPZ48CzVDX4mAq'

},
{
    username: 'Paul',
    password: '$2b$10$hv4foZAcFBF84EmUa7nx6upYYM9hUGE/gLMUqLHXrL/C2aViWBft.'
},
{
    username: 'Dominic',
    password: '$2b$10$3wDpl23rPGZMW5IXqAjZmuzsYtw6TeTQkvxTbn1/g/Mr.fk.9e6yy'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;