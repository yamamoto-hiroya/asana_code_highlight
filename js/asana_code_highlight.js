/**
 * 基本方針
 * 画面が動的変わるので適用が面倒くさい
 * 拡張アイコンをクリックしたタイミングで適用/解除をすることにする
 */
$(function(){
  /**
   * @param object message backgroundからポストされた値
   * オブジェクトになっていてmessage.trigger = 'on'のような形になっている
   * @param sender
   * @sendResponse
   * これらは2つとも宣言してないとsendResponseが最後に返せなかったので設定した
   *
   * backgroundからメッセージが送られてきた時（ブラウザボタンをクリックされた時）に発火する
   */
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 意図したbackground.jsからの送信でない場合は弾く
    if(message.trigger !== 'on'){
      return false;
    }

    /** ----- main ----- **/
    // タスク説明文があればハイライトする
    if($(".TaskDescription").length !== 0){
      console.log('タスク本文要素発見');
      var task_description = $(".TaskDescription");
      var task_description_text = $(".TaskDescription").text();
      var highlight_block = "<pre><code class='sql' id='highlight'></code></pre>";
      task_description.empty();
      task_description.append(highlight_block);
      $('#highlight').text(task_description_text);
      $('#highlight').each(function(i, block) {
        hljs.highlightBlock(block);
      });

    // ハイライト欄があれば元に戻す
    } else if(false) {
      console.log('ハイライト欄発見');

    // 対象の要素がなければ何もしない
    } else {
      console.log("対象の要素がなかったため何もしません");
    }

    sendResponse('Done');
  });
});