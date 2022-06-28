import AppLoader from './appLoader';
import { GetRespCallback } from './loader';

interface Controller<T> {
    getSources(callback: GetRespCallback<T>): void;
    getNews(e: Event, callback: GetRespCallback<T>): void;
}

class AppController<T> extends AppLoader<T> implements Controller<T> {
    getSources(callback: GetRespCallback<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: GetRespCallback<T>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
