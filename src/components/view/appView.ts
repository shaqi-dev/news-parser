import News from './news/news';
import Sources from './sources/sources';
import { Drawer } from '../models/Drawer.model';
import { NewsData } from '../models/NewsData.model';
import { ArticlesList } from '../models/ArticlesList.model';
import { SourcesList } from '../models/SourcesList.model';

type DrawData = (data: NewsData) => void;

interface AppDrawer {
    drawNews: DrawData;
    drawSources: DrawData;
}

export class AppView implements AppDrawer {
    private news: Drawer<ArticlesList>;
    private sources: Drawer<SourcesList>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
