function simulate_popup_set_property(that, form, callback, title = '弹窗', right_button = '完成', full = false)
{
 //配合<include src='/template/interActive.wxml' />使用

  that.setData({ show_modal: true, template_form: form, modal_title: title, modal_right_button: right_button, modal_fullScreen: full, modal_callback: callback });

    return true;
}
module.exports = {
  show_modal: simulate_popup_set_property
}