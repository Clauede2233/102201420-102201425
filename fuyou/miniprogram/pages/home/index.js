Page({
  data: {
    inputValue1: '', // 第一个输入框的值
    inputValue2: '', // 第二个输入框的值
    IDOptions: ['学生', '导师'], // 身份选项
    selectedID: '' // 选中的身份
  },

  // 处理第一个输入框的输入
  onInput1: function(event) {
    this.setData({
      inputValue1: event.detail.value
    });
  },

  // 处理第二个输入框的输入
  onInput2: function(event) {
    this.setData({
      inputValue2: event.detail.value
    });
  },

  // 处理身份选择
  onIDChange: function(event) {
    const index = event.detail.value;
    this.setData({
      selectedID: this.data.IDOptions[index]
    });
  },

  // 提交按钮的处理函数
  submit: function() {
    const { inputValue1, inputValue2, selectedID } = this.data;
    // 在这里可以处理输入值，例如发送到服务器
    console.log('第一个输入框的值:', inputValue1);
    console.log('第二个输入框的值:', inputValue2);
    console.log('选中的身份:', selectedID);
  }
});