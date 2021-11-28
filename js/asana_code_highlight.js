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
    // タスク説明文があればハイライトする
    var task_description = $(".TaskDescription");
    if(task_description.find(".ProsemirrorEditor").length !== 0){
      console.log('タスク本文要素を発見したのでハイライト欄に切り替えます。');
      // 元の子要素をhtmlごと保持しておく
      // 別のスコープで使うのでvarをつけずにグローバル変数となっている
      original_task_description_html = $(".TaskDescription").children().clone(true);

      var task_description_body = task_description.find(".ProsemirrorEditor").html();
      var highlight_block = "<pre><code id='highlight'></code></pre>";
      task_description.empty();
      task_description.append(highlight_block);
      // textで入れると改行されないのでhtmlごと入れる
      $('#highlight').html(task_description_body);

      // ハイライト処理
      $('#highlight').each(function(i, block) {
        hljs.highlightBlock(block);
      });

    // ハイライト欄があれば元に戻す
    } else if($("#highlight").length !== 0) {
      // TODO: イベントも含めて元に戻したつもりだが、元に戻すと保存が効かなくなるっぽい
      console.log('ハイライト欄を発見したので元の要素に切り替えます。');
      task_description.empty();
      task_description.html(original_task_description_html);

    // 対象の要素がなければ何もしない
    } else {
      console.log("対象の要素がなかったため何もしません。");
    }

    sendResponse('Done');
  });
});