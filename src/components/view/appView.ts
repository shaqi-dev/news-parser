import News from './news/news';
import Sources from './sources/sources';
import { NewsDrawer } from './news/news';
import { SourcesDrawer } from './sources/sources';
import { NewsData } from '../models/NewsData.model';

interface AppDrawer {
    drawNews: (data: NewsData) => void;
    drawSources: (data: NewsData) => void;
}

export class AppView implements AppDrawer {
    news: NewsDrawer;
    sources: SourcesDrawer;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: NewsData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
