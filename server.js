const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 3003;

// publicディレクトリを静的ファイルのルートとして設定
app.use(express.static('public'));

// mongoDB接続
mongoose.connect('mongodb+srv://ps3neito:eGGAVlbQ81mK9WDU@mongodb-cluster.cmfejuq.mongodb.net/threads?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDBに接続しました'))
.catch((err) => console.log('MongoDBへの接続に失敗しました', err));


// ポート番号を指定してアプリケーションを起動
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});