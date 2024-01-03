

function Start({ setScene, name, setName }: { setScene: any, name: string, setName: any }) {
  return (
    <div className="start-UI UI absolute">
      <h2 className="text-3xl font-bold mb-8 text-center">Select Cards</h2>
      <div className="flex gap-8 w-max mx-auto mb-12">
        <div
          className="w-max bg-blue-400 hover:bg-blue-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          onClick={() => setScene(2)}
        >始める</div>
        <div
          className="w-max bg-green-400 hover:bg-green-600 rounded-md p-3 shadow-gray-400 shadow-sm cursor-pointer transition-all select-none"
          onClick={() => setScene(1)}
        >遊び方</div>
      </div>
      <div className="w-max mx-auto">
        <p className="mb-2 select-none">名前<span className="text-sm">(10文字以内)</span></p>
        <input
          type="text"
          name="name"
          className="border-1 border-black border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-opacity-50 px-2"
          placeholder="名前"
          maxLength={10}
          value={name!="" ? name: ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Start