import { ArticlesList } from './ArticlesList.model';
import { SourcesList } from './SourcesList.model';

export interface NewsData {
    articles?: ArticlesList;
    sources?: SourcesList;
}
