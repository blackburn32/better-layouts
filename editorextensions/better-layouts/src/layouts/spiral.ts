import {EditorClient, Viewport} from 'lucid-extension-sdk';
import {getAverageBoundingBox, getCenterOfViewport, LayoutOption} from '../utils';

const client: EditorClient = new EditorClient();
const viewport: Viewport = new Viewport(client);

export const layoutSelectedItemsInSpiral = () => {
    const selectedItems = viewport.getSelectedItems(true);
    const {x, y} = getCenterOfViewport(viewport);
    const averageBox = getAverageBoundingBox(selectedItems);
    const radius = Math.max(averageBox.w, averageBox.h);
    
    let angle = 0;
    selectedItems.forEach((item, index) => {
        const spiralRadius = radius + angle * 50;
        const itemX = x + Math.cos(angle) * spiralRadius;
        const itemY = y + Math.sin(angle) * spiralRadius;
        
        const box = item.getBoundingBox();
        box.x = itemX - box.w / 2;
        box.y = itemY - box.h / 2;
        
        item.setBoundingBox(box);
        
        // The further around the spiral we go, the less we increment the angle so that the items are closer together
        const modifier = (selectedItems.length - index) / selectedItems.length;
        
        const step = 0.5 * modifier;
        angle += step;
    });
}

export const SpiralLayout: LayoutOption = {
    label: 'Spiral',
    action: () => layoutSelectedItemsInSpiral(),
    visibleAction: 'multipleItemsSelected',
}
