/*
 * @Author: lpy
 * @LastEditors  : lpy
 * @Description: File for 小程序开发助手
 * @Date: 2020-01-02 20:45:12
 * @LastEditTime : 2020-01-08 13:56:16
 */
import * as fs from 'fs';
import * as path from 'path';
import { window, workspace } from 'vscode';
const fsPromise = fs.promises;

const typeMaps: { comp: string, page: string } = {
    comp: '组件',
    page: '页面'
};

interface Itype {
    html: string;
    css: string;
}


const extMaps: { [a: string]: Itype} = {
    ali: {
        html: 'axml',
        css: 'acss'
    },
    we: {
        html: 'wxml',
        css: 'wcss'
    }
};

function getInput(filePath: string, createType: 'comp' | 'page'): any {
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
    debugger;
    const useConnect: boolean = workspace.getConfiguration().get('miniHelper.useRedux') || false;
    const connectPath: string = workspace.getConfiguration().get('miniHelper.reduxConnectPath') || '/path/to/connect';
    const inputMiniType: string = workspace.getConfiguration().get('miniHelper.miniType') || 'ali';
    const cssStyle: string = workspace.getConfiguration().get('miniHelper.cssStyle')  || 'css';
    const importConnectStr: string = `import { connect } from "${connectPath}";`;
    
    getInput(filePath, createType).then((input: string) => {
        fsPromise.mkdir(path.join(filePath, input)).then(() => {
            return Promise.all([
                fsPromise.readFile(path.join(__dirname, 'temp', createType, useConnect ? 'index-redux.js' : 'index.js')),
                fsPromise.readFile(path.join(__dirname, 'temp', createType, 'index.axml')),
                fsPromise.readFile(path.join(__dirname, 'temp', createType, 'index.acss')),
                fsPromise.readFile(path.join(__dirname, 'temp', createType, 'index.json'))
            ]).then((files: any[]) => {
                let fileJs = files[0].toString().split('\n');
                if (useConnect) {
                    fileJs.unshift(importConnectStr);
                }
                files[0] = fileJs.join('\n');
                let mapKeys: string[] = Object.keys(extMaps);//[a: string]
                let miniType: keyof typeof extMaps = mapKeys.includes(inputMiniType) ? inputMiniType : 'we';// 输入不合法时默认是微信小程序
                return Promise.all([
                    fsPromise.writeFile(path.join(filePath, input, 'index.js'), files[0]),
                    fsPromise.writeFile(path.join(filePath, input, `index.${extMaps[miniType].html}`), files[1]),
                    fsPromise.writeFile(path.join(filePath, input, `index.${cssStyle === 'css' ? extMaps[miniType].css : cssStyle}`), files[2]),
                    fsPromise.writeFile(path.join(filePath, input, 'index.json'), files[3])
                ]);
            });
        }).catch(e => {
            window.showErrorMessage(e.message);
        });

    });
}

export default writeTo;