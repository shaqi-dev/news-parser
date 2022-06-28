import './sources.css';
import { SourcesList } from '../../models/SourcesList.model';
import { SourcesItem } from '../../models/SourcesItem.model';

interface SourcesDrawer {
    draw: (data: SourcesList) => void;
}

class Sources implements SourcesDrawer {
    draw(data: SourcesList) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: SourcesItem) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            itemName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources') as HTMLDivElement;
        sourcesElement.append(fragment);
    }
}

export default Sources;
