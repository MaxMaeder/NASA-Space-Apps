import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      {/* Background Gradient */}
      <div className="bg-gradient-to-b from-slate-900 to-gray-900 min-h-screen w-full overflow-hidden absolute top-0 left-0 -z-20" />
      <div className={"bg-nasa min-h-screen w-full overflow-hidden absolute top-0 left-0 -z-10"} style={{"opacity": 0.01}}/>

      <h1 className={"text-white font-mono font-black text-2xl border-slate-800 border-4 p-1 rounded-lg"}>{"> Sonification Tool"}</h1>

      <div className={"w-full flex flex-row mt-4 font-mono font-semibold space-x-2 justify-end text-slate-400"}>
        <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Preset Datasets</div>
        <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Upload a custom data set...</div>
        <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Render</div>
      </div>

      <div className={"border-2 border-slate-800 w-1/2 rounded-lg p-4 mt-4"}>
        <div className={"bg-nasa w-full h-96"}></div>
      </div>

      <div className={"w-1/2 flex flex-row mt-4 font-mono font-semibold space-x-2 justify-between text-slate-400"}>
        <div className={"flex flex-row space-x-2"}>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"<< First"}</div>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"< Previous"}</div>
        </div>

        <div className={"flex flex-row space-x-2"}>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"Next >"}</div>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"Last >>"}</div>
        </div>
      </div>


    </main>
  )
}
