import { useState, useEffect } from "react";
import './App.css'
// firebaseを使うために用意されているメソッドを読み込む
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db, auth } from "./firebase"; //.envに書かれているfirebaseに接続するためのもの
import Add from "./Add";


function App() {
  const [data, setData] = useState([
    {
      id:"",
      title: "",
      rank: "",
      review: "",
    },
  ]);
  console.log(data,"useStateの中身");

  //登録要のuseState
  const[title,setTitle]=useState("")
  const[rank,setRank]=useState("")
  const[review,setReview]=useState("")


  //useEffect:画面表示の時に呼ばれる部分：画面表示の際にfirebaseからデータを取得する
  useEffect(() => {
    //2.1 query=コレクション(firebaseのデータが入る箱のこと)
    const q = query(collection(db, "group")); //データにアクセス

    // 2.2
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setData(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          rank: doc.data().rank,
          review: doc.data().review,
        }))
      );
    });
    return () => unsub();
  }, []);

  //
  const handleInputChangeT =(e)=>{

  }
  const handleInputChangeR =(e)=>{

  }


  //ボタンが押されたときの送信処理
  const addData=async()=>{
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
        rank: rankValue,
      }
    );
  }


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
              onChange={(e) => setRank(e.target.value)} 
              value={rank}
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
        <button>登録</button>

        {/* <Button variant="contained" type="submit">追加</Button> */}

        </table>

      </form>

      <table>
          {data.map((item, index) => (
          <tr>
            <div key={index}>
              <td className="title">{item.title}</td>
              <td className="rank">{item.rank}</td>
              <td className="review">{item.review}</td>
              <td>
                <button>削除</button>
                {/* <Button variant="#text-buttons" type="delete" onClick={() => deleteMemo(index)}>削除</Button> */}
              </td>
            </div>
          </tr>
          ))}
    </table>


    </div>
  )
}

export default App
