import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
//IconButtn DeleteIcon が使えない

const APP_KEY = "test";

function App() {
  const getData = () => {APP_KEY
    const data = localStorage.getItem("test");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  // 登録されるデータを保持するuseState
  const [data, setData] = useState(getData);

  // タイトル入力欄のテキスト情報を保持するuseState
  const [title, setTitle] = useState("");
  const [lank, setLank] = useState("");
  const [review, setReview] = useState("");

  // 送信を押したら登録
  const handleAddSubmit = (e) => {
    // フォームタグは送信の際に画面がリロードされないように設定
    e.preventDefault();

    // データを登録用オブジェクト
    let pushData = {
      title,
      lank,
      review,
    };

    setData([...data, pushData]);
    setTitle("");
    setLank("");
    setReview("");
  };

  const deleteMemo = (id) => {

    //データをparseして、多分arrayで帰ってきてる
    var getData = JSON.parse(localStorage.getItem("test"));

    alert("id="+id);
    alert("length="+getData.length);
    
    //idから1つの要素をけすはずなんだが、何故か選択行だけが残る★
    getData=getData.splice(id,1);
    setData(getData);

  };

  // point! useStateの[data]に変更があったらlocalStrageを更新する
  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <h1>読書記録</h1>
      <form onSubmit={handleAddSubmit}>
        <table>

        <tr>
          <td>
            <p>題名</p>
          </td>
          <td>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
            />
          </td>
          <td>
            <p>評価</p>
          </td>
          <td>
            {/*★onChangeじゃなくて何ならデフォルト値も持ってけるのか？*/}
            <select
              name="bbb"
              required
              onChange={(e) => setLank(e.target.value)} 
              value={lank}
            >
              <option value="評価なし">評価なし</option> 
              <option value="★★★">★★★</option>
              <option value="★★">★★</option>
              <option value="★">★</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>
            <p>感想</p>
          </td>
          <td>
            <textarea
              name="aaa"
              required
              onChange={(e) => setReview(e.target.value)}
              value={review}
            >テスト</textarea>
          </td>
        </tr>


        {/* 送信ボタン */}
        <Button variant="contained" type="submit">追加</Button>

        </table>

      </form>

      <table>
          {data.map((item, index) => (
          <tr>
            <div key={index}>
              <td className="title">{item.title}</td>
              <td className="lank">{item.lank}</td>
              <td className="review">{item.review}</td>
              <td>
                <Button variant="#text-buttons" type="delete" onClick={() => deleteMemo(index)}>削除</Button>
              </td>
            </div>
          </tr>
          ))}
    </table>

    </div>


  );
}

export default App;