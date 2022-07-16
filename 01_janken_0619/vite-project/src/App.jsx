import { useState } from 'react'
import food1 from './img/dogfood.jpeg'
import food2 from './img/meet.jpg'
import food_bad from './img/medicine.jpeg'
import dog_start from './img/shiba_start.jpeg'
import './App.css'



function App() {

  const [count, setCount] = useState(0);

  let Top_num= 500;
  let Left_num= 30;
 

  const get_Start = () => {
    Left_num=Left_num+40;
    setCount(Left_num);  /*useState呼べば再描画されると思った。けど、useStateの範囲だけなのかな・・・*/
    alert(Left_num+"  スタートボタンはここ！"); 
  };

  const dog_State = () => {
    alert("これ！");
  };

 
  const contenDogStyel ={ /*ここを変数にして、ボタンが押されたときに再描画されたら動くとおもった。けど、どうもここが呼ばれない。 propにしないとだめ？propにしても、しなくても一緒かとおもったんだが。*/
    top:Top_num+"px",
    left:Left_num+"px"
  }

  return (

  <div className="App">

      <header className="App-header">
      <p>テスト</p>

      <img src={food1} className="food1_img" alt="普通の" />
      <img src={food_bad} className="food_bad" alt="きらいなの" />
      <img src={food2} className="food2_img" alt="おいしいやつ" />

      <img src={dog_start} style= {contenDogStyel} className="dog_start_img" onClick={dog_State} alt="スタート" /> 

      <p>
        <button type="button" className='button_start' onClick={get_Start}>
          スタート
        </button>
      </p>

      </header>
    </div>
  )

}



export default App

