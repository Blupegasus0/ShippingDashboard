## Getting Started

First install the necessary packages:
```sh
npm install
```

Then run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


#### Design Decisions
- The data is large and structured, therefore I used a SQL based database to manipulate the data. SQLite is self-contained and easy to use so it suited this project nicely.
- Javascript (and probably python) isn't the ideal tool for heavy lifting, parsing the file into the db with js took ~15 minutes. As a result I implemented the parsing algorithm in rust instead. Now wait times are much more pleasant (~2500ms).
- I couldn't find a good way to determine if packages are early or delayed so I considered delayed to be any package with received status that arrived more than 6 days ago.
