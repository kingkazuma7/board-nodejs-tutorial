const jsForm = document.querySelector(".js-form-section");
const jsThreadSection = document.querySelector(".thread-section");
const jsInputText = document.getElementById('js-input-title'); 
const jsInputContent = document.getElementById('js-input-content'); 
let inputText = "";
let inputContent = "";

// Threadsのすべてを読み込む
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads"); // エンドポイント
    let { data } = allThreads;
    
    // 出力
    allThreads = data.map((thread) => {
      const { title, content, uploadTime} = thread;
      console.log(title, content, uploadTime);
      return `
      <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
        <p>${uploadTime}</p>
      </div>
      `;
    });
    jsThreadSection.innerHTML = allThreads.join(''); // 挿入
  } catch (err) {
    console.log(err);
  }
}
getAllThreads();

// title,contentを打ち込んだらpostメソッドを実装してデータ追加する
jsInputText.addEventListener("change", (e) => {
  inputText = e.target.value;
});
jsInputContent.addEventListener("change", (e) => {
  inputContent = e.target.value;
});
jsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (inputText && inputContent) {
    console.log("add data");
    try {
      await axios.post("/api/v1/thread", {
        title: inputText,
        content: inputContent,
      });
      console.log('data saved successfully');
    } catch (error) {
      console.log(error);
    }
    getAllThreads();
  } else {
    console.log("error");
  }
});
