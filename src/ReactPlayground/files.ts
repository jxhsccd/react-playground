import { Files } from './PlaygroundContext';
import importMap from './templates/import-map.json?raw';
import AppCss from './templates/App.css?raw';
import App from './templates/App.tsx?raw';
import main from './templates/main.tsx?raw';
import { fileName2Language } from './utils';

/**
 * 应用核心文件名常量
 */
export const APP_COMPONENT_FILE_NAME = 'App.tsx';
export const IMPORT_MAP_FILE_NAME = 'import-map.json';
export const ENTRY_FILE_NAME = 'main.tsx';
export const APP_STYLE_FILE_NAME = 'App.css';

/**
 * 初始化文件模板配置
 * 
 * 包含应用启动所需的基本文件：
 * - 入口文件 (main.tsx)
 * - 主组件文件 (App.tsx)
 * - 样式文件 (App.css)
 * - 模块映射文件 (import-map.json)
 */
export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main.trim(), // 移除模板文件可能的多余空白
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App.trim(), // 移除模板文件可能的多余空白
  },
  [APP_STYLE_FILE_NAME]: {
    name: APP_STYLE_FILE_NAME,
    language: 'css', // 直接指定CSS类型，避免不必要的函数调用
    value: AppCss.trim(), // 移除模板文件可能的多余空白
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap.trim(), // 移除模板文件可能的多余空白
  },
};

/**
 * 默认选中的文件（应用入口文件）
 */
export const DEFAULT_SELECTED_FILE = APP_COMPONENT_FILE_NAME;