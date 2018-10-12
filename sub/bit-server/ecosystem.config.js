module.exports = {
  apps : [{
    name      : 'ocx',
    script    : 'ts-node ocx.ts',
    env: {
      NODE_ENV: 'dev'
    },
    env_production : {
      NODE_ENV: 'prod'
    }
  }, {
    name      : 'bit',
    script    : 'ts-node bit.ts',
    env: {
      NODE_ENV: 'dev'
    },
    env_production : {
      NODE_ENV: 'prod'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
