export const trim = (str, length, words = 10) => {
    console.log("got:", str);
    const wordsArray = str.split(" ")
    if (length && str.length > length) {
        return str.substring(0, length - 3) + "...";
    }else if(wordsArray.length > words){
        return str.substring(0, wordsArray.slice(0, words).join(" ").length) + "...";
    } else {
        return str;
    }
}