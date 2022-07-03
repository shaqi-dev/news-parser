import AppController from '../controller/controller';
import { AppDrawer, AppView } from '../view/appView';
import { Controller } from '../controller/controller';
import { NewsData } from '../models/NewsData.model';

export interface AppBuilder {
    start(): void;
}

export class App implements AppBuilder {
    private readonly controller: Controller;
    private readonly view: AppDrawer;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: NewsData) => this.view.drawSources(data));
    }
}

export default App;
