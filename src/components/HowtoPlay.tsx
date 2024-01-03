

function HowtoPlay({ setScene }: { setScene: any }) {
  return (
    <div className="howtoplay-UI UI absolute w-10/12">
      <p className="leading-8 mb-2">
        カードを複数枚選んでそれらの合計値を目標値に一致させます。<br />
        制限時間(60秒)内に解いた問題数がスコアとなります。<br />
        ノーミスの場合は制限時間が伸びます。
      </p>
      <img src="./img/how-to-play.png" width={240} className="mx-auto mb-2"/>
      <div
        className="w-max mx-auto bg-green-400 hover:bg-green-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all"
        onClick={() => setScene(0)}
      >戻る</div>
    </div>
  )
}

export default HowtoPlay