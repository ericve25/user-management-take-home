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
