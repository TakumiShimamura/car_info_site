// 車種リスト：ファイル名でjsonを指定（cars_info/ フォルダ内）
const carList = [
  { メーカー: "トヨタ", モデル名: "プリウス", ファイル: "toyota/prius.json" },
  { メーカー: "トヨタ", モデル名: "クラウン", ファイル: "toyota/crown.json" },
  { メーカー: "トヨタ", モデル名: "ランドクルーザー", ファイル: "toyota/landcruiser.json" },
  { メーカー: "トヨタ", モデル名: "ハリアー", ファイル: "toyota/harrier.json" },
  { メーカー: "トヨタ", モデル名: "トヨタ86", ファイル: "toyota/86.json" },
  { メーカー: "日産", モデル名: "リーフ", ファイル: "nissan/leaf.json" }
];

// 初期化処理：メーカー選択肢の追加とイベント設定
function init() {
  const makers = [...new Set(carList.map(c => c["メーカー"]))];
  const makerSelect = document.getElementById("maker");

  makers.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    makerSelect.appendChild(opt);
  });

  makerSelect.addEventListener("change", updateModelOptions);
  document.getElementById("model").addEventListener("change", displayDetails);
}

// メーカー選択時に車種プルダウンを更新
function updateModelOptions() {
  const selectedMaker = document.getElementById("maker").value;
  const models = carList.filter(c => c["メーカー"] === selectedMaker);

  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "<option value=''>選択してください</option>";

  models.forEach(car => {
    const opt = document.createElement("option");
    opt.value = car["ファイル"];
    opt.textContent = car["モデル名"];
    modelSelect.appendChild(opt);
  });
}

// 車種選択時にJSONをfetchして詳細表示
async function displayDetails() {
  const selectedFile = document.getElementById("model").value;
  if (!selectedFile) return;

  const res = await fetch(`cars_info/${selectedFile}`);
  const car = await res.json();

  const container = document.getElementById("car-details");
  container.innerHTML = `
    <h2>${car["名前"]}</h2>
    <ul>
      <li>メーカー：${car["メーカー"]}</li>
      <li>定員：${car["定員"]}</li>
      <li>車重：${car["車重"]}</li>
      <li>サイズ：${car["サイズ"]}</li>
      <li>パワーユニット：${car["パワーユニット"]}</li>
      <li>馬力：${car["馬力"]}</li>
      <li>トルク：${car["トルク"]}</li>
      <li>排気量：${car["排気量"]}</li>
      <li>サスペンション：${car["サスペンション"]}</li>
      <li>世代：${car["世代"]}</li>
      <li>セグメント：${car["セグメント"]}</li>
      <li>生産工場：${car["生産工場"]}</li>
    </ul>
    <img src="${car["画像"]}" alt="${car["名前"]}" width="400">
  `;
}

init();
