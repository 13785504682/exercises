import "./App.css";
import { useState } from "react";
const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 100);
  });

// 请实现本地的add方法，调用 addRemote，能最优的实现输入数字的加法。
// async function add(...inputs) {
//   // 你的实现
// }

/**
 * 要求：
 * 1. 所有的加法都必须使用addRemote
 * 2. 输入错误时，input边框需要变红，Button disable
 * 3. 计算过程 Button与input disable, Button 展示计算中...
 * 3. 计算时间越短越好
 */
function App() {
  const [inputs, setInputs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  let [time,setTime] = useState(0)
  let [result,setResult] = useState(0)

  const add = async (...inputs) => {
    let sum = 0;
    for (let i = 0; i < inputs.length; i += 2) {
      if (i + 1 >= inputs.length) {
        sum += inputs[i];
      } else {
        const a = inputs[i];
        const b = inputs[i + 1];
        sum += await addRemote(a, b);
      }
    }
    return sum;
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setInputError(false);
  };

  const handleAddClick = async () => {
    const numbers = inputText
      .replace(/\s/g, '') 
      .split(',')
      .map((num) => Number(num));

    // 验证输入是否合法
    if (numbers.some((num) => isNaN(num))) {
      setInputError(true);
      return;
    }

    setIsCalculating(true); 
    setInputs(numbers);

    try {
      const start = new Date(); 
       result = await add(...numbers); 
      const end = new Date(); 
       time = end - start;

      setTime(time)

      setInputText(''); 
      setInputs([]); 
      setIsCalculating(false); 
      setResult(result)
    } catch (e) {
      console.error(e);
      setIsCalculating(false);
      alert('计算出错，请重试！');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>
          用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 ={">"} 38，最慢1200ms
        </div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入要相加的数字（如1,4,3,3,5）" value={inputText}
          onChange={handleInputChange}
          style={{ borderColor: inputError ? 'red' : '' }} // 根据输入是否合法改变边框颜色
          disabled={isCalculating} />
        <button onClick={handleAddClick} disabled={inputError || isCalculating}>
          {isCalculating ? '计算中...' : '相加'}</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：
          {result}， 计算时间是：{time} ms
        </p>
      </section>
    </div>
  );
}

export default App;
