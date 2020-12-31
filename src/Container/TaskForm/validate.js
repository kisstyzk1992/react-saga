const validate = (value) => {
    const errors = {};
    // console.log('value: ', value)
    const {title, description} = value;
    if(!title){
        errors.title = 'vui lòng nhập tiêu đề';
    }else if(title.trim() && title.length < 5){
        errors.title = 'tiêu đề phải từ 5 ký tự';
    }
    if(!description){
        errors.description = 'vui lòng nhập miêu tả';
    }else if(description.trim() && description.length < 5){
        errors.description = 'tiêu đề phải từ 5 ký tự';
    }
    return errors
}

export default validate