const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Threads = require('./models/Threads');
require("dotenv").config();
const port = 3003;

app.use(express.json()); // body-parserの設定
app.use(express.static('public')); // publicディレクトリを静的ファイルのルートとして設定

// MongoDB接続
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDBに接続しました'))
.catch((err) => console.log('MongoDBへの接続に失敗しました', err));


// getメソッド（dbからサーバーへデータ取得する）
app.get("/api/v1/threads", async (req, res) => {
  try {
    // 非同期処理を記述
    const allThreads = await Threads.find({}).sort({ uploadTime: -1 });
    res.status(200).json(allThreads);
  } catch (err) {
    // エラー処理を記述
    console.log(err);
  }
});

// postメソッド（単一の投稿作成）
app.post("/api/v1/thread", async (req, res) => {
  try {
    // 非同期処理を記述
    const createThread = await Threads.create(req.body);
    res.status(200).json(createThread);
  } catch (err) {
    // エラー処理を記述
    console.log(err);
  }
});

// deleteメソッド（単一の投稿削除）
app.delete("/api/v1/thread/:id", async (req, res) => {
  try {
    // 非同期処理を記述
    const deletedThread = await Threads.findOneAndDelete(req.params.id);
    if (deletedThread) {
      res.status(200).json({
        message: 'スレッドが削除されました',
        deletedThread: deletedThread
      });
    } else {
      res.status(404).json({
        message: 'スレッドが見つかりませんでした'
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// ポート番号を指定してアプリケーションを起動
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});