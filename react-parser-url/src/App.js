import './App.css';
import { useState, useEffect } from 'react';

const defaultParserResult = {
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  params: {},
  hash: ''
}

// const parserUrl = (url) => {
//   // 你的实现
//   return defaultParserResult;
// };

// 测试用例
// parserUrl('https://baidu.com:443/s?wd=hello');
// 输出结果：{ protocol: 'https:', hostname: 'baidu.com', port: '443', pathname: '/s', params: { wd: 'hello' },  hash: '' }


function App() {
  const [result, setResult] = useState(defaultParserResult);
  let [url, setInputUrl] = useState('');

  function changeurl() {
    //分离协议
    let pindex = url.indexOf('://')
    if (pindex !== -1) {
      defaultParserResult.protocol = url.slice(0, pindex)
      console.log(pindex)
      url = url.slice(pindex + 3);
    }

    //分离哈希
    let hashindex = url.indexOf('#')
    if (hashindex !== -1) {
      defaultParserResult.hash = url.slice(hashindex + 1);
      url = url.slice(0, hashindex)
    }

    //分离查询参数部分
    let queryindex = url.indexOf('?')
    if (queryindex !== -1) {
      let queryString = url.slice(queryindex + 1);
      url = url.slice(0, queryindex)
      let paramArray = queryString.split('&')
      for (let param of paramArray) {
        let [key, value] = param.split('=')
        defaultParserResult.params[key] = decodeURIComponent(value)
      }
    }

    //分离端口部分
    let portindex = url.indexOf(':')
    let pathindex = url.indexOf('/');

    if (portindex !== -1 && (pathindex === -1 || portindex < pathindex)) {
      defaultParserResult.hostname = url.slice(0, portindex)
      defaultParserResult.port = url.slice(portindex + 1, pathindex)
    } else {
      defaultParserResult.hostname = url.slice(0, pathindex !== -1 ? pathindex : undefined)
    }

    //获取路径名部分
    defaultParserResult.pathname = url.slice(pathindex !== -1 ? pathindex : undefined)
    return defaultParserResult;
  }
  const parserUrl = () => {
    changeurl()
    console.log(defaultParserResult);
    setResult(defaultParserResult)
  }

  const changeinput = (e) => {
    setInputUrl(e.target.value)
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log('这里 处理 Enter 事件');
      changeurl()
      console.log(defaultParserResult);
      setResult(defaultParserResult);
    }
  }
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入url时，</div>
        <div>点击解析按钮（或者按 enter 快捷键）能够识别出 url 各个组成部分</div>
        <div>并将结果渲染在页面上（tips: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入 url 字符串"
          onChange={(e) => changeinput(e)}
          onKeyDown={(e) => onKeyDown(e)}
        />
        <button id="J-parserBtn" onClick={() => parserUrl()}>解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
