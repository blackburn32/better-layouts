import {EditorClient, Viewport} from 'lucid-extension-sdk';
import {getAverageBoundingBox, getCenterOfViewport, LayoutOption} from '../utils';

const client: EditorClient = new EditorClient();
const viewport: Viewport = new Viewport(client);

export const layoutSelectedItemsInCircle = () => {
    const selectedItems = viewport.getSelectedItems(true);
    const {x, y} = getCenterOfViewport(viewport);
    const averageBox = getAverageBoundingBox(selectedItems);
    const radius = Math.max(averageBox.w, averageBox.h) * selectedItems.length / Math.PI;
    
    selectedItems.forEach((item, index) => {
        const angle = index / selectedItems.length * Math.PI * 2;
        const itemX = x + Math.cos(angle) * radius;
        const itemY = y + Math.sin(angle) * radius;
        const box = item.getBoundingBox();
        box.x = itemX - box.w / 2;
        box.y = itemY - box.h / 2;
        item.setBoundingBox(box);
    });
}

export const CircleLayout: LayoutOption = {
    label: 'Circle',
    action: () => layoutSelectedItemsInCircle(),
    visibleAction: 'multipleItemsSelected',
}
