function findMostWord(article) {
    // 合法性判断
    if (!article) return;
    // 参数处理
    article = article.trim().toLowerCase();
    let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWorld = "";
    article = " " + wordList.join(" ")+ " ";
    // 遍历判断单词出现的次数
    wordList.forEach(item => {
        if (visited.indexOf(item) < 0) {
            // 加入 visited
            visited.push(item);
            let word = new RegExp(" "+ item + " ", "g");
            let num = article.match(word).length;
            if (num > maxNum) {
                maxNum = num;
                maxWorld = item;
            }
        }
    })
    return maxWorld + " " + maxNum;
}