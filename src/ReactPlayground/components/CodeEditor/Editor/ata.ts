import { setupTypeAcquisition } from '@typescript/ata'
import typescript from 'typescript';
/**
 * 创建自动类型获取(ATA)实例
 * 
 * ATA 是 TypeScript 的一个功能，可以自动下载项目中使用到的库的类型定义文件(@types)
 * 
 * @param onDownloadFile - 当类型文件下载完成时的回调函数
 * @returns 配置好的 ATA 实例
 */
export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.log('自动下载的包', path);
        onDownloadFile(code, path);
      }
    },
  })

  return ata;
}
