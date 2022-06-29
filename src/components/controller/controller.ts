import AppLoader from './appLoader';
import { GetRespCallback } from './loader';

export enum Endpoints {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}
export interface Controller {
    getSources(callback: GetRespCallback): void;
    getNews(e: Event, callback: GetRespCallback): void;
}

class AppController extends AppLoader implements Controller {
    public getSources(callback: GetRespCallback) {
        super.getResp(
            {
                endpoint: Endpoints.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: GetRespCallback) {
        let target = e.target as HTMLDivElement | HTMLSpanElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;
