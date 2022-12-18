import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNameArr = fs.readdirSync(postsDirectory);
  const allPostsData = fileNameArr.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResultArr = matter(fileContents);

    return {
      id,
      ...matterResultArr.data,
    }
  });
  return allPostsData
};

// getStaticPathでreturnで使うpathを取得
export function getAllPostIds() {
  const fileNameArr = fs.readdirSync(postsDirectory);
  return fileNameArr.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResultArr = matter(fileContent);

  matterResultArr.content //文字列の状態

  const blogContent = await remark()
  .use(html)
  .process(matterResultArr.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResultArr.data,
  };
}