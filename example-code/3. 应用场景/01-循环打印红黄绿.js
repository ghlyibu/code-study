function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}


// 1. callback 实现
const taskCallback = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red()
        } else if (light === 'green') {
            green()
        } else if (light === 'yellow') {
            yellow()
        }
        callback()
    }, timer)
}
// const step = () => {
//     taskCallback(3000, 'red', () => {
//         taskCallback(2000, 'green', () => {
//             taskCallback(1000, 'yellow', step)
//         })
//     })
// }
// step()

// 2. promise实现
const taskPromise = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            } else if (light === 'green') {
                green()
            } else if (light === 'yellow') {
                yellow()
            }
            resolve()
        }, timer)
    })
}
const step = () => {
    task(3000, 'red')
        .then(() => task(2000, 'green'))
        .then(() => task(2100, 'yellow'))
        .then(step)
}
step() 
//  3. async/await
const taskRunner =  async () => {
    await task(3000, 'red')
    await task(2000, 'green')
    await task(2100, 'yellow')
    taskRunner()
}
taskRunner()