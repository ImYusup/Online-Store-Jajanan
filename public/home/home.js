$("#signup").submit(daftar => {
    daftar.preventDefault()
    let items = $("#signup").serializeArray()
    // console.log(items);
    $.ajax({
        type: 'POST',
        data: items,
        url: 'http://localhost:5000/api/user',
        success: (res) => {
            console.log(res)
            if (res.error === true) {
                alert(JSON.stringify(res.data))
            } else {
                alert('Congrats, you can login now! please check your email soon!')
            }
        },
        error: (xhr, res, text) => {
            console.log(xhr)
        }
    })
})



$("#signin").submit(login => {
    
    login.preventDefault()
    let items = $("#signin").serializeArray()
    $.ajax({
        type: 'POST',
        data: items,
        url: 'http://localhost:5000/api/user/login',
        success: (res) => {
            if (res.error === true) {
                alert(JSON.stringify(res.data))
            } else {    
            // console.log('====', res)
            localStorage.setItem('keyToken', JSON.stringify ({
                id:res.id, token:res.token
            }))  
            // JSON.parse(localStorage.getItem('keyToken'))
            // console.log(localStorage.getItem('keyToken'));    
            window.location.href = '/product';
            }
        },
        error: (xhr, res, text) => {
            console.log(xhr)
        }
    })
})
