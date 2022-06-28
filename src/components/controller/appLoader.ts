import Loader from './loader';

export class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '74fc0dd205c64b0db8cc1f137d375a0b',
        });
    }
}

export default AppLoader;
