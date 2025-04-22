import styles from './index.module.scss';
import logoSvg from './icons/logo.svg';
import { useContext } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { MoonOutlined, SunOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { downloadFiles } from '../../utils';

export default function Header() {
  const { files, theme, setTheme } = useContext(PlaygroundContext);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className={styles.header}>
      {contextHolder}
      <div className={styles.logo}>
        <img alt='logo' src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === 'light' && (
          <MoonOutlined
            title='暗色主题'
            className={styles.theme}
            onClick={() => {
              setTheme('dark')
              setTimeout(() => messageApi.success('切换成暗色主题', 1), 100);
            }}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title='亮色主题'
            className={styles.theme}
            onClick={() => {
              setTheme('light')
              setTimeout(() => messageApi.success('切换成亮色主题', 1), 100);
            }}
          />
        )}
        <ShareAltOutlined
          title='分享链接'
          onClick={() => {
            copy(window.location.href);
            setTimeout(() => messageApi.success('分享链接已复制'), 100);
          }}
        />
        <DownloadOutlined
          title='打包下载'
          onClick={async () => {
            await downloadFiles(files);
            setTimeout(() => messageApi.success('开始下载'), 100);
          }}
        />
      </div>
    </div>
  );
}