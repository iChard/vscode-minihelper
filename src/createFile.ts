import * as fs from 'fs';
import * as path from 'path';
import { window, workspace } from 'vscode';
const fsPromise = fs.promises;

const typeMaps: { comp: string, page: string } = {
    comp: '组件',
    page: '页面'
};

function getInput(filePath: string, createType: 'comp' | 'page'): any {
    let str: string = `__dirname: ${__dirname}, __filename: ${__filename}`;
    let currentFiles: string[] = fs.readdirSync(filePath);
    return window.showInputBox({
        placeHolder: `输入${typeMaps[createType]}名称`
    }).then(input => {
        if (!input) {
            throw { message: '用户无输入！' };
        }
        if (currentFiles.includes(input)) {
            window.showErrorMessage(`当前目录存在${typeMaps[createType]}: ${input}, 请重新输入！`);
            return getInput(filePath, createType);
        }
        return input;
    });

}

function writeTo(filePath: string, createType: 'comp' | 'page') {
    const useConnect: boolean = workspace.getConfiguration().get('miniHelper.useRedux') || false;
    const connectPath: string = workspace.getConfiguration().get('miniHelper.reduxConnectPath') || '/path/to/connect';
    const importConnectStr: string = `import { connect } from "${connectPath}";`;
    getInput(filePath, createType).then((input: string) => {
        fsPromise.mkdir(path.join(filePath, input)).then(() => {
            return Promise.all([
                fsPromise.readFile(path.join(__dirname, '../src/temp', createType, useConnect ? 'index-redux.js' : 'index.js')),
                fsPromise.readFile(path.join(__dirname, '../src/temp', createType, 'index.axml')),
                fsPromise.readFile(path.join(__dirname, '../src/temp', createType, 'index.acss')),
                fsPromise.readFile(path.join(__dirname, '../src/temp', createType, 'index.json'))
            ]).then((files: any[]) => {
                let fileJs = files[0].toString().split('\n');
                fileJs.unshift(importConnectStr);
                files = [
                    fileJs.join('\n'),
                    ...files,
                ];
                return Promise.all([
                    fsPromise.writeFile(path.join(filePath, input, 'index.js'), files[0]),
                    fsPromise.writeFile(path.join(filePath, input, 'index.wxml'), files[1]),
                    fsPromise.writeFile(path.join(filePath, input, 'index.wcss'), files[2]),
                    fsPromise.writeFile(path.join(filePath, input, 'index.json'), files[3])
                ]);
            });
        }).catch(e => {
            window.showErrorMessage(e.message);
        });

    });
}

export default writeTo;