const signout = () =>{
    debugger
    console.log('user clicked')
    fetch('/users/signOut').then(
        data => data.redirected && (location.href = data.url)
    ).catch(
        err => {
            console.log(err)
        }
    )
}