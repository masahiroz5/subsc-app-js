# サブスクリプション管理アプリ

## 概要
契約中のサブスクリプションを管理できるシンプルなタスク管理アプリです。<br>
[アプリはこちら](https://subsc-app-js-852b0.web.app/)
## 製作した経緯
サブスクリプションの解約を忘れて料金が発生したままになっていた経験があったため、製作に至りました。


## デモ

- メインページ
![スクリーンショット 2021-02-25 14 10 13](https://user-images.githubusercontent.com/65212754/109106494-33dd0800-7773-11eb-8d34-5bdf4c8bf126.png)



## インストール
- React `npx create-react-app myapp cd my-app`
- Firebase `npm install -g firebase-tools`

## 展開
- ローカルブラウザで表示するには

`npm start`
→ http://localhost:3000/ を開く

`firebase init`→Firestore,hostingを選択
`firebase login`

初期設定が`public`になっているので、`build`
に変更することを注意してください。

`npm run build`

`firebase deploy`


## 使用技術・環境
- node 12.14.1
- React 17.0.1
- 追加、削除機能：Hooks(useState,useEffect)
- スタイル：CSS
- データベース：Firebase Cloud Firestore
- デプロイ：Firebase Hosting
- ソースコード管理：GitHub

## その他
現在も開発を継続しており、順次実装予定です。  
実装予定の機能は[Issues](https://github.com/masahiroz5/subsc-app-js/issues)よりご確認いただけます。

## 製作者
[masahiro](https://twitter.com/prograrning)

