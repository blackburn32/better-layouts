import {ItemProxy, Viewport} from 'lucid-extension-sdk';

export type LayoutOption = {
    label: string;
    action: () => void;
    visibleAction: string;
}

export const getAverageBoundingBox = (items: ItemProxy[]) => {
    const totalBox = getTotalBox(items);
    totalBox.w /= items.length;
    totalBox.h /= items.length;
    return totalBox;
}

export const getTotalBox = (items: ItemProxy[]) => {
    return items.reduce((total, item) => {
        const box = item.getBoundingBox();
        return {
            w: total.w + box.w,
            h: total.h + box.h,
        };
    }, {
        w: 0,
        h: 0,
    });
}

export const getCenterOfViewport = (viewport: Viewport) => {
    const {x, y, w, h} = viewport.getVisibleRect();
    return {
        x: x + w / 2,
        y: y + h / 2,
    };
}

