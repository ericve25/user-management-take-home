const packageJson = require('../../package.json');

const getRoutes = () => [
  {
    href: '/',
    methods: 'get',
    type: packageJson.version,
    description: 'Root'
  },
  {
    href: '/health',
    methods: 'get',
    type: packageJson.version,
    description: 'API health check'
  },
  {
    href: '/users/register',
    methods: 'post',
    type: packageJson.version,
    description: 'Allows users to login with email and password'
  },
  {
    href: '/users/login',
    methods: 'post',
    type: packageJson.version,
    description: 'Allows users to login with email and password'
  },
  {
    href: '/users/{id}/contacts',
    methods: 'get, post',
    type: packageJson.version,
    description: 'Allows a user to get their list of contacts or add a new contact'
  },
  {
    href: '/users/{id}/contacts/{id}',
    methods: 'get, put, delete',
    type: packageJson.version,
    description: 'Allows a user to get or update a specific contact'
  }
];

const getHealth = () => ({
  status: 'OK',
  description: 'Service is up and running.',
  build: packageJson.version
});

module.exports = {
  getRoutes,
  getHealth
};
