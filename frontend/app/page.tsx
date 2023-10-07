import Image from 'next/image'
import Chart from 'chart.js/auto';

const config = {
  type: 'line',
  data: {},
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-12 px-12 justify-between">
      {/* Background Gradient */}
      <div className="bg-gradient-to-b from-slate-900 to-gray-900 min-h-screen w-full overflow-hidden absolute top-0 left-0 -z-20" />
      <div className={"bg-nasa min-h-screen w-full overflow-hidden absolute top-0 left-0 -z-10"} style={{"opacity": 0.01}}/>

      <div>
        <h1 className={"text-white font-mono font-black text-2xl border-slate-800 border-4 p-1 rounded-lg"}>{"> Sonification Tool"}</h1>

        <div className={"w-full flex flex-row mt-4 font-mono font-semibold space-x-2 justify-end text-slate-400"}>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Preset Datasets</div>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Upload a custom data set...</div>
          <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Render</div>
        </div>

        <div className={"flex flex-row w-full mt-4 pt-4 px-4 space-x-4"}>
          <div className={"w-1/2"}>
            <div className={"border-2 border-slate-800 rounded-lg p-4"}>
              <div className={"bg-nasa w-full h-96"}></div>
            </div>

            <div className={"flex flex-row mt-4 font-mono font-semibold space-x-2 justify-between text-slate-400"}>
              <div className={"flex flex-row space-x-2"}>
                <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"<< First"}</div>
                <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"< Previous"}</div>
              </div>

              <div className={"flex flex-row space-x-2"}>
                <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"Next >"}</div>
                <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>{"Last >>"}</div>
              </div>
            </div>
          </div>

          <div>
            <div className={"flex flex-row font-mono font-semibold space-x-2 justify-end text-slate-400"}>
              <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Start ⏵︎</div>
              <div className={"border-2 border-slate-800 text-lg p-1 rounded-lg w-fit"}>Restart ⏹︎</div>
            </div>

            {/* Chart */}
            {config && <canvas id="myChart" width="400" height="400"></canvas>}
          </div>
        </div>
      </div>

      <p className={"text-sm text-slate-800 px-3 mb-2"}>Created for the Nasa Space Apps hackathon fall, 2023 - By Aishani Das-Ghosh, Jeremy Kintana, Max Maeder, Rahul Hathwar</p>
    </main>
  )
}
