import Start from "./Start"
import HowtoPlay from "./HowtoPlay"
import Game from "./game-components/Game"
import Result from "./Result"
import Ranking from "./Ranking"

import { useEffect, useState } from "react"

function Frame() {
  const [scene, setScene] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>("non");

  useEffect(()=>{
    setScore(0);
  },[]);

  return (
    <div className="frame relative">
      {scene==0 && <Start setScene={setScene} name={name} setName={setName}/>}
      {scene==1 && <HowtoPlay setScene={setScene}/>}
      {scene==2 && <Game name={name} setScene={setScene} score={score} setScore={setScore} setCurrentUser={setCurrentUser}/>}
      {scene==3 && <Result setScene={setScene} score={score}/>}
      {scene==4 && <Ranking setScene={setScene} score={score} currentUser={currentUser}/>}
    </div>

  )
}

export default Frame