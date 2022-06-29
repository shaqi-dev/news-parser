import { NewsData } from '../models/NewsData.model';
import { HttpStatusCode } from '../utils/HttpStatusCode';
import { Endpoints } from './controller';

interface DataLoaderOptions {
    apiKey: string;
}

interface GetRespOptions {
    sources?: string;
}

export type GetRespCallback = (data: NewsData) => void;

interface GetRespParameters {
    endpoint: Endpoints | string;
    options?: GetRespOptions;
}

interface DataLoader {
    getResp({ endpoint, options }: GetRespParameters, callback: GetRespCallback): void;
}

class Loader implements DataLoader {
    private baseLink: string;
    private options: DataLoaderOptions;

    constructor(baseLink: string, options: DataLoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options }: GetRespParameters,
        callback: GetRespCallback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: globalThis.Response) {
        if (!res.ok) {
            if (
                res.status === HttpStatusCode.ClientErrorUnauthorized ||
                res.status === HttpStatusCode.ClientErrorNotFound
            )
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: GetRespOptions, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: GetRespCallback, options: GetRespOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<NewsData>)
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
