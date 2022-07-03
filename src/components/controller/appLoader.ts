import Loader from './loader';

export class AppLoader extends Loader {
    public constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'cba7e90412ea4943b8c3f87f2503e841',
        });
    }
}

export default AppLoader;
