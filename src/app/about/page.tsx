
export default function LeetCode() {
    return (
        <>
            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h1>關於我</h1>

                    <p>Hi！ 歡迎來到我的個人網站。</p>
                    <p>你在這可以找到我的自學經歷以及開發心得等。</p>
                </div>
            </div>

            <hr />

            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h2>其他資訊</h2>

                    <h3>這個網站</h3>

                    <p>
                        以前都只使用記事本、Excel來紀錄這些學習經歷。<br />
                        發覺越來越難管理，查找以前的資訊也不容易。才開始有了想要建立個人網站的想法。
                    </p>
                    
                    <p>
                        就在這個時候找到了 <a href="https://easonchang.com/about">Eason Chang</a> 在 <a href="https://ithelp.ithome.com.tw/articles/10291960">iT邦幫忙</a> 上的分享文章。<br />
                        讓從沒碰過 React 的我，也能輕鬆的從零開始一步步完成這個網站。
                    </p>

                    <p>感謝 Eason Chang 的分享！</p>
                </div>
            </div>
        </>
    );
}