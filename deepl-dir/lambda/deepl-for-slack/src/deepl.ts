import { default as axios, AxiosInstance } from "axios";
import qs from "qs";
import { Logger } from "@slack/logger";

export class DeepLApi {
  private authKey: string;
  private axiosInstance: AxiosInstance;
  private logger: Logger;
  constructor(authKey: string, logger: Logger) {
    this.authKey = authKey;
    this.logger = logger;
    const usingFreePlan = process.env.DEEPL_FREE_API_PLAN === "1";
    const apiSubdomain = usingFreePlan ? 'api-free' : 'api';
    this.axiosInstance = axios.create({
      baseURL: `https://${apiSubdomain}.deepl.com/v2`,
      timeout: 30000,
    });
  }

  async translate(text: string, targetLanguage: string): Promise<string | null> {
    return this.axiosInstance({
      url: "/translate",
      data: qs.stringify({
        auth_key: this.authKey,
        text: text,
        target_lang: targetLanguage.toUpperCase()
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).then(response => {
      this.logger.debug(response.data);
      if (response.data.translations && response.data.translations.length > 0) {
        return response.data.translations[0].text;
      } else {
        return ":x: Failed to translate it due to an unexpected response from DeepL API";
      }
    }).catch(error => {
      this.logger.error(`Failed to translate - text: ${text} error: ${error}`);
      return `:x: Failed to translate it due to ${error}`;
    });
  }
}