import './news.css';
import { ArticlesList } from '../../models/ArticlesList.model';
import { ArticlesItem } from '../../models/ArticlesItem.model';

interface NewsDrawer {
    draw: (data: ArticlesList) => void;
}

class News implements NewsDrawer {
    draw(data: ArticlesList) {
        const news = data.length >= 10 ? data.filter((_, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: ArticlesItem, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLDivElement;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            metaAuthor.textContent = item.author || item.source.name;

            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const descrTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            descrTitle.textContent = item.title;

            const descrSource = newsClone.querySelector('.news__description-source') as HTMLHeadingElement;
            descrSource.textContent = item.source.name;

            const descrContent = newsClone.querySelector('.news__description-content') as HTMLParagraphElement;
            descrContent.textContent = item.description;

            const readMore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news') as HTMLDivElement;
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
