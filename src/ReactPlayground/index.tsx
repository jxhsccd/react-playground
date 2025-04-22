import React, { useContext } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import { PlaygroundContext } from './PlaygroundContext';
import './index.scss';

/**
 * React Playground 主组件
 * 
 * 该组件构成应用的主要布局，包含：
 * - 顶部导航栏 (Header)
 * - 可调整大小的代码编辑区和预览区分割布局
 * - 主题切换功能
 * 
 * @returns React 组件
 */
const ReactPlayground: React.FC = () => {
  // 从上下文中获取主题相关状态
  const { theme } = useContext(PlaygroundContext);
  
  return (
    <div 
      className={`playground-container ${theme}`}
      style={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 顶部导航栏 */}
      <Header />
      
      {/* 可调整大小的主内容区域 */}
      <Allotment 
        defaultSizes={[50, 50]} // 默认均分空间
        separator={true} // 显示分隔条
      >
        {/* 代码编辑器面板 */}
        <Allotment.Pane 
          minSize={300} // 设置最小宽度避免面板过小
          preferredSize="50%" // 首选大小
        >
          <CodeEditor />
        </Allotment.Pane>
        
        {/* 预览面板 */}
        <Allotment.Pane 
          minSize={300} // 设置最小宽度避免面板过小
          preferredSize="50%" // 首选大小
        >
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default ReactPlayground;