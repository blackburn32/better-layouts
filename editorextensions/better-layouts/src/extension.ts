import {EditorClient, Menu, MenuType} from 'lucid-extension-sdk';

const client = new EditorClient();
const menu = new Menu(client);

client.registerAction('hello', () => {
    console.log('Hello World');
});

menu.addMenuItem({
    label: 'Hello World',
    action: 'hello',
    menuType: MenuType.Main,
});
