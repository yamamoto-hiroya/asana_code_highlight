/**
 * 基本方針
 * 画面が動的変わるので適用が面倒くさい
 * 拡張アイコンをクリックしたタイミングで適用/解除をすることにする
 *
 * ハイライトは以下のライブラリを使用
 * @see https://github.com/highlightjs/highlight.js
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
    // APPEND: タスク本文以外（コメント欄やメッセージ欄など）にも適用できると嬉しいかも
    // タスク説明文が表示状態で存在していればハイライトする
    var task_description = $(".TaskDescription");
    if(task_description.is(':visible')){
      console.log('タスク本文要素を発見したのでハイライト欄に切り替えます。');

      var task_description_body = task_description.find(".ProsemirrorEditor").html();
      var highlight_block = "<pre><code id='highlight'></code></pre>";
      task_description.hide();
      task_description.after(highlight_block);
      // textで入れると改行されないのでhtmlごと入れる
      $('#highlight').html(task_description_body);

      // ハイライト処理
      $('#highlight').each(function(i, block) {
        hljs.highlightBlock(block);
      });

    // ハイライト欄があれば元に戻す
    } else if($("#highlight").length !== 0) {
      console.log('ハイライト欄を発見したので元の要素に切り替えます。');
      $('#highlight').remove();
      task_description.show();

    // 対象の要素がなければ何もしない
    } else {
      console.log("対象の要素がなかったため何もしません。");
    }

    sendResponse('Done');
  });
});