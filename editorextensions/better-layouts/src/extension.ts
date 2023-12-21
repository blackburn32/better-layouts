import {EditorClient, Menu, MenuType, Viewport} from 'lucid-extension-sdk';
import {LayoutOption} from './utils';
import {CircleLayout} from './layouts/circle';
import {SpiralLayout} from './layouts/spiral';

const client: EditorClient = new EditorClient();
const menu: Menu = new Menu(client);
const viewport: Viewport = new Viewport(client);
const multipleItemsSelected = () => {
    return viewport.getSelectedItems().length > 1;
}
client.registerAction('multipleItemsSelected', multipleItemsSelected);

const layouts: LayoutOption[] = [
    CircleLayout,
    SpiralLayout,
];

layouts.forEach((layout: LayoutOption) => {
    const layoutActionName = `layoutSelectedItemsIn${layout.label}`;
    client.registerAction(layoutActionName, layout.action);
    menu.addMenuItem({
        label: layout.label,
        action: layoutActionName,
        menuType: MenuType.Context,
    });
});
