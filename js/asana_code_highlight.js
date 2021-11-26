$(function(){
  // ボタン設置
  function set_button(){
    // 既にあれば配置しない
    if($('#my_only_inspect').length === 0){
      $('.PageToolbarStructure-rightChildren').prepend('<div id="my_only_inspect" class="AbstractThemeableRectangularButton--isEnabled AbstractThemeableRectangularButton AbstractThemeableRectangularButton--medium SubtleButton CompletionMenuStructure CompletionMenu" role="button">検証のみ</div>');
    }
    if($('#my_all_close').length === 0){
      $('.PageToolbarStructure-rightChildren').prepend('<div id="my_all_close" class="AbstractThemeableRectangularButton--isEnabled AbstractThemeableRectangularButton AbstractThemeableRectangularButton--medium SubtleButton CompletionMenuStructure CompletionMenu" role="button">全て閉じる</div>');
    }
    if($('#my_all_open').length === 0){
      $('.PageToolbarStructure-rightChildren').prepend('<div id="my_all_open" class="AbstractThemeableRectangularButton--isEnabled AbstractThemeableRectangularButton AbstractThemeableRectangularButton--medium SubtleButton CompletionMenuStructure CompletionMenu" role="button">全て開く</div>');
    }
  }

  // 全て開く
  function open_all_subtask(){
    var i = 0;
    var subtasks = $('[aria-label*=サブタスクリストを展開]');
    // 少し間を開けて開かないとサブタスクが読み込まれない
    var timer = setInterval(function() {
      var subtask = subtasks[i++];
      subtask.click();
      if(i >= subtasks.length) clearInterval(timer);
    }, 500);
  }

  // 全て閉じる
  function close_all_subtask(){
    var subtasks = $('[aria-label*=サブタスクリストを折り畳む]');
    subtasks.click();
  }

  // 「検証」のみに絞る
  function show_only_inspect(){
    // 「検証中」セクションのみを開き、他を全て閉じる
    var sections = $('.TaskGroupHeader-toggleButton');
    sections.each(function(){
      var label = $(this).attr('aria-label');
      var header = $(this).siblings('.TaskGroupHeader-headerContainer');
      var section_name = header.find('.PotColumnName-nameButton').text();

      // 検証中セクションが閉じていれば開く
      if(section_name === '検証中'){
        if(/このセクションのタスクリストを展開/.test(label)){
          $(this).click();
        }

      // 検証中以外のセクションが開いていれば閉じる
      } else {
        if(/このセクションのタスクリストを折り畳む/.test(label)){
          $(this).click();
        }
      }
    });

    // 全てのサブタスクを開く
    open_all_subtask();
  }

  setTimeout(function(){
    set_button();

    $('#my_all_open').on('click', function(){
      open_all_subtask();
    });

    $('#my_all_close').on('click', function(){
      close_all_subtask();
    });

    $('#my_only_inspect').on('click', function(){
      show_only_inspect();
    });

    // タブ切替時にボタンの再配置
    // ほんとはディレイ設けないとうまいこと配置されないがリストタブ連打でいけるからまぁいいか
    $('.Tab-selectableTab').on('click', function(){
      if($(this).text() === 'リスト'){
        set_button();
        $('#my_all_open').on('click', function(){
          open_all_subtask();
        });
        $('#my_all_close').on('click', function(){
          close_all_subtask();
        });
        $('#my_only_inspect').on('click', function(){
          show_only_inspect();
        });
      }
    });

  }, 5000);

});