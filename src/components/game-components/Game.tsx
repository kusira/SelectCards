import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Progress from "./Progress";
import { useEffect, useState } from "react";

function Game({ name, setScene, score, setScore, setCurrentUser}: { name: string, setScene: any, score: number, setScore: any, setCurrentUser: any}) {
  const [time, setTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number>(Date.now() + 60000);
  const [isTimeExtension, setIsTimeExtension] = useState<boolean>(false);

  function sleep(msec: number) {
    return new Promise(function(resolve: any) {
      setTimeout(function() {resolve()}, msec);
    });
  }

  async function waitTimeExtension() {
    await sleep(500);
    setIsTimeExtension(false);
  }

  const timeExtension = () => {
    setIsTimeExtension(true);
    setEndTime((prev) => prev + 3000);
    waitTimeExtension();
  }
  
  const sendScore = async() => {
    const usersCollectionRef = collection(db,"users");
    const newDoc = doc(collection(db, 'users'));
    setCurrentUser(newDoc.id);
    const registrationName = name!="" ? name: "ななし";
    await addDoc(usersCollectionRef, {
      id: newDoc.id,
      name: registrationName,
      score: score,
    });
  }

  useEffect(()=>{
    setScore(0)
    const interval = setInterval(() => {
      setTime(Date.now())
    }, 10);
    return () => clearInterval(interval);
  }, []);

  // ゲーム本体
  const [cardsIsActive, setCardsIsActive] = useState<Array<boolean>>(Array(10).fill(false));
  const [cardsVal, setCardsVal] = useState<Array<number>>(Array(10).fill(1));
  const [sum, setSum] = useState<number>(0);
  const [target, setTarget] = useState<number>(10);
  const [isNoMiss, setIsNoMiss] = useState<boolean>(true);

  // アルゴリズム部分
  const generateTestcase = (score: number) => {
    const n: number = 10
    const x: number = 600;
    let A: Array<number> = Array();
    let m: number = Math.min(Math.ceil((score+0.5)/5), 5)*5-1;
    for (let i = 0; i < n; i++) {
      A.push(Math.floor(Math.random() * m) + 1);
    }
    
    const dp: number[][] = [];
    for (let i = 0; i < n+1; i++) {
      dp[i] = [];
      for (let j = 0; j < x; j++) {
        dp[i][j] = 0;
      }
    }
    
    dp[0][0]= 1;
    for(let i=0 ; i<n ; i++){
      for(let j=0 ; j<x ; j++){
        if(dp[i][j] != 0){
          dp[i+1][j] += dp[i][j];
          dp[i+1][j+A[i]] += dp[i][j];
        }
      }
    }
    
    let I: Array<number> = Array();
    let P: Array<number> = Array();
    let s: number = 0;
    let c: number = 0;
    
    for(let j=0 ; j<x ; j++){
      s += dp[n][j];
    }
    
    c = 0;
    let cs: number = 0;
    for(let j=0 ; j<x ; j++){
      if(dp[n][j] != 0){
        cs += dp[n][j];
        I[c] = j;
        P[c] = cs/s;
        c += 1 ;
      }
    }
    
    P[P.length - 1] += 1 ;
    let r: number = Math.random();
    for(let i=1; i<P.length; i++){
      if(r <= P[i]){
        setTarget(I[i]);
        break;
      }
    }
    setCardsVal(A);
  }

  // 次へすすむ
  async function waitToNext(lastCard: boolean) {
    await sleep(300);
    setScore((prev: number) => prev+1);
    setSum(0);
    setCardsIsActive(Array(10).fill(false));
    generateTestcase(score);
    if(isNoMiss == true && lastCard == false){
      timeExtension();
    }
    setIsNoMiss(true);
  }

  // 開始時に生成
  useEffect(()=>{
    generateTestcase(0);
  }, []);

  const clickCard = (index: number) => {
    if(endTime-time<=0){
      return
    }
    let newCardsIsActive: Array<boolean> = [...cardsIsActive];
    let activeCardsSum: number = 0;
    if(cardsIsActive[index] == true){
      setIsNoMiss(false);
    }
    newCardsIsActive[index] = !cardsIsActive[index];
    newCardsIsActive.forEach((newCardIsActive, jndex) => {
      if(newCardIsActive == true){
        activeCardsSum += cardsVal[jndex];
      }
    });
    if(activeCardsSum == target){
      setSum(activeCardsSum);
      setCardsIsActive(newCardsIsActive);
      waitToNext(cardsIsActive[index]);
    } else {
      setSum(activeCardsSum);
      setCardsIsActive(newCardsIsActive);
    }
  };

  return (
    <div>
      <Progress score={score}/>
      {/* タイマー */}
      <div className="timer-wrapper absolute">
      <p className="left-time text-center select-none">⏱残り時間⏱</p>
      <p className="left-time text-center select-none">{
        endTime-time <= 0 ? "0.00": `${("00" + Math.floor((endTime-time)/1000)).slice(-2)}.${("00" + Math.floor((endTime-time)/10)%100).slice(-2)}` 
      }</p>
      { isTimeExtension &&
        <div className="time-extension">
          <p className="text-center text-blue-700 select-none">No Miss</p>
          <p className="text-center text-blue-700 select-none">+3秒</p>
        </div>
      }
    </div>

      <div className="game-UI UI absolute">
        {/* ディスプレイ */}
        <div className="display-wrapper flex gap-4 w-max mx-auto">
          <div>
            <p className="text-center select-none">合計</p>
            <p className="display text-center select-none">{ sum }</p>
          </div>
          <div>
            <p className="text-center select-none">目標</p>
            <p className="display text-center select-none">{ target }</p>
          </div>
        </div>

        {/* カード */}
        <div className="card-wrapper mx-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <div 
              key={index}
              className={`card ${ cardsIsActive[index]==true ? "active": ""} text-center select-none` }
              onClick={() => clickCard(index)}
            >{ cardsVal[index] }</div>
          ))}
        </div>
      </div>


      {/* エンドカード */}
      { endTime-time <= 0 &&
        <div className="endcard absolute w-full h-full border-2 bg-gray-50">
          <p className="endcard-text text-center text-4xl font-bold select-none">終了</p>
          <div
            className="w-max mx-auto bg-red-400 hover:bg-red-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
            onClick={() => {setScene(3);  sendScore()}}
          >リザルト画面へ</div>
        </div>
      }
    </div>
  )
}

export default Game