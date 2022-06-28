interface LoaderOptions {
    apiKey: string;
}

interface GetRespParameters {
    endpoint: string;
    options: LoaderOptions;
}

type GetRespCallback<T> = (data: T) => void;

interface DataLoader<T> {
    baseLink: string;
    options: LoaderOptions;
    getResp({ endpoint, options }: GetRespParameters, callback: GetRespCallback<T>): void;
    errorHandler(res: globalThis.Response): globalThis.Response;
    makeUrl(options: object, endpoint: string): string;
}

class Loader<T> implements DataLoader<T> {
    baseLink: string;
    options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: GetRespParameters,
        callback: GetRespCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: globalThis.Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: GetRespCallback<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
