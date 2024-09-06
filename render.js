function render(template, data){
    let ans = template.replace(/\{\{(\w+)\}\}/g, function(_, key){
        return data[key]
    })
    return ans
}