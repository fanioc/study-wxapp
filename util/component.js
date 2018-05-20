//设置simulate_popup自定义组件属性
function simulate_popup_set_property(that, form, callback, title = '弹窗', right_button = '完成', full = false)
{
 
//show_modal直接定义为true
  that.setData({ show_modal: true, template_form: form, modal_title: title, modal_right_button: right_button, modal_fullScreen: full, modal_callback: callback });

    return true;
}
//设置simulate_popup自定义组件属性
function middleToast_set_property(that, content) {

  //hidden直接定义为true
  that.setData({ hiddenToast: true, toastContent: content });
  return true;
}
//配合<include src='/template/interActive.wxml' />使用
module.exports = {
  show_modal: simulate_popup_set_property,
  show_mToast: middleToast_set_property
}


