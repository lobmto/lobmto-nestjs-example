# 単語管理 API

Nest.js & TypeORM による API の個人用サンプル

## Requirements

- asdf & direnv
  - または mise で代替可能
  - （諸事情で mise を使用できない環境があるため、asdf / direnv の設定を残している）
- Docker
- VSCode / Cursor
- runn

## 初期設定

```sh
cp .env.example .env
npm install

docker compose up -d
npm run migration:run

npm run start
```

## Commands

- コードフォーマットのチェック
  ```sh
  npm run format
  ```

- ESLintによる静的解析
  ```sh
  npm run lint
  ```

- OpenAPI のチェック
  ```sh
  npm run lint:openapi
  ```

- マイグレーションファイルの生成
  ```sh
  npm run migration:generate
  ```

- マイグレーションの実行
  ```sh
  npm run migration:run
  ```

- ユニットテストの実行
  ```sh
  npm run test
  ```
  - VSCode でファイルを保存するとテストが自動実行される
  - カバレッジが `GutterFormatter` で表示される

- e2e テストの実行
  ```sh
  npm run test:e2e
  ```
  - VSCode でファイルを保存するとテストが自動実行される
  - カバレッジが `GutterFormatter` で表示される

- API テストの実行
  ```sh
  npm run test:api
  ```
