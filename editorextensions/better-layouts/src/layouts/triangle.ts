import {EditorClient, Viewport} from 'lucid-extension-sdk';
import {distributeItemsToPoints, getAverageBoundingBox, getCenterOfViewport, getCoordinatesOnLine, LayoutOption} from '../utils';

const client: EditorClient = new EditorClient();
const viewport: Viewport = new Viewport(client);

export const layoutSelectedItemsInTriangle = () => {
    const selectedItems = viewport.getSelectedItems(true);
    const {x, y} = getCenterOfViewport(viewport);
    const averageBox = getAverageBoundingBox(selectedItems);
    const boxDiagonal = Math.sqrt(averageBox.w**2 + averageBox.h**2);
    const triangleBase = Math.ceil(Math.sqrt(selectedItems.length) * boxDiagonal);
    const triangleHeight = Math.sqrt(3) / 2 * triangleBase;
    const pointsPerSide = Math.ceil(selectedItems.length/3);
    const topOfTriangleY = y - triangleHeight / 2;
    
    const topPoint = {
        x,
        y: topOfTriangleY,
    }
    const leftPoint = {
        x: x - triangleBase / 2,
        y: topOfTriangleY + triangleHeight,
    }
    const rightPoint = {
        x: x + triangleBase / 2,
        y: topOfTriangleY + triangleHeight,
    }
    
    const bottomPoints = getCoordinatesOnLine(leftPoint, rightPoint, pointsPerSide);
    const leftSidePoints = getCoordinatesOnLine(leftPoint, topPoint, pointsPerSide);
    const rightSidePoints = getCoordinatesOnLine(rightPoint, topPoint, pointsPerSide);
    const points = [...bottomPoints, ...leftSidePoints, ...rightSidePoints];
    
    distributeItemsToPoints(selectedItems, points);
}

export const TriangleLayout: LayoutOption = {
    label: 'Triangle',
    action: () => layoutSelectedItemsInTriangle(),
    visibleAction: 'multipleItemsSelected',
}
