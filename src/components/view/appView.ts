import News from './news/news';
import Sources from './sources/sources';
import { Drawer } from '../models/Drawer.model';
import { NewsData } from '../models/NewsData.model';
import { ArticlesList } from '../models/ArticlesList.model';
import { SourcesList } from '../models/SourcesList.model';

type DataDrawer = (data: NewsData) => void;

export interface AppDrawer {
    drawNews: DataDrawer;
    drawSources: DataDrawer;
}

export class AppView implements AppDrawer {
    private readonly news: Drawer<ArticlesList>;
    private readonly sources: Drawer<SourcesList>;

    public constructor() {
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
