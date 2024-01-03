import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

  const rankingIndex:Array<String> = [
    "🥇","🥈","🥉","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"
  ];

const rankingColor:Array<String> = [
  "bg-orange-400",
  "bg-orange-300",
  "bg-orange-200",
  ...Array(2).fill("bg-orange-50"),
  ...Array(15).fill("")
];


type User = {
  id: string;
  name: string;
  score: number;
}

function Ranking({ setScene, score, currentUser }: { setScene: any, score: Number, currentUser: String }) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, orderBy("score", "desc"), limit(10) )
    onSnapshot(q, (querySnapshot) => {
      setUsers(querySnapshot.docs.map((doc) => ({...doc.data() as User})) )
    });
  }, []);

  return (
    <div className="ranking-UI UI absolute">
      <div className="ranking-frame">
        <ul className="data-title-wrapper grid border-black border-b-2">
          <li className="block bg-pink-100 text-center">順位</li>
          <li className="block bg-pink-100 text-center">名前</li>
          <li className="block bg-pink-100 text-center">スコア</li>
        </ul>
          {users.map((user, index) => (
            <ul className="user-wrapper grid border-black" key={user.id}>
              <li className={`block py-3 text-center ${user.id == currentUser ? "bg-green-300" : rankingColor[index]}`}>{rankingIndex[index]}</li>
              <li className={`block py-3 text-center ${user.id == currentUser ? "bg-green-300" : rankingColor[index]}`}>{user.name}</li>
              <li className={`block py-3 text-center ${user.id == currentUser ? "bg-green-300" : rankingColor[index]}`}>{user.score}</li>
            </ul>
          ))}
      </div>
      
      {users.map((user) => (
        <div key={user.id}>
          {user.id === currentUser && (<p className="text-xs text-orange-400 text-center">ランキングインしました！</p>)}
        </div>
      ))}

      <p className="text-2xl text-center mb-4">あなたのスコア: { String(score) }</p>
      <div
        className="w-max mx-auto mb-8 bg-purple-400 hover:bg-pueple-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
        onClick={() => setScene(0)}
      >もう一度プレイする</div>
      
      <div className="w-max mx-auto">
        <a
          className="inline-block w-max text-white hover:text-black border-black border-2 bg-black hover:bg-white rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          href={`http://twitter.com/share?url=https://example.com&text=スコアは${score}でした。&hashtags=SelectCards`}
          target="_blank"
        ><FontAwesomeIcon icon={faXTwitter} />で結果をポスト</a>
      </div>
    </div>
  )
}

export default Ranking
