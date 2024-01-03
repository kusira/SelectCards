import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function Result({ setScene, score }: { setScene: any, score: Number }) {
  return (
    <div className="result-UI UI absolute">
      <p className="text-2xl text-center mb-8">あなたのスコア: { String(score) }</p>
      <div className="flex gap-8 w-max mx-auto mb-12">
        <div
          className="w-max bg-purple-400 hover:bg-purple-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          onClick={() => setScene(0)}
        >もう一度プレイする</div>
        <div
          className="w-max bg-yellow-400 hover:bg-yellow-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          onClick={() => setScene(4)}
        >ランキングへ</div>
      </div>

      <div className="w-max mx-auto">
        <a
          className="inline-block w-max text-white hover:text-black border-black border-2 bg-black hover:bg-white rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          href={`http://twitter.com/share?url=https://kusira-select-cards.netlify.app/&text=スコアは${score}でした。&hashtags=SelectCards`}
          target="_blank"
        ><FontAwesomeIcon icon={faXTwitter} />で結果をポスト</a>
      </div>
    </ div>
  )
}

export default Result