import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Controller } from '../controller/controller';

class App<T> {
    controller: Controller<T>;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
