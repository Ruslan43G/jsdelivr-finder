class Api {
  constructor(url) {
    this.url = url;
  }

  async getTopPackages() {
    this.result = await fetch(`${this.url}stats/packages`);
    this.data = await this.result.json();
    return this.data;
  }

  async findPackage(name, type) {
    this.result = await fetch(`${this.url}package/${type}/${name.toLowerCase()}`);
    this.data = await this.result.status === 200 ? this.result.json() : null;
    return this.data;
  }

  async listPackagefiles(name, version, type) {
    this.result = await fetch(`${this.url}package/${type}/${name.toLowerCase()}@${version}`);
    this.data = await this.result.json();
    return this.data;
  }

  async showPackageStats(name, type) {
    this.result = await fetch(`${this.url}package/${type}/${name.toLowerCase()}/stats`);
    this.data = await this.result.json();
    return this.data;
  }
}

const api = new Api('https://data.jsdelivr.com/v1/');

export default api;
