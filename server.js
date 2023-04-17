const express = require("express");
const app = express();
const port = 3003;

// publicディレクトリを静的ファイルのルートとして設定
app.use(express.static('public'));

// ポート番号を指定してアプリケーションを起動
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});