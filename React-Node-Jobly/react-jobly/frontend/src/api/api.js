import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //************************************************************************************
  // From backend/routes/auth.js

  // Get token for login from username / password
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // New User Sign-up
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  //************************************************************************************
  // From backend/routes/companies

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Get list of companies. Filtered by name if not undefined.
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }
  //************************************************************************************
  // From backend/routes/jobs

  // Get list of jobs. Filtered by name if not undefined.
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }
  //************************************************************************************
  // From backend/routes/users

  // Get current user.
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Apply to Job.
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  // Save user profile.
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  //************************************************************************************
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
