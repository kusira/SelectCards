import { useEffect, useState } from "react"


function Progress({ score } : { score:number }) {
  const [progress, setProgress] = useState<number>(0);
  const [isLevelUp, setIsLevelUp] = useState<boolean>(false);
  function sleep(msec: number) {
    return new Promise(function(resolve: any) {
      setTimeout(function() {resolve()}, msec);
    })
  }
  async function waitLevelUp() {
    await sleep(500);
    setIsLevelUp(false);
  }
  const levelUp = () => {
    setIsLevelUp(true);
    waitLevelUp();
  }  

  useEffect(()=>{
    console.log("1")
    setProgress(score%20);
    if(2<=score && score<=25 && score%5 == 1){
      levelUp()
    };
  }, [score]);

  return (
    <div className="absolute top-4 w-full">
      <div className="flex">
        {Array.from({ length: 21 }, (_, index) => (
          <div key={index} className="progress-bar-wrapper relative">
            <div  className={`progress-bar h-1 ${index <= progress ? 'bg-yellow-300' : ''}`}>
              {index % 5 === 0 ? 
                <div className={`marker-star absolute ${index <= progress ? 'bg-yellow-300' : ''}`}> 
                  <p className={`text-xs select-none ${index <= progress ? 'text-yellow-700' : ''}`}>{Math.floor(score/20)*20 + index}</p>
                </div> : 
                <div className={`marker-normal absolute rounded-full ${index <= progress ? 'bg-yellow-300' : ''}`}></div>
              }
            </div>
          </div>
        ))}
      </div>
      <p className="absolute right-6 top-6 text-xl select-none">スコア: { score }</p>
      { isLevelUp==true &&
        <p className="level-up absolute right-12 top-24 text-md text-blue-700 select-none">Level Up!</p>
      }
    </div>
  )
}

export default Progress