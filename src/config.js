let baseUrl = 'http://localhost:5000/api/';
let url = 'http://localhost:5000';
GENERATE_SOURCEMAP = false;

if (window.location.host === 'quadrabase-dev.falconweb.app') {
  baseUrl = 'https://quadrabase-api-dev.falconweb.app/api/v1';
  url = 'https://quadrabase-api-dev.falconweb.app';
} else if (window.location.host === 'quadrabase-qa.falconweb.app') {
  baseUrl = 'https://quadrabase-api-qa.falconweb.app/api/v1';
  url = 'https://quadrabase-api-qa.falconweb.app';
} else if (window.location.host === 'quadrabase-staging.falconweb.app') {
  baseUrl = 'https://quadrabase-api-staging.falconweb.app/api/v1';
  url = 'https://quadrabase-api-staging.falconweb.app';
} else if (window.location.host === 'quadrabase.fr') {
  baseUrl = 'https://api.quadrabase.fr/api/v1';
  url = 'https://api.quadrabase.fr/';
}

module.exports = { baseUrl, url };
