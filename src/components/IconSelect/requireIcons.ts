// 定义一个类型，用于表示图标名称的数组
type IconNames = string[];

const req = import.meta.glob('/src/assets/svg/*.svg')

// 定义一个函数，返回所有匹配的模块
const requireAll = (requireContext: any): string[] => Object.keys(requireContext);

const icons = requireAll(req).map(path => {
  const match = path.match(/\/([^/]+)\.svg$/);
  return match ? match[1] : ''; // 返回文件名（不带扩展名）
}).filter(Boolean); // 过滤掉空字符串


export default icons;