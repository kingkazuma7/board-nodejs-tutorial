const jsForm = document.querySelector(".js-form-section");
const jsThreadSection = document.querySelector(".thread-section");
const jsInputText = document.getElementById('js-input-title'); 
const jsInputContent = document.getElementById('js-input-content'); 
let inputText = "";
let inputContent = "";

// スレッド削除ボタン
const deleteThreadButton = (id) => {
  return `<button class="js-delete-button btn btn-danger" data-id="${id}">削除</button>`;
};

// スレッド削除処理
const deleteThread = async (id) => {
  try {
    const deletedThread = await axios.delete(`/api/v1/thread/${id}`);
    console.log(deletedThread.data.message);
    getAllThreads();
  } catch (error) {
    console.log(error);
  }
};

// Threadsのすべてを読み込む
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads"); // エンドポイント
    let { data } = allThreads;
    
    // 出力
    allThreads = data.map((thread) => {
      const { _id, title, content, uploadTime} = thread;
      // console.log(title, content, uploadTime);
      return `
      <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
        <p>${uploadTime}</p>
        ${deleteThreadButton(_id)}
      </div>
      `;
    });
    jsThreadSection.innerHTML = allThreads.join(''); // 挿入
    
    // 削除ボタンにイベントリスナーを追加
    const deleteButtons = document.querySelectorAll(".js-delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        deleteThread(id);
      });
    });
    
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
