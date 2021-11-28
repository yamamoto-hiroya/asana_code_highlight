// backgroundで動くjs
// ブラウザ上部のアイコンをクリックすることで発火し、content.jsの方にメッセージを飛ばす（トリガー）
chrome.browserAction.onClicked.addListener(function(tab) {
  /**
   * 第一引数: タブのID
   * 第二引数: ポストするキーとバリュー
   * 第三引数: コールバック関数（レスポンスが戻ってきた時に実行される）
   */
  chrome.tabs.sendMessage(tab.id, { trigger: "on" },
    function(msg) {
      console.log("background側のconsole:", msg);
    });
});
