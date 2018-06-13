//设置simulate_popup自定义组件属性
function simulate_popup_set_property(that, form, callback, title = '弹窗', right_button = '完成', full = false)//lly_improve
{
	//callback回调函数会给参数OBJECT{formData:'此数据格式和templatetype有关',templateType:string}
	//show_modal直接定义为true
	var current_page = getCurrentPages();
	var current_page_index = current_page.length - 1;
	current_page[current_page_index].setData({ show_modal: true, template_form: form, modal_title: title, modal_right_button: right_button, modal_fullScreen: full, modal_comfirm_callback: callback });


	return true;
}
//设置simulate_popup自定义组件属性
function middleToast_set_property(content) {

	//hidden直接定义为true
	var pages = getCurrentPages();
	var currentPage = pages[pages.length - 1];//lly_improve
	currentPage.setData({ hiddenToast: true, toastContent: content });
	//console.log('hah');
	return true;
}
//配合<include src='/template/interActive.wxml' />使用
module.exports = {
	show_modal: simulate_popup_set_property,
	show_mToast: middleToast_set_property
}


